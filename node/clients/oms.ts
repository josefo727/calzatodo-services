import { InstanceOptions, IOContext, JanusClient } from '@vtex/api'

export default class OMSClient extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
      headers: {
        ...options?.headers,
        ...(ctx.authToken ? { VtexIdclientAutCookie: ctx.authToken } : null),
      },
    })
  }

  public async listOrders(email: string): Promise<any> {
    const today = new Date()
    const lastYear = new Date(today)
    lastYear.setFullYear(today.getFullYear() - 1)

    const params = new URLSearchParams({
      q: email,
      f_creationDate: `creationDate:[${lastYear.toISOString()} TO ${today.toISOString()}]`,
    })

    return this.http.get(`/api/oms/pvt/orders?${params.toString()}`)
  }

  public async getOrder(orderId: string): Promise<any> {
    return this.http.get(`/api/oms/pvt/orders/${orderId}`)
  }
}
