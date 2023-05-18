import { Inject, Injectable } from '@nestjs/common';
import { CollectionData, Sdk } from '@unique-nft/sdk/full';
import { OfferService, OfferEntity } from '@app/common/modules/database';

@Injectable()
export class CollectionEventsHandler {
  private abiByAddress: Record<string, any>;

  private queueIsBusy: boolean;
  private approveQueue: OfferEntity[] = [];

  constructor(
    private readonly sdk: Sdk,
    @Inject(OfferService)
    private readonly offerService: OfferService,
  ) {}

  public init(abiByAddress: Record<string, any>) {
    this.abiByAddress = abiByAddress;
  }

  public async onEvent(room, data: CollectionData) {
    const { parsed } = data;

    const { collectionId, tokenId, event } = parsed;

    const { method } = event;

    console.log('collection:onEvent', collectionId, tokenId, method);

    if (tokenId) {
      const offer = await this.offerService.find(collectionId, tokenId);
      if (!offer) {
        return;
      }

      if (method === 'ItemDestroyed') {
        await this.deleteOffer(offer);
      }

      if (method === 'Approved') {
        const { addressTo } = parsed;
        if (addressTo && this.abiByAddress[addressTo.toLowerCase()]) {
          await this.runCheckApproved(offer);
        }
      }

      if (method === 'Transfer') {
        await this.runCheckApproved(offer);
      }
    } else {
      if (method === 'CollectionDestroyed') {
        await this.deleteCollectionOffers(collectionId);
      }
    }
  }

  private async deleteOffer(offer: OfferEntity) {
    await this.offerService.delete(offer.id);

    await this.runCheckApproved(offer);
  }

  private async runCheckApproved(offer: OfferEntity) {
    console.log('runCheckApproved', this.queueIsBusy);
    if (this.queueIsBusy) {
      this.approveQueue.push(offer);
      return;
    }
    this.queueIsBusy = true;

    const abi = this.abiByAddress[offer.contract.address];

    const address = this.sdk.options.signer.address;

    const contract = await this.sdk.evm.contractConnect(offer.contract.address, abi);

    const args = {
      address,
      funcName: 'checkApproved',
      gasLimit: 10_000_000,
      args: {
        collectionId: offer.collectionId,
        tokenId: offer.tokenId,
      },
    };
    try {
      await contract.call(args);

      await contract.send.submitWaitResult(args);
    } catch (err) {
      console.log('checkApproved err', err);
    }

    this.queueIsBusy = false;
    if (this.approveQueue.length) {
      this.runCheckApproved(this.approveQueue.shift());
    }
  }

  private async deleteCollectionOffers(collectionId: number) {
    const offers = await this.offerService.getAllByCollection(collectionId);
    // todo delete all by one call in smart-contract
    await Promise.all(offers.map((offer) => this.runCheckApproved(offer)));
  }
}
