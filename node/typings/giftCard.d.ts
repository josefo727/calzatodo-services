export interface GiftCard {
  id: string
  redemptionToken: string
  redemptionCode: string
  balance: number
  relationName: string
  emissionDate: string
  expiringDate: string
  caption: string
  currencyCode: string
  discount: boolean
  transaction: {
    href: string
  }
}
