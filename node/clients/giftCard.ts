import { InstanceOptions, IOContext, JanusClient, Apps } from '@vtex/api'
import { GiftCard } from '../typings/giftCard'

export class GiftCardClient extends JanusClient {
  private apps: Apps

  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
      headers: {
        ...options?.headers,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
    this.apps = new Apps(ctx)
  }

  private async getAppKeys() {
    const appId = process.env.VTEX_APP_ID || ''
    const appSettings = await this.apps.getAppSettings(appId)

    return {
      AppKey: appSettings.AppKey,
      AppToken: appSettings.AppToken,
    }
  }

  public createGiftCard = async (giftCard: {
    relationName: string
    expiringDate: string
    caption: string
    profileId: string
    restrictedToOwner: boolean
    currencyCode: string
    multipleCredits: boolean
    multipleRedemptions: boolean
  }): Promise<GiftCard> => {
    const { AppKey, AppToken } = await this.getAppKeys()

    return this.http.post('/api/giftcards', giftCard, {
      headers: {
        'X-VTEX-API-AppKey': AppKey,
        'X-VTEX-API-AppToken': AppToken,
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
    const { AppKey, AppToken } = await this.getAppKeys()

    return this.http.post(
      `/api/giftcards/${giftCardId}/transactions`,
      credit,
      {
        headers: {
          'X-VTEX-API-AppKey': AppKey,
          'X-VTEX-API-AppToken': AppToken,
        },
      }
    )
  }
}
