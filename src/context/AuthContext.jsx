import React, { createContext, useContext, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

const ADMIN_CREDENTIALS = {
  email: 'cucumber@novgu.com',
  password: 'memes123'
}

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useLocalStorage('admin', null)

  const login = async (email, password) => {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      setAdmin({ email, isAdmin: true })
      return { success: true }
    }
    return { success: false, error: 'Invalid credentials' }
  }

  const logout = () => {
    setAdmin(null)
  }

  return (
    <AuthContext.Provider value={{ admin, login, logout, isAuthenticated: !!admin }}>
      {children}
    </AuthContext.Provider>
  )
}