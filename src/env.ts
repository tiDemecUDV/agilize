import { z } from 'zod'

const envSchema = z.object({
  VITE_USER_POOL_ID: z.string(),
  VITE_USER_POOL_CLIENT_ID: z.string(),
  VITE_RESEND_CODE_API_URL: z.string(),
  VITE_DIFY_IFRAME_URL: z.string(),
})

export const env = envSchema.parse(import.meta.env)
