/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from '../../scripts/common-types';

export type CrossAddressStruct = {
  eth: PromiseOrValue<string>;
  sub: PromiseOrValue<BigNumberish>;
};

export type CrossAddressStructOutput = [string, BigNumber] & {
  eth: string;
  sub: BigNumber;
};

export declare namespace Market {
  export type OrderStruct = {
    id: PromiseOrValue<BigNumberish>;
    collectionId: PromiseOrValue<BigNumberish>;
    tokenId: PromiseOrValue<BigNumberish>;
    amount: PromiseOrValue<BigNumberish>;
    price: PromiseOrValue<BigNumberish>;
    seller: CrossAddressStruct;
  };

  export type OrderStructOutput = [
    number,
    number,
    number,
    number,
    BigNumber,
    CrossAddressStructOutput
  ] & {
    id: number;
    collectionId: number;
    tokenId: number;
    amount: number;
    price: BigNumber;
    seller: CrossAddressStructOutput;
  };
}

export interface MarketInterface extends utils.Interface {
  functions: {
    "addAdmin()": FunctionFragment;
    "buy(uint32,uint32,uint32,(address,uint256))": FunctionFragment;
    "checkApproved(uint32,uint32)": FunctionFragment;
    "getOrder(uint32,uint32)": FunctionFragment;
    "marketFee()": FunctionFragment;
    "put(uint32,uint32,uint256,uint32,(address,uint256))": FunctionFragment;
    "removeAdmin()": FunctionFragment;
    "revoke(uint32,uint32,uint32)": FunctionFragment;
    "setOwner()": FunctionFragment;
    "version()": FunctionFragment;
    "withdraw(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "addAdmin"
      | "buy"
      | "checkApproved"
      | "getOrder"
      | "marketFee"
      | "put"
      | "removeAdmin"
      | "revoke"
      | "setOwner"
      | "version"
      | "withdraw"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "addAdmin", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "buy",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      CrossAddressStruct
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "checkApproved",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getOrder",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "marketFee", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "put",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      CrossAddressStruct
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "removeAdmin",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "revoke",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(functionFragment: "setOwner", values?: undefined): string;
  encodeFunctionData(functionFragment: "version", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(functionFragment: "addAdmin", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "buy", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "checkApproved",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getOrder", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "marketFee", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "put", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removeAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "revoke", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setOwner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "version", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "Log(string)": EventFragment;
    "TokenIsApproved(uint32,tuple)": EventFragment;
    "TokenIsPurchased(uint32,tuple,uint32)": EventFragment;
    "TokenIsUpForSale(uint32,tuple)": EventFragment;
    "TokenRevoke(uint32,tuple,uint32)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Log"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TokenIsApproved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TokenIsPurchased"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TokenIsUpForSale"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TokenRevoke"): EventFragment;
}

export interface LogEventObject {
  message: string;
}
export type LogEvent = TypedEvent<[string], LogEventObject>;

export type LogEventFilter = TypedEventFilter<LogEvent>;

export interface TokenIsApprovedEventObject {
  version: number;
  item: Market.OrderStructOutput;
}
export type TokenIsApprovedEvent = TypedEvent<
  [number, Market.OrderStructOutput],
  TokenIsApprovedEventObject
>;

export type TokenIsApprovedEventFilter = TypedEventFilter<TokenIsApprovedEvent>;

export interface TokenIsPurchasedEventObject {
  version: number;
  item: Market.OrderStructOutput;
  salesAmount: number;
}
export type TokenIsPurchasedEvent = TypedEvent<
  [number, Market.OrderStructOutput, number],
  TokenIsPurchasedEventObject
>;

export type TokenIsPurchasedEventFilter =
  TypedEventFilter<TokenIsPurchasedEvent>;

export interface TokenIsUpForSaleEventObject {
  version: number;
  item: Market.OrderStructOutput;
}
export type TokenIsUpForSaleEvent = TypedEvent<
  [number, Market.OrderStructOutput],
  TokenIsUpForSaleEventObject
>;

export type TokenIsUpForSaleEventFilter =
  TypedEventFilter<TokenIsUpForSaleEvent>;

export interface TokenRevokeEventObject {
  version: number;
  item: Market.OrderStructOutput;
  amount: number;
}
export type TokenRevokeEvent = TypedEvent<
  [number, Market.OrderStructOutput, number],
  TokenRevokeEventObject
>;

export type TokenRevokeEventFilter = TypedEventFilter<TokenRevokeEvent>;

export interface Market extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MarketInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    addAdmin(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    buy(
      collectionId: PromiseOrValue<BigNumberish>,
      tokenId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      buyer: CrossAddressStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    checkApproved(
      collectionId: PromiseOrValue<BigNumberish>,
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getOrder(
      collectionId: PromiseOrValue<BigNumberish>,
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[Market.OrderStructOutput]>;

    marketFee(overrides?: CallOverrides): Promise<[number]>;

    put(
      collectionId: PromiseOrValue<BigNumberish>,
      tokenId: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      seller: CrossAddressStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    removeAdmin(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    revoke(
      collectionId: PromiseOrValue<BigNumberish>,
      tokenId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setOwner(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    version(overrides?: CallOverrides): Promise<[number]>;

    withdraw(
      transferTo: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  addAdmin(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  buy(
    collectionId: PromiseOrValue<BigNumberish>,
    tokenId: PromiseOrValue<BigNumberish>,
    amount: PromiseOrValue<BigNumberish>,
    buyer: CrossAddressStruct,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  checkApproved(
    collectionId: PromiseOrValue<BigNumberish>,
    tokenId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getOrder(
    collectionId: PromiseOrValue<BigNumberish>,
    tokenId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<Market.OrderStructOutput>;

  marketFee(overrides?: CallOverrides): Promise<number>;

  put(
    collectionId: PromiseOrValue<BigNumberish>,
    tokenId: PromiseOrValue<BigNumberish>,
    price: PromiseOrValue<BigNumberish>,
    amount: PromiseOrValue<BigNumberish>,
    seller: CrossAddressStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  removeAdmin(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  revoke(
    collectionId: PromiseOrValue<BigNumberish>,
    tokenId: PromiseOrValue<BigNumberish>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setOwner(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  version(overrides?: CallOverrides): Promise<number>;

  withdraw(
    transferTo: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addAdmin(overrides?: CallOverrides): Promise<void>;

    buy(
      collectionId: PromiseOrValue<BigNumberish>,
      tokenId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      buyer: CrossAddressStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    checkApproved(
      collectionId: PromiseOrValue<BigNumberish>,
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    getOrder(
      collectionId: PromiseOrValue<BigNumberish>,
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<Market.OrderStructOutput>;

    marketFee(overrides?: CallOverrides): Promise<number>;

    put(
      collectionId: PromiseOrValue<BigNumberish>,
      tokenId: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      seller: CrossAddressStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    removeAdmin(overrides?: CallOverrides): Promise<void>;

    revoke(
      collectionId: PromiseOrValue<BigNumberish>,
      tokenId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setOwner(overrides?: CallOverrides): Promise<void>;

    version(overrides?: CallOverrides): Promise<number>;

    withdraw(
      transferTo: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Log(string)"(message?: null): LogEventFilter;
    Log(message?: null): LogEventFilter;

    "TokenIsApproved(uint32,tuple)"(
      version?: null,
      item?: null
    ): TokenIsApprovedEventFilter;
    TokenIsApproved(version?: null, item?: null): TokenIsApprovedEventFilter;

    "TokenIsPurchased(uint32,tuple,uint32)"(
      version?: null,
      item?: null,
      salesAmount?: null
    ): TokenIsPurchasedEventFilter;
    TokenIsPurchased(
      version?: null,
      item?: null,
      salesAmount?: null
    ): TokenIsPurchasedEventFilter;

    "TokenIsUpForSale(uint32,tuple)"(
      version?: null,
      item?: null
    ): TokenIsUpForSaleEventFilter;
    TokenIsUpForSale(version?: null, item?: null): TokenIsUpForSaleEventFilter;

    "TokenRevoke(uint32,tuple,uint32)"(
      version?: null,
      item?: null,
      amount?: null
    ): TokenRevokeEventFilter;
    TokenRevoke(
      version?: null,
      item?: null,
      amount?: null
    ): TokenRevokeEventFilter;
  };

  estimateGas: {
    addAdmin(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    buy(
      collectionId: PromiseOrValue<BigNumberish>,
      tokenId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      buyer: CrossAddressStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    checkApproved(
      collectionId: PromiseOrValue<BigNumberish>,
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getOrder(
      collectionId: PromiseOrValue<BigNumberish>,
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    marketFee(overrides?: CallOverrides): Promise<BigNumber>;

    put(
      collectionId: PromiseOrValue<BigNumberish>,
      tokenId: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      seller: CrossAddressStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    removeAdmin(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    revoke(
      collectionId: PromiseOrValue<BigNumberish>,
      tokenId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setOwner(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    version(overrides?: CallOverrides): Promise<BigNumber>;

    withdraw(
      transferTo: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addAdmin(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    buy(
      collectionId: PromiseOrValue<BigNumberish>,
      tokenId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      buyer: CrossAddressStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    checkApproved(
      collectionId: PromiseOrValue<BigNumberish>,
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getOrder(
      collectionId: PromiseOrValue<BigNumberish>,
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    marketFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    put(
      collectionId: PromiseOrValue<BigNumberish>,
      tokenId: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      seller: CrossAddressStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    removeAdmin(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    revoke(
      collectionId: PromiseOrValue<BigNumberish>,
      tokenId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setOwner(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    version(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    withdraw(
      transferTo: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}


export type MarketEventNames = "TokenIsApproved" | "TokenIsPurchased" | "TokenIsUpForSale" | "TokenRevoke";
