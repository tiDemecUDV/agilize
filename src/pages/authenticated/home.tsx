import { env } from '@/env'

export function Home() {
  return (
    <iframe
      src={env.VITE_DIFY_IFRAME_URL}
      allow="microphone"
      className="w-full min-h-screen h-full"
    />
  )
}
