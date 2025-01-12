import type { Subject } from 'rxjs'
export interface NotificationObject {
  type?: 'pending' | 'success' | 'error' | 'hint'
  message?: string
  autoDismiss?: number
  onclick?: (event: any) => void
  eventCode?: string
}

export interface ContractCall {
  contractType?: string
  contractAddress?: string
  contractAlias?: string
  methodName: string
  params: Record<string, unknown>
  contractName?: string
  contractDecimals?: number
  decimalValue?: string
}

export interface CommonTransactionData {
  system: System
  network: Network
  status: Status
  id?: string
  eventCode: string
  timeStamp: string
  serverVersion: string
  monitorId: string
  monitorVersion: string
  dispatchTimestamp: string
}

export interface BitcoinTransactionData extends CommonTransactionData {
  txid: string
  inputs: InputOutput[]
  outputs: InputOutput[]
  fee: string
  netBalanceChanges: BalanceChange[]
  rawTransaction: BitcoinRawTransaction
}

export interface EthereumTransactionData extends CommonTransactionData {
  hash: string
  asset: string
  blockHash: string | null
  blockNumber: number | null
  contractCall?: ContractCall
  internalTransactions?: InternalTransaction[]
  netBalanceChanges?: NetBalanceChange[]
  to: string
  from: string
  gas: number
  gasPrice?: string
  gasUsed?: number
  input: string
  nonce: number
  v: string
  r: string
  s: string
  transactionIndex?: number
  value: string
  startTime?: number
  timePending?: string
  watchedAddress?: string
  replaceHash?: string
  counterparty?: string
  direction?: string
  baseFeePerGasGwei?: number
  maxPriorityFeePerGasGwei?: number
  maxFeePerGasGwei?: number
  gasPriceGwei?: number
}

export interface InternalTransaction {
  type: string | number
  from: string
  to: string
  input: string
  gas: number
  gasPrice?: number
  gasUsed: number
  value: string | number
  contractCall: ContractCall
  error?: string
  errorReason?: string
  baseFeePerGasGwei?: number
  maxFeePerGas?: number
  maxPriorityFeePerGasGwei?: number
}

export interface NetBalanceChange {
  address: string
  balanceChanges: BalanceChange[]
}

export interface BalanceChange {
  delta: string
  asset: Asset
  breakdown: BreakDown[]
}

export interface Asset {
  type: string
  symbol: string
  contractAddress: string
}

export interface BreakDown {
  counterparty: string
  amount: string
}

export type TransactionData = BitcoinTransactionData | EthereumTransactionData

export interface TransactionEvent {
  emitterResult: void | boolean | NotificationObject
  transaction: TransactionData | TransactionEventLog
}

export type System = 'ethereum'

export type Network =
  | 'main'
  | 'goerli'
  | 'xdai'
  | 'matic-main'
  | 'matic-mumbai'
  | 'local'

export type Status =
  | 'pending'
  | 'confirmed'
  | 'speedup'
  | 'cancel'
  | 'failed'
  | 'dropped'
  | 'pending-simulation'
  | 'stuck'
  | 'simulated'

export interface InputOutput {
  address: string
  value: string
}

export interface BalanceChange {
  address: string
  delta: string
}

export interface BitcoinRawTransaction {
  txid: string
  hash: string
  version: number
  size: number
  vsize: number
  weight: number
  locktime: number
  vin: Vin[]
  vout: Vout[]
  hex: string
}

export interface Vin {
  txid: string
  vout: number
  scriptSig: {
    asm: string
    hex: string
  }
  txinwitness: string[]
  sequence: number
}

export interface Vout {
  value: number
  n: number
  scriptPubKey: {
    asm: string
    hex: string
    reqSigs: number
    type: string
    addresses: string[]
  }
}

export type MultiChainOptionsApiKey = {
  apiKey: string
  ws?: any
}

export type MultiChainOptionsApiUrl = {
  apiUrl: string
  ws?: any
}

export type MultiChainOptions =
  | MultiChainOptionsApiUrl
  | MultiChainOptionsApiKey

export type BaseInitializationOptions = {
  networkId: number
  system?: System
  name?: string
  appVersion?: string
  transactionHandlers?: TransactionHandler[]
  ws?: any
  onopen?: () => void
  ondown?: (closeEvent: CloseEvent) => void
  onreopen?: () => void
  onerror?: (error: SDKError) => void
  onclose?: () => void
}

export type InitializationOptionsDappId = BaseInitializationOptions & {
  dappId: string
  apiUrl?: string
}

export type InitializationOptionsApiUrl = BaseInitializationOptions & {
  apiUrl: string
}

/** Requires a dappId or an apiUrl with the apikey in the query parameter */
export type InitializationOptions =
  | InitializationOptionsApiUrl
  | InitializationOptionsDappId

export interface SDKError {
  message: string
  error?: any
  account?: string
  transaction?: string
}

export interface Emitter {
  listeners: {
    [key: string]: EmitterListener
  }
  on: (eventCode: TransactionEventCode, listener: EmitterListener) => void
  off: (eventCode: TransactionEventCode) => void
  emit: (
    state: TransactionData | TransactionEventLog
  ) => boolean | void | NotificationObject
}

export type TransactionEventCode =
  | 'txSent'
  | 'txPool'
  | 'txConfirmed'
  | 'txSpeedUp'
  | 'txCancel'
  | 'txFailed'
  | 'txRequest'
  | 'nsfFail'
  | 'txRepeat'
  | 'txAwaitingApproval'
  | 'txConfirmReminder'
  | 'txSendFail'
  | 'txError'
  | 'txUnderPriced'
  | 'txDropped'
  | 'txPoolSimulation'
  | 'all'

