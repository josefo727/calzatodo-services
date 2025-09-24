export interface Order {
  orderId: string
  sequence: string
  marketplaceOrderId: string
  marketplaceServicesEndpoint: string
  sellerOrderId: string
  origin: string
  affiliateId: string
  salesChannel: string
  merchantName: any
  status: string
  workflowIsInError: boolean
  statusDescription: string
  value: number
  creationDate: string
  lastChange: string
  orderGroup: string
  followUpEmail: string
  lastMessage: any
  hostname: string
  isCompleted: boolean
  roundingError: number
  orderFormId: string
  allowCancellation: boolean
  allowEdition: boolean
  isCheckedIn: boolean
  authorizedDate: string
  invoicedDate: any
  cancelReason: any
  checkedInPickupPointId: any
  totals: Total[]
  sellers: Seller[]
  clientPreferencesData: ClientPreferencesData
  cancellationData: any
  taxData: any
  subscriptionData: any
  itemMetadata: ItemMetadata
  marketplace: Marketplace
  storePreferencesData: StorePreferencesData
  customData: any
  commercialConditionData: any
  openTextField: any
  invoiceData: any
  changesAttachment: any
  callCenterOperatorData: any
  packageAttachment: PackageAttachment
  paymentData: PaymentData
  shippingData: ShippingData
  ratesAndBenefitsData: RatesAndBenefitsData
  marketingData: MarketingData
  giftRegistryData: any
  clientProfileData: ClientProfileData
  items: Item2[]
  marketplaceItems: any[]
  cancellationRequests: any
  approvedBy: any
  cancelledBy: any
  purchaseAgentData: any
  pendingData: any
  creationEnvironment: string
}

export interface Total {
  id: string
  name: string
  value: number
}

export interface Seller {
  id: string
  name: string
  logo: string
  fulfillmentEndpoint: string
}

export interface ClientPreferencesData {
  locale: string
  optinNewsLetter: boolean
}

export interface ItemMetadata {
  Items: Item[]
}

export interface Item {
  Id: string
  Seller: string
  Name: string
  SkuName: string
  ProductId: string
  RefId: string
  Ean: any
  ImageUrl: string
  DetailUrl: string
  AssemblyOptions: AssemblyOption[]
}

export interface AssemblyOption {
  Id: string
  Name: string
  Required: boolean
  InputValues: InputValues
  Composition: any
}

export interface InputValues {
  De: De
  Para: Para
  "E-mail": EMail
  Mensaje: Mensaje
}

export interface De {
  MaximumNumberOfCharacters: number
  Domain: any[]
}

export interface Para {
  MaximumNumberOfCharacters: number
  Domain: any[]
}

export interface EMail {
  MaximumNumberOfCharacters: number
  Domain: any[]
}

export interface Mensaje {
  MaximumNumberOfCharacters: number
  Domain: any[]
}

export interface Marketplace {
  baseURL: string
  isCertified: any
  name: string
}

export interface StorePreferencesData {
  countryCode: string
  currencyCode: string
  currencyFormatInfo: CurrencyFormatInfo
  currencyLocale: number
  currencySymbol: string
  timeZone: string
}

export interface CurrencyFormatInfo {
  CurrencyDecimalDigits: number
  CurrencyDecimalSeparator: string
  CurrencyGroupSeparator: string
  CurrencyGroupSize: number
  StartsWithCurrencySymbol: boolean
}

export interface PackageAttachment {
  packages: any[]
}

export interface PaymentData {
  transactions: Transaction[]
  giftCards: any[]
}

export interface Transaction {
  isActive: boolean
  transactionId: string
  merchantName: string
  payments: Payment[]
}

export interface Payment {
  id: string
  paymentSystem: string
  paymentSystemName: string
  value: number
  installments: number
  referenceValue: number
  cardHolder: any
  cardNumber: any
  firstDigits: any
  lastDigits: any
  cvv2: any
  expireMonth: any
  expireYear: any
  url: any
  giftCardId: any
  giftCardName: any
  giftCardCaption: any
  redemptionCode: any
  group: string
  tid: string
  dueDate: any
  connectorResponses: ConnectorResponses
  giftCardProvider: any
  giftCardAsDiscount: any
  koinUrl: any
  accountId: any
  parentAccountId: any
  bankIssuedInvoiceIdentificationNumber: any
  bankIssuedInvoiceIdentificationNumberFormatted: any
  bankIssuedInvoiceBarCodeNumber: any
  bankIssuedInvoiceBarCodeType: any
  billingAddress: any
  paymentOrigin: any
}

export interface ConnectorResponses {
  ReturnCode: any
  nsu: string
  Tid: string
  Message: any
}

export interface ShippingData {
  id: string
  address: Address
  logisticsInfo: LogisticsInfo[]
  trackingHints: any
  selectedAddresses: SelectedAddress[]
  availableAddresses: AvailableAddress[]
  contactInformation: any[]
}

export interface Address {
  addressType: string
  receiverName: string
  addressId: string
  versionId: any
  entityId: any
  postalCode: string
  city: string
  state: string
  country: string
  street: string
  number: any
  neighborhood: string
  complement: string
  reference: any
  geoCoordinates: number[]
}

export interface LogisticsInfo {
  itemIndex: number
  itemId: string
  selectedSla: string
  selectedDeliveryChannel: string
  lockTTL: string
  price: number
  listPrice: number
  sellingPrice: number
  deliveryWindow: any
  deliveryCompany: string
  shippingEstimate: string
  shippingEstimateDate: string
  slas: Sla[]
  shipsTo: string[]
  deliveryIds: DeliveryId2[]
  deliveryChannels: DeliveryChannel[]
  deliveryChannel: string
  pickupStoreInfo: PickupStoreInfo2
  addressId: string
  versionId: any
  entityId: any
  polygonName: string
  pickupPointId: any
  transitTime: string
}

