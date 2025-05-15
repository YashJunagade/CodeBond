// src/hooks/useRedirectIfNotLoggedIn.js
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const useRedirectIfNotLoggedIn = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])
}

export default useRedirectIfNotLoggedIn
