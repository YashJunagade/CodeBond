import { createContext, useContext, useEffect, useState } from 'react'
import { getUserProfile } from '../services/userService'
import { useAuth } from './AuthContext'

const UserProgressContext = createContext()

export const UserProgressProvider = ({ children }) => {
  const { user } = useAuth()
  const [progress, setProgress] = useState({ day: 0, week: 0, total: 0 })

  const fetchProgress = async () => {
    if (!user?._id) return
    try {
      const profile = await getUserProfile(user._id)
      setProgress(profile.score)
    } catch (err) {
      console.error('Error fetching progress:', err)
    }
  }

  useEffect(() => {
    fetchProgress()
  }, [user?._id])

  return (
    <UserProgressContext.Provider value={{ progress, fetchProgress }}>
      {children}
    </UserProgressContext.Provider>
  )
}

export const useUserProgress = () => useContext(UserProgressContext)
