import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    // Redireciona para login se não estiver autenticado
    return <Navigate to="/auth" state={{ from: location }} replace />
  }

  // Se estiver autenticado, renderiza o componente filho
  return <>{children}</>
}

export default ProtectedRoute
