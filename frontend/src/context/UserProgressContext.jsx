// src/context/UserProgressContext.js
import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { getUserProfile } from '../services/userService'

const UserProgressContext = createContext()

export const useUserProgress = () => useContext(UserProgressContext)

export const UserProgressProvider = ({ children }) => {
  const { user } = useAuth()
  const [progress, setProgress] = useState({
    day: 0,
    week: 0,
    total: 0,
    solvedProblems: [],
  })

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user?._id) return

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
      } catch (error) {
        console.error('Error fetching user progress:', error)
      }
    }

    fetchProgress()
  }, [user?._id])

  return (
    <UserProgressContext.Provider value={progress}>
      {children}
    </UserProgressContext.Provider>
  )
}
