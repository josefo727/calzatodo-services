import { InstanceOptions, IOContext, JanusClient } from '@vtex/api'
import { GiftCard } from '../typings/giftCard'

export class GiftCardClient extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
      headers: {
        ...options?.headers,
        ...(ctx.authToken ? { VtexIdclientAutCookie: ctx.authToken } : null),
      },
    })
  }

  public createGiftCard = (giftCard: {
    relationName: string
    expiringDate: string
    caption: string
    restrictedToOwner: boolean
    currencyCode: string
    multipleCredits: boolean
    multipleRedemptions: boolean
  }): Promise<GiftCard> => {
    return this.http.post('/api/giftcards', giftCard, {
      headers: {
        VtexIdClientAutCookie: this.context.authToken,
      },
    })
  }

  public creditGiftCard = async (
    giftCardId: string,
    credit: {
      operation: 'Credit'
      value: number
      description: string
      redemptionToken: string
      redemptionCode: string
      requestId: string
    }
  ) => {
    return this.http.post(
      `/api/giftcards/${giftCardId}/transactions`,
      credit,
      {
        headers: {
          VtexIdClientAutCookie: this.context.authToken,
        },
      }
    )
  }
}
