/**
 * Authentication middleware
 * Validates the app-key and app-token headers against the stored values
 * Returns 401 Unauthorized if validation fails
 */
import { authConfig } from '../config/auth'

export async function auth(ctx: Context, next: () => Promise<any>) {
  const recalzatodocolAppKey = ctx.get('app-key')
  const recalzatodocolAppToken = ctx.get('app-token')

  console.info('Auth middleware: validating app-key and app-token')

  // Validate app-key and app-token
  if (recalzatodocolAppKey !== authConfig.appKey || recalzatodocolAppToken !== authConfig.appToken) {
    console.error('Auth middleware: Invalid app-key or app-token')
    ctx.status = 401
    ctx.body = {
      message: 'Unauthorized: Invalid app-key or app-token',
    }
    return
  }

  console.info('Auth middleware: Authentication successful')

  // Pass control to the next middleware
  await next()
}
