import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CollectionDto, ResponseTokenDto } from './dto/create-collection.dto';
import {
  UpdateCollectionDto,
  UpdateCollectionStatusDto,
} from './dto/update-collection.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CollectionEntity } from '@app/common/modules/database';
import { BaseService } from '@app/common/src/lib/base.service';
import { pgNotifyClient } from '@app/common/pg-transport/pg-notify-client.symbol';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { PgTransportClient } from '@app/common/pg-transport/pg-transport.client';

@Injectable()
export class CollectionsService extends BaseService<
  CollectionEntity,
  CollectionDto
> {
  private logger: Logger = new Logger(CollectionsService.name);

  private readonly MAX_TOKEN_NUMBER = 2147483647;
  constructor(
    @Inject(pgNotifyClient) private client: PgTransportClient,
    @InjectRepository(CollectionEntity)
    private collectionRepository: Repository<CollectionEntity>
  ) {
    super({});
  }

  async addCollection(collectionId: number): Promise<any> {
    //await this.hasCollection(collectionId);

    this.client.emit('new-collection-added', {
      collectionId,
    });

    return {
      statusCode: 200,
      message:
        'The collection has been successfully added to the build to database task. Please wait!',
    };
  }

  async testClientMessage(): Promise<any> {
    this.client.emit('new-collection-added', { collectionId: 12 });
  }

  async testCreate(collectionId: number, allowedTokens: string) {
    await this.hasCollection(collectionId);

    const collection = await this.collectionRepository.create({
      decimalPoints: 0,
      description: null,
      mintMode: null,
      mode: null,
      name: null,
      network: null,
      owner: null,
      tokenPrefix: null,
      collectionId,
      allowedTokens,
      data: JSON.parse('{}'),
    });
    this.logger.log(`Added collection ${collection}`);
    return await this.collectionRepository.insert(collection);
  }

  async findAll(options: IPaginationOptions): Promise<any> {
    const qb = await this.collectionRepository.createQueryBuilder();
    const { items, meta } = await paginate(qb, options);
    return {
      meta,
      items,
    };
  }

  async allowedTokens(
    collection: number,
    data: { tokens: string }
  ): Promise<ResponseTokenDto> {
    const reg = /^[0-9-,]*$/;
    if (!reg.test(data.tokens)) {
      throw new BadRequestException('Wrong format insert tokens');
    }
    await this.checkoutTokens(data.tokens, reg);
    // Checkout collection
    const collectionFind: CollectionEntity =
      await this.collectionRepository.findOne({
        where: {
          collectionId: collection,
        },
      });
    if (collectionFind === null) {
      throw new NotFoundException('Collection not found');
    }
    await this.updateAllowedTokens(collectionFind.id, data.tokens);
    const message =
      data.tokens === ''
        ? `Add allowed tokens: all tokens for collection: ${collectionFind.id}`
        : `Add allowed tokens: ${data.tokens} for collection: ${collectionFind.id}`;

    return {
      statusCode: HttpStatus.OK,
      message,
    };
  }

  /**
   * Update allowed tokens for collection
   * @param {Number} id - id collection
   * @param {String} tokens - string data. Example: '2,17,21-42'
   * @return ({Promise<void>})
   */
  async updateAllowedTokens(id: string, tokens: string): Promise<void> {
    await this.collectionRepository.update(id, { allowedTokens: tokens });
  }

  /**
   * Toggle status of collection: Enabled or Disabled
   * @param updateCollectionStatusDto
   */
  async toggleCollection(
    updateCollectionStatusDto: UpdateCollectionStatusDto
  ): Promise<CollectionEntity> {
    try {
      const changedStatus = await this.collectionRepository.update(
        {
          collectionId: updateCollectionStatusDto.collectionId,
        },
        { status: updateCollectionStatusDto.status }
      );
      if (changedStatus.affected === 0) {
        throw new Error(
          `Collection ${updateCollectionStatusDto.status} not found`
        );
      }
      return await this.collectionRepository.findOne({
        where: { collectionId: updateCollectionStatusDto.collectionId },
      });
    } catch (e) {
      throw new BadRequestException('Not found');
    }
  }

  async remove(id: number) {
    return await this.collectionRepository.delete({ collectionId: id });
  }

  /**
   * Проверяем есть ли такая коллекция в списке макрета, Включена ли коллекция!
   * @param collectionId
   * @private
   */
  private async hasCollection(collectionId: number) {
    const collectioExist = await this.collectionRepository.findOne({
      where: { collectionId: collectionId },
    });
    if (collectioExist) {
      throw new BadRequestException(
        `Сollection present already on the market. Status: ${collectioExist.status}`
      );
    }
  }

  private async checkoutTokens(
    tokens: string,
    regex: RegExp
  ): Promise<void | BadRequestException> {
    const array = tokens.match(regex)[0];
    const arr = array.split(',');
    arr.forEach((token) => {
      const rangeNum = token.split('-');
      if (rangeNum.length > 1) {
        if (parseInt(rangeNum[0]) > this.MAX_TOKEN_NUMBER) {
          throw new BadRequestException(
            `Wrong token in the first range: [ ${rangeNum[0]} ] - ${rangeNum[1]}! Maximum ${this.MAX_TOKEN_NUMBER}. The start number in the range cannot be greater than the end number!`
          );
        }
        if (parseInt(rangeNum[1]) > this.MAX_TOKEN_NUMBER) {
          throw new BadRequestException(
            `Wrong token in the last range: ${rangeNum[0]} - [ ${rangeNum[1]} ]! Maximum ${this.MAX_TOKEN_NUMBER}`
          );
        }

        if (rangeNum[0] === '' || rangeNum[1] === '') {
          throw new BadRequestException(
            `Wrong tokens range! Set the correct range! Example: 2-300`
          );
        }
        if (parseInt(rangeNum[0]) === 0 || parseInt(rangeNum[1]) === 0) {
          throw new BadRequestException(
            'Wrong tokens range! There is no zero token!'
          );
        }
        if (parseInt(rangeNum[0]) > parseInt(rangeNum[1])) {
          throw new BadRequestException(
            `Wrong tokens range! Set the correct range! Example: 1-10 or 42-1337 `
          );
        }
      } else {
        if (parseInt(token) === 0) {
          throw new BadRequestException('Wrong token! There is no zero token!');
        }
        if (parseInt(token) > 2147483647) {
          throw new BadRequestException(
            `Wrong token > ${parseInt(token)} ! Maximum ${
              this.MAX_TOKEN_NUMBER
            }`
          );
        }
      }
    });
  }
}
