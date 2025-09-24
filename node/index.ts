import type { ClientsConfig, ServiceContext, RecorderState } from '@vtex/api'
import { LRUCache, method, Service } from '@vtex/api'

import { Clients } from './clients'
import { checkCoupon } from './middlewares/coupon'
import { handlePaymentApproved } from './middlewares/handlePaymentApproved'
import {GiftCardService} from "./services/giftCardService";

const TIMEOUT_MS = 30000

const memoryCache = new LRUCache<string, any>({ max: 5000 })

metrics.trackCache('status', memoryCache)

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
    status: {
      memoryCache,
    },
  },
}

declare global {
  type Context = ServiceContext<Clients, State>

  interface State extends RecorderState {
    code: number
  }
}

async function testGiftCardHandler(ctx: Context) {
  const { orderId } = ctx.vtex.route.params
  const giftCardService = new GiftCardService(ctx.clients)
  ctx.body = await giftCardService.processOrder(orderId as string)
  ctx.status = 200
}

export default new Service({
  clients,
  routes: {
    checkCoupon: method({
      POST: [checkCoupon],
    }),
    testGiftCard: method({
      GET: [testGiftCardHandler],
    }),
  },
  events: {
    handlePaymentApproved: handlePaymentApproved,
  },
})
