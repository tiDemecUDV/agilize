import { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { AuthContext } from '@/contexts/auth'

import { Home } from '@/pages/authenticated/home'

import { UnauthenticatedLayout } from '@/pages/_layouts/unauthenticated'
import { ForgotPassword } from '@/pages/unauthenticated/forgot-password'
import { ResetPassword } from '@/pages/unauthenticated/reset-password'
import { SignIn } from '@/pages/unauthenticated/sign-in'

function AuthenticatedRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="*" element={<Navigate to="/" replace={true} />} />
    </Routes>
  )
}

function UnauthenticatedRouter() {
  return (
    <Routes>
      <Route path="/" element={<UnauthenticatedLayout />}>
        <Route path="/" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace={true} />} />
    </Routes>
  )
}

export function Router() {
  const { user } = useContext(AuthContext)

  return user?.sub ? <AuthenticatedRouter /> : <UnauthenticatedRouter />
}
