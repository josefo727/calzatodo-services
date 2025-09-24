import { EventContext } from '@vtex/api'

import { Clients } from '../clients'
import {GiftCardService} from '../services/giftCardService'

export async function handlePaymentApproved(
  ctx: EventContext<Clients>,
  next: () => Promise<any>
) {
  const { body } = ctx
  const { orderId, currentState, lastState } = body

  if (currentState === 'payment-approved' && lastState !== 'payment-approved') {
    const giftCardService = new GiftCardService(ctx.clients)
    await giftCardService.processOrder(orderId)
  }

  await next()
}