export interface Ac {
  address: string
  emitters: Emitter[]
}

export interface Tx {
  hash: string
  emitter: Emitter
}

export interface BaseTransactionLog {
  id: string
  startTime?: number
  status: string
  eventCode: string
}

export interface EthereumTransactionLog extends BaseTransactionLog {
  hash: string
  from?: string
  to?: string
  value?: number | string
  gas?: string
  gasPrice?: string
  maxPriorityFeePerGas?: string
  maxFeePerGas?: string
  nonce?: number
}

export interface BitcoinTransactionLog extends BaseTransactionLog {
  txid?: string
  [key: string]: string | number | undefined
}

export type TransactionEventLog = EthereumTransactionLog | BitcoinTransactionLog

export interface SimulationTransaction {
  from: string
  to: string
  value: number
  gas: number
  input: string
  gasPrice?: number
  maxPriorityFeePerGas?: number
  maxFeePerGas?: number
}

export interface SimDetails {
  blockNumber: number
  e2eMs: number
  performanceProfile: any
}

export interface SimulationTransactionOutput {
  id?: string
  from: string
  to: string
  value: number
  gas: number
  gasPrice: string
  input: string
  type: number
  gasUsed: number
  internalTransactions?: InternalTransaction[]
  netBalanceChanges?: BalanceChange[]
  serverVersion: string
  simulatedBlockNumber: number
  simDetails: SimDetails
  status: Status
  system: System
  network: Network
  error?: any
  contractCall: ContractCall
}

export type MultiSimContractCallData = {
  value: ContractCall
  status: string
}

export type MultiSimOutput = {
  id?: string
  contractCall: MultiSimContractCallData[]
  error?: any
  gasUsed: number[]
  internalTransactions: InternalTransaction[][]
  netBalanceChanges: NetBalanceChange[][]
  network: Network
  simDetails: SimDetails
  serverVersion: string
  system: System
  status: Status
  simulatedBlockNumber: number
  transactions: InternalTransaction[]
}

export interface Simulate {
  (
    system: System,
    network: Network,
    transaction: SimulationTransaction
  ): Promise<SimulationTransactionOutput>
}

export type BaseEventObject = {
  eventCode: string
  eventId?: string
  categoryCode: string
}

export type BaseTransactionEventObject = {
  startTime?: number
  status?: string
  id?: string
}

export type BitcoinTransactionEventObject = BaseTransactionEventObject & {
  txid: string
}

export type EthereumTransactionEventObject = BaseTransactionEventObject & {
  hash: string
}

export type TransactionEventObject = BaseEventObject & {
  transaction:
    | BitcoinTransactionEventObject
    | EthereumTransactionEventObject
    | SimulationTransaction
    | SimulationTransaction[]
}

export type WalletEventObject = BaseEventObject & {
  balance: { balance: string }
}
export type ContractEventObject = BaseEventObject & {
  contract: {
    methodName: string
    parameters: any[]
  }
}

export type AccountEventObject = BaseEventObject & {
  account: {
    address: string
  }
}

export type InitializeEventObject = BaseEventObject & { connectionId: string }

export type ConfigEventObject = BaseEventObject & {
  config: Config
}

export type EventObject =
  | TransactionEventObject
  | WalletEventObject
  | ContractEventObject
  | AccountEventObject
  | InitializeEventObject
  | ConfigEventObject

export interface TransactionHandler {
  (transaction: TransactionEvent): void
}

export interface EmitterListener {
  (state: TransactionData | TransactionEventLog):
    | boolean
    | undefined
    | NotificationObject
    | void
}

export interface Config {
  scope: string
  filters?: Filter[]
  abi?: any[]
  watchAddress?: boolean
}

export interface EnhancedConfig extends Config {
  emitter?: Emitter
  subscription?: Subject<void>
}

export interface Transaction {
  (hash: string, id?: string): {
    details: BitcoinTransactionLog | EthereumTransactionLog
    emitter: Emitter
  }
}

export interface Account {
  (address: string): { details: { address: string }; emitter: Emitter }
}

export interface Event {
  (eventObj: EventObject): void
}

export interface Unsubscribe {
  (addressOrHash: string): void
}

export interface Destroy {
  (): void
}

export interface Configuration {
  (config: Config): Promise<
    { details: { config: Config }; emitter?: Emitter } | string
  >
}

export interface API {
  transaction: Transaction
  account: Account
  event: Event
  simulate: Simulate
  unsubscribe: Unsubscribe
  destroy: Destroy
  config: Configuration
}

export interface LimitRules {
  points: number
  duration: number
}

interface FilterRange {
  from?: number
  to?: number
  gt?: number
  lt?: number
  gte?: number
  lte?: number
}

interface Primative {
  [key: string]:
    | string
    | number
    | Date
    | string[]
    | number[]
    | boolean
    | FilterRange
    | undefined
}

interface Modifier {
  _propertySearch?: boolean
  _propertySearchDepth?: number
  _join?: 'OR' | 'AND'
  _not?: boolean
  _text?: boolean
  _word?: boolean
  _start?: boolean
  _end?: boolean
  _regexp?: boolean
  _separator?: string
  terms?: Filter[]
}

type Filter = Primative | Modifier

export type Subscription = TransactionSubscription | AccountSubscription

export type BaseSubscription = {
  id: string
  chainId: ChainId
}

export type TransactionSubscription = BaseSubscription & {
  type: 'transaction'
}

export type AccountSubscription = BaseSubscription & {
  type: 'account'
  filters?: Config['filters']
  abi?: Config['abi']
}

/**
 * A hex encoded string
 */
export type ChainId = string
export type Address = string
export type Hash = string
