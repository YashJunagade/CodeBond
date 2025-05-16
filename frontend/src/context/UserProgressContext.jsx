import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { getUserProfile } from '../services/userService'

const UserProgressContext = createContext()

export const useUserProgress = () => useContext(UserProgressContext)

export const UserProgressProvider = ({ children }) => {
  const { user } = useAuth()
  const [progress, setProgress] = useState(null)
  const [loadingProgress, setLoadingProgress] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user?._id) {
        setProgress(null)
        setLoadingProgress(false)
        return
      }

      setLoadingProgress(true)
      setError(null)

      try {
        const data = await getUserProfile(user._id)

        const solvedDaily =
          data.problemSolved?.daily
            ?.filter((p) => p.progress === 'solved')
            .map((p) => p.qid) || []

        const solvedWeekly =
          data.problemSolved?.weekly
            ?.filter((p) => p.progress === 'solved')
            .map((p) => p.qid) || []

        setProgress({
          day: data.score?.day || 0,
          week: data.score?.week || 0,
          total: data.score?.total || 0,
          solvedProblems: [...solvedDaily, ...solvedWeekly],
        })
      } catch (err) {
        console.error('Error fetching user progress:', err)
        setError(err.message || 'Failed to fetch user progress.')
        setProgress(null)
      } finally {
        setLoadingProgress(false)
      }
    }

    fetchProgress()
  }, [user?._id])

  return (
    <UserProgressContext.Provider value={{ progress, loadingProgress, error }}>
      {children}
    </UserProgressContext.Provider>
  )
}