export interface Sla {
  id: string
  name: string
  shippingEstimate: string
  deliveryWindow: any
  availableDeliveryWindows: any[]
  price: number
  listPrice: number
  deliveryChannel: string
  pickupStoreInfo: PickupStoreInfo
  polygonName: string
  lockTTL: string
  pickupPointId?: string
  transitTime: string
  pickupDistance: number
  deliveryIds: DeliveryId[]
  shippingEstimateDate?: string
}

export interface PickupStoreInfo {
  additionalInfo?: string
  address?: Address2
  dockId?: string
  friendlyName?: string
  isPickupStore: boolean
}

export interface Address2 {
  addressType: string
  receiverName: any
  addressId: string
  versionId: any
  entityId: any
  postalCode: string
  city: string
  state: string
  country: string
  street: string
  number: string
  neighborhood: string
  complement: string
  reference: any
  geoCoordinates: number[]
}

export interface DeliveryId {
  courierId: string
  courierName: string
  dockId: string
  quantity: number
  warehouseId: string
  accountCarrierName: string
  kitItemDetails: any[]
}

export interface DeliveryId2 {
  courierId: string
  courierName: string
  dockId: string
  quantity: number
  warehouseId: string
  accountCarrierName: string
  kitItemDetails: any[]
}

export interface DeliveryChannel {
  id: string
  stockBalance: number
}

export interface PickupStoreInfo2 {
  additionalInfo: any
  address: any
  dockId: any
  friendlyName: any
  isPickupStore: boolean
}

export interface SelectedAddress {
  addressType: string
  receiverName: string
  addressId: string
  versionId: any
  entityId: any
  postalCode: string
  city: string
  state: string
  country: string
  street: string
  number: any
  neighborhood: string
  complement: string
  reference: any
  geoCoordinates: number[]
}

export interface AvailableAddress {
  addressType: string
  receiverName: string
  addressId: string
  versionId: any
  entityId: any
  postalCode: string
  city: string
  state: string
  country: string
  street: string
  number: any
  neighborhood: string
  complement: string
  reference: any
  geoCoordinates: number[]
}

export interface RatesAndBenefitsData {
  id: string
  rateAndBenefitsIdentifiers: any[]
}

export interface MarketingData {
  id: string
  utmSource: any
  utmPartner: any
  utmMedium: any
  utmCampaign: any
  coupon: any
  utmiCampaign: any
  utmipage: any
  utmiPart: any
  marketingTags: string[]
}

export interface ClientProfileData {
  id: string
  email: string
  firstName: string
  lastName: string
  documentType: string
  document: string
  phone: string
  corporateName: any
  tradeName: any
  corporateDocument: any
  stateInscription: string
  corporatePhone: any
  isCorporate: boolean
  userProfileId: string
  userProfileVersion: any
  customerClass: any
  customerCode: any
}

export interface Item2 {
  uniqueId: string
  id: string
  productId: string
  ean: any
  lockId: string
  itemAttachment: ItemAttachment
  attachments: Attachment[]
  quantity: number
  seller: string
  name: string
  refId: string
  price: number
  listPrice: number
  manualPrice: any
  manualPriceAppliedBy: any
  priceTags: any[]
  imageUrl: string
  detailUrl: string
  components: any[]
  bundleItems: any[]
  params: any[]
  offerings: any[]
  attachmentOfferings: AttachmentOffering[]
  sellerSku: string
  priceValidUntil: string
  commission: number
  tax: number
  preSaleDate: any
  additionalInfo: AdditionalInfo
  measurementUnit: string
  unitMultiplier: number
  sellingPrice: number
  isGift: boolean
  shippingPrice: any
  rewardValue: number
  freightCommission: number
  priceDefinition: PriceDefinition
  taxCode: any
  parentItemIndex: any
  parentAssemblyBinding: any
  callCenterOperator: any
  serialNumbers: any
  assemblies: Assembly[]
  costPrice: number
}

export interface ItemAttachment {
  content: Content
  name: any
}

export interface Content {}

export interface Attachment {
  content: Content2
  name: string
}

export interface Content2 {
  De: string
  "E-mail": string
  Mensaje: string
  Para: string
}

export interface AttachmentOffering {
  name: string
  required: boolean
  schema: Schema
}

export interface Schema {
  De: De2
  Para: Para2
  "E-mail": EMail2
  Mensaje: Mensaje2
}

export interface De2 {
  MaximumNumberOfCharacters: number
  Domain: any[]
}

export interface Para2 {
  MaximumNumberOfCharacters: number
  Domain: any[]
}

export interface EMail2 {
  MaximumNumberOfCharacters: number
  Domain: any[]
}

export interface Mensaje2 {
  MaximumNumberOfCharacters: number
  Domain: any[]
}

export interface AdditionalInfo {
  brandName: string
  brandId: string
  categoriesIds: string
  categories: Category[]
  productClusterId: string
  commercialConditionId: string
  dimension: Dimension
  offeringInfo: any
  offeringType: any
  offeringTypeId: any
}

export interface Category {
  id: number
  name: string
}

export interface Dimension {
  cubicweight: number
  height: number
  length: number
  weight: number
  width: number
}

export interface PriceDefinition {
  sellingPrices: SellingPrice[]
  calculatedSellingPrice: number
  total: number
  reason: any
}

export interface SellingPrice {
  value: number
  quantity: number
}

export interface Assembly {
  id: string
  inputValues: InputValues2
}

export interface InputValues2 {
  De: string
  Para: string
  "E-mail": string
  Mensaje: string
}
