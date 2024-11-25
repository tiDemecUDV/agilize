import { fetchAuthSession } from '@aws-amplify/auth'
import { createContext, ReactNode, useEffect, useState } from 'react'

export interface User {
  exp?: number
  iss?: string
  aud?: string | string[]
  nbf?: number
  iat?: number
  scope?: string
  jti?: string
  sub?: string
}

interface AuthContextType {
  user: User | null
}

export const AuthContext = createContext({} as AuthContextType)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  async function getAuthenticatedUser() {
    try {
      setIsLoading(true)

      const { tokens } = await fetchAuthSession()
      setUser(tokens?.idToken?.payload || null)
    } catch {
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getAuthenticatedUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>
      {isLoading ? (
        <div className="w-screen h-screen flex items-center justify-center">
          <div className="flex items-center gap-2 animate-pulse">
            <img src="logo.png" alt="Logo Agilize" className="size-12" />
            <h1 className="text-4xl font-semibold text-gray-800">Agilize</h1>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  )
}
