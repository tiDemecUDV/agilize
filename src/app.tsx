import { Amplify } from 'aws-amplify'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'

import { AuthProvider } from '@/contexts/auth'
import { env } from './env'
import { Router } from './routes'

import './global.css'

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: env.VITE_USER_POOL_ID,
      userPoolClientId: env.VITE_USER_POOL_CLIENT_ID,
    },
  },
})

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>

      <Toaster closeButton richColors />
    </BrowserRouter>
  )
}
