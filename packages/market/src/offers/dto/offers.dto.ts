import { ContractEntity, OfferEntity, OfferEventEntity, ViewOffers } from '@app/common/modules/database';
import { OfferEventType, OfferStatus } from '@app/common/modules/types';
import { ApiProperty } from '@nestjs/swagger';
import { ContractDto } from './contract.dto';
import { Exclude, Expose, plainToInstance, Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { OfferPrice, PaginationResult, SortingParameter, TokenDescription } from '../interfaces/offers.interface';

export class OffersDto {
  @ApiProperty({ example: 200 })
  orderId: number;

  @ApiProperty({ example: 1 })
  amount: number;

  @ApiProperty({ example: 101 })
  collectionId: number;

  @ApiProperty({ example: 15 })
  tokenId: number;

  @ApiProperty({ example: ContractDto })
  contract: ContractDto;

  @ApiProperty({ example: 1_000_000_000_000_000_000 })
  price: bigint;

  @ApiProperty({ example: '5GeoRAcsvhZoFz77H9SqT3Umu5uPcLZEqppN6ixohEY3nKEX' })
  seller: string;

  @ApiProperty({ example: OfferStatus.Opened })
  status: OfferStatus;
}

export class OfferEventDto {
  @ApiProperty({})
  address: string;

  @ApiProperty({})
  blockNumber: number;

  @ApiProperty({ enum: OfferEventType })
  eventType: OfferEventType;
}

export class OffersFilter {
  @ApiProperty({
    name: 'collectionId',
    items: { type: 'integer', default: '' },
    required: false,
    type: 'array',
    isArray: true,
  })
  public collectionId?: number[];

  @ApiProperty({ required: false, type: String })
  @Type(() => BigInt)
  @IsOptional()
  //@Min(0)
  public minPrice?: bigint;

  @ApiProperty({ required: false, type: String })
  @Type(() => BigInt)
  // @Max(9223372036854775807)
  @IsOptional()
  public maxPrice?: bigint;

  @ApiProperty({ required: false })
  public seller?: string;

  @ApiProperty({
    name: 'numberOfAttributes',
    items: { type: 'integer', default: '' },
    required: false,
    type: 'array',
    isArray: true,
  })
  public numberOfAttributes?: number[];

  @ApiProperty({ required: false })
  public searchText?: string;

  @ApiProperty({ required: false })
  public searchLocale?: string;

  @ApiProperty({
    name: 'attributes',
    items: { type: 'string', default: '' },
    required: false,
    type: 'array',
    isArray: true,
  })
  public attributes?: string[];

  @ApiProperty({
    items: { type: 'string', default: 'desc(CreationDate)' },
    description:
      'Possible values: asc(Price), desc(Price), asc(TokenId), desc(TokenId), asc(CreationDate), desc(CreationDate), asc(Status), desc(Status)',
    required: false,
  })
  public sort?: SortingParameter[];
}

export class PaginationRequest {
  @ApiProperty({ required: false, type: 'integer' })
  public page?: number;

  @ApiProperty({ required: false, type: 'integer' })
  public pageSize?: number;
}

export class PaginationResultDto<T> implements PaginationResult<T> {
  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(type: Function, paginationResult: PaginationResult<T>) {
    this.type = type;
    Object.assign(this, paginationResult);
  }

  @Exclude()
  // eslint-disable-next-line @typescript-eslint/ban-types
  type: Function;

  @Type((options) => {
    return (options.newObject as PaginationResultDto<T>).type;
  })
  page: number;
  pageSize: number;
  itemsCount: number;
  items: T[];
  attributes?: Array<any>;
  attributesCount?: Array<any>;
}

export class OfferSortingRequest {
  @ApiProperty({
    items: { type: 'string', default: 'desc(CreationDate)' },
    description:
      'Possible values: asc(Price), desc(Price), asc(TokenId), desc(TokenId), asc(CreationDate), desc(CreationDate), asc(Status), desc(Status)',
    required: false,
  })
  public sort?: SortingParameter[];
}

export class TradeSortingRequest {
  @ApiProperty({
    items: { type: 'string', default: 'desc(TradeDate)' },
    description:
      'Possible values: asc(Price), desc(Price), asc(TokenId), desc(TokenId), asc(CollectionId), desc(CollectionId), asc(TradeDate), desc(TradeDate), asc(Status), desc(Status).',
    required: false,
  })
  public sort?: SortingParameter[];
}

export class OfferAttributes {
  @ApiProperty({ description: 'Number Of Attributes' })
  @Expose()
  numberOfAttributes: number;
  @ApiProperty({ description: 'Amount' })
  @Expose()
  amount: number;
}

export class TokenDescriptionDto {
  @Expose() @ApiProperty({ example: 'Test' }) collectionName: string;
  @Expose() image: string;
  @Expose() video: string;
  @Expose() @ApiProperty({ example: 'TEST' }) prefix: string;
  @Expose() @ApiProperty({ example: 'Test collection' }) description: string;
  @Expose() collectionCover: string;
  @Expose() @ApiProperty({ example: '5CSxpZepJj5dxkSBEDnN23pgg6B5X6VFRJ2kyubhb5Svstuu' }) owner: string;
  @Expose() collectionId: number;
  @Expose() @ApiProperty({ example: '1' }) tokenId: string;
  @Expose() attributes: Array<TokenDescription>;
  @Expose() nestingChildTokens: Array<any>;
}

export class CollectionDescriptionDto {
  @Expose() @ApiProperty({ example: 'NFT' }) mode: string;
  @Expose() @ApiProperty({ example: 'Test' }) name: string;
  @Expose() @ApiProperty({ example: 'Test collection' }) description: string;
  @Expose() @ApiProperty({ example: 'NFT' }) tokenPrefix: string;
  @Expose() id: number;
  @Expose() owner: string;
  @Expose() schema: any;
}

export class OfferPriceDto {
  @ApiProperty({ description: 'Parsed price', example: 4 })
  @Expose()
  parsed: number;

  @ApiProperty({ description: 'Raw price', example: '4000000000000' })
  @Expose()
  raw: string;
}

export class OfferEntityDto {
  @ApiProperty({ description: 'Collection ID', example: 16 })
  @Expose()
  collectionId: number;

  @ApiProperty({ description: 'Token ID', example: 4 })
  @Expose()
  tokenId: number;

  @ApiProperty({ description: 'Price', example: '100' })
  @Expose()
  price: OfferPriceDto;

  @ApiProperty({ description: 'Contract ask from', example: '5CfC8HRcV5Rc4jHFHmZsSjADCMYc7zoWbvxdoNG9qwEP7aUB' })
  @Expose()
  seller: string;

  @ApiProperty({ description: 'Status offer' })
  @Expose()
  status: string;

  @ApiProperty({ description: 'Data created' })
  @Expose()
  creationAt: Date;

  @ApiProperty({ description: 'Token description' })
  @Expose()
  @Type(() => TokenDescriptionDto)
  tokenDescription: TokenDescriptionDto;

  @ApiProperty({ description: 'Collection description' })
  @Expose()
  @Type(() => CollectionDescriptionDto)
  collectionDescription: CollectionDescriptionDto;

  static fromOffersEntity(offersData: any): OfferEntityDto {
    const plain: Record<string, any> = {
      ...offersData,
      collectionId: +offersData.collection_id,
      tokenId: +offersData.token_id,
      order: +offersData.order,
      price: offersData.price,
      seller: offersData.seller,
      creationAt: offersData.created_at,
      status: offersData.offerStatus,
    };

    return plainToInstance<OfferEntityDto, Record<string, any>>(OfferEntityDto, plain, {
      excludeExtraneousValues: true,
    });
  }
}
