import { json } from 'co-body'
import {getConfig} from "../services/getConfig";

export async function checkCoupon(ctx: Context, next: () => Promise<any>) {
  const { id, email } = await json(ctx.req)

  if (!id || !email) {
    ctx.status = 400
    ctx.body = 'Missing id or email'
    return
  }

  try {
    const { list } = await ctx.clients.oms.listOrders(email)

    if (list.length === 0) {
      await ctx.clients.masterData.updateDocumentMD('AP', id, { send_mail: true })
      ctx.status = 200
      ctx.body = 'No orders found, send_mail updated'
      return
    }

    const settings = await getConfig(null, null, ctx);
    const { coupon } = settings;

    for (const order of list) {
      const orderDetails = await ctx.clients.oms.getOrder(order.orderId)
      if (orderDetails.marketingData?.coupon === coupon) {
        ctx.status = 200
        ctx.body = 'Coupon found, no action taken'
        return
      }
    }

    await ctx.clients.masterData.updateDocumentMD('AP', id, { send_mail: true })
    ctx.status = 200
    ctx.body = 'Coupon not found, send_mail updated'

    await next()
  } catch (error) {
    ctx.status = 500
    ctx.body = 'Internal Server Error'
  }
}
