import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { OfferEntity } from '../entities/offer.entity';
import { Market } from '../../../../contracts/assemblies/0/market';
import { OfferStatus } from '../../types';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(OfferEntity)
    private offerEntityRepository: Repository<OfferEntity>
  ) {}

  async delete(id: string) {
    await this.offerEntityRepository.delete({
      id,
    });
  }

  async update(
    contractAddress: string,
    order: Market.OrderStructOutput,
    status: OfferStatus
  ) {
    let offer = await this.offerEntityRepository.findOne({
      where: {
        collectionId: order.collectionId,
        tokenId: order.tokenId,
      },
    });

    if (!offer) {
      if (order.amount === 0) {
        return;
      }

      offer = this.offerEntityRepository.create();
      offer.id = uuid();
      offer.offerId = order.id;
      offer.collectionId = order.collectionId;
      offer.tokenId = order.tokenId;
      offer.status = OfferStatus.Opened;
    } else {
      offer.status = status;
    }

    offer.price = order.price.toBigInt();
    offer.amount = order.amount;
    offer.contractAddress = contractAddress;

    await this.offerEntityRepository.save(offer);
  }

  async find(
    collectionId: number,
    tokenId: number
  ): Promise<OfferEntity | null> {
    return this.offerEntityRepository.findOne({
      where: {
        collectionId,
        tokenId,
      },
    });
  }

  async getAllByCollection(collectionId: number): Promise<OfferEntity[]> {
    return this.offerEntityRepository.find({
      where: {
        collectionId,
      },
    });
  }
}
