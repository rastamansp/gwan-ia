import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { UserSession } from '../types/auth.types'

interface AuthContextType {
  user: UserSession | null
  login: (userData: UserSession) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(null)

  // Verifica se há usuário na sessão ao inicializar
  useEffect(() => {
    const sessionData = localStorage.getItem('userSession')
    if (sessionData) {
      try {
        const sessionUser = JSON.parse(sessionData)
        if (sessionUser && sessionUser.id) {
          setUser(sessionUser)
        }
      } catch (error) {
        console.error('Erro ao parsear sessão:', error)
        localStorage.removeItem('userSession')
      }
    }
  }, [])

  const login = (userData: UserSession) => {
    setUser(userData)
    localStorage.setItem('userSession', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('userSession')
  }

  const isAuthenticated = !!user

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
