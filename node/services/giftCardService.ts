import { Clients } from '../clients'
import { BRAND_ID } from '../config/constants'
import { GiftCard } from '../typings/giftCard'
import { Order, Item2 } from '../typings/order'

export class GiftCardService {
  private clients: Clients

  constructor(clients: Clients) {
    this.clients = clients
  }

  public async processOrder(orderId: string): Promise<any> {
    const order: Order = await this.clients.oms.getOrder(orderId)

    const giftCardItems = order.items.filter(
      (item: Item2) => item.additionalInfo.brandId === BRAND_ID
    )

    if (giftCardItems.length === 0) {
      return
    }

    for (const [index, item] of giftCardItems.entries()) {
      const giftCardRegistrationId = `${order.sequence}-${item.uniqueId}-${(
        index + 1
      )
        .toString()
        .padStart(2, '0')}`

      const giftCardRegistered = await this.clients.masterData.getDocumentMD(
        'GR',
        giftCardRegistrationId
      )

      if (!!giftCardRegistered) {
        continue
      }

      const price = Math.floor(item.price / 100)

      const newGiftCard: GiftCard = await this.clients.giftCard.createGiftCard({
        relationName: 'GiftCard',
        expiringDate: new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        ).toISOString(),
        caption: 'Gift Card',
        profileId: order.clientProfileData.userProfileId,
        restrictedToOwner: false,
        currencyCode: 'COP',
        multipleCredits: true,
        multipleRedemptions: false,
      })

      await this.clients.giftCard.creditGiftCard(newGiftCard.id, {
        operation: 'Credit',
        value: price,
        description: 'Credit from order',
        redemptionToken: newGiftCard.redemptionToken,
        redemptionCode: newGiftCard.redemptionCode,
        requestId: `${orderId}-${item.id}`,
      })

      const updatedGiftCard = await this.clients.giftCard.getGiftCardById(
        newGiftCard.id
      )

      if (updatedGiftCard.balance !== price) {
        throw new Error(
          `Gift card balance mismatch. Expected ${price}, got ${updatedGiftCard.balance}`
        )
      }

      const attachmentContent = item.attachments[0].content as any

      await this.clients.masterData.createDocumentMD('GR', {
        id: giftCardRegistrationId,
        from: attachmentContent.De,
        to: attachmentContent.Para,
        message: attachmentContent.Mensaje,
        email: attachmentContent['E-mail'],
        amount: `COP $ ${price.toLocaleString('es-CO')}`,
        redemptionCode: newGiftCard.redemptionCode,
        emissionDate: newGiftCard.emissionDate,
        expiringDate: newGiftCard.expiringDate,
        giftCardId: newGiftCard.id
      })
    }
  }
}
