import React, { useEffect, useState } from 'react'
import FriendsProgress from '../components/dashboard/FriendsProgress'
import DailyQuestion from '../components/dashboard/DailyQuestion'
import WeeklyQuestion from '../components/dashboard/WeeklyQuestion'
import MotivationQuote from '../components/dashboard/MotivationQuote'
import { getAllProblems } from '../services/problemService'
import { useAuth } from '../context/AuthContext' // Import the AuthContext
import { getUserProfile } from '../services/userService'
import friendService from '../services/friendService'

const Dashboard = () => {
  const [dailyQuestion, setDailyQuestion] = useState(null)
  const [weeklyQuestion, setWeeklyQuestion] = useState(null)
  const [friends, setFriends] = useState([])
  const { user } = useAuth() // Get the user object from the context
  const [loggedInUserId, setLoggedInUserId] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [dailyProblemSolved, setDailyProblemSolved] = useState(false)
  const [weeklyProblemSolved, setWeeklyProblemSolved] = useState(false)
  const [loading, setLoading] = useState(true) // Add loading state

  useEffect(() => {
    if (user) {
      setLoggedInUserId(user._id) // Access the user ID from the user object
    }
  }, [user])

  // Simulate fetching friends on component mount and when a friend is added
  const fetchFriendsProgress = async () => {
    if (!loggedInUserId) return
    try {
      const data = await friendService.getFriendsProgress(loggedInUserId)
      setFriends(data)
    } catch (error) {
      console.error('Error fetching friends progress:', error.message)
      setFriends([])
    }
  }

  useEffect(() => {
    if (loggedInUserId) {
      fetchFriendsProgress()
    }
  }, [loggedInUserId])

  const handleFriendAdded = () => {
    fetchFriendsProgress()
  }

  const fetchUserProfile = async () => {
    if (!loggedInUserId) return
    try {
      const profile = await getUserProfile(loggedInUserId)
      setUserProfile(profile)

      const now = new Date()
      now.setHours(0, 0, 0, 0)

      const problems = await getAllProblems()

      // Get today's daily problem
      const daily = problems
        .filter((p) => p.category === 'daily' && new Date(p.date) >= now)
        .sort((a, b) => new Date(a.date) - new Date(b.date))[0]

      // Get current week's weekly problem
      const weekly = problems
        .filter((p) => p.category === 'weekly' && new Date(p.date) >= now)
        .sort((a, b) => new Date(a.date) - new Date(b.date))[0]

      setDailyProblemSolved(
        profile.problemSolved?.daily?.some((sub) => sub.qid === daily?._id) ||
          false
      )

      setWeeklyProblemSolved(
        profile.problemSolved?.weekly?.some((sub) => sub.qid === weekly?._id) ||
          false
      )
    } catch (error) {
      console.error('Error fetching user profile:', error)
    } finally {
      setLoading(false) // Set loading to false after fetching
    }
  }

  useEffect(() => {
    if (loggedInUserId) {
      setLoading(true) //start loading
      fetchUserProfile()
    }
  }, [loggedInUserId])

  useEffect(() => {
    const fetchDashboardQuestions = async () => {
      try {
        const problems = await getAllProblems()
        const now = new Date()
        now.setHours(0, 0, 0, 0)

        const getUpcoming = (category) => {
          return problems
            .filter((p) => p.category === category && new Date(p.date) >= now)
            .sort((a, b) => new Date(a.date) - new Date(b.date))[0]
        }

        const daily = getUpcoming('daily')
        const weekly = getUpcoming('weekly')

        if (daily) {
          setDailyQuestion({
            day: daily.dayOrWeekNo,
            date: new Date(daily.date).toLocaleDateString('en-GB'),
            title: daily.title,
            timeTaken: `${daily.timeLimit} hr`,
            status: dailyProblemSolved ? 'Done' : 'Pending', // Use the state
          })
        }

        if (weekly) {
          setWeeklyQuestion({
            week: weekly.dayOrWeekNo,
            date: new Date(weekly.date).toLocaleDateString('en-GB'),
            title: weekly.title,
            timeTaken: `${weekly.timeLimit} hr`,
            status: weeklyProblemSolved ? 'Done' : 'Pending', // Use the state
          })
        }
      } catch (err) {
        console.error('Error fetching dashboard problems:', err)
      }
    }

    fetchDashboardQuestions()
  }, [dailyProblemSolved, weeklyProblemSolved])

  return (
    <div className="min-h-screen dark:bg-primaryBg">
      {/* <Header /> */}
      {loggedInUserId && (
        <FriendsProgress
          friends={friends}
          userId={loggedInUserId}
          onFriendAdded={handleFriendAdded}
        />
      )}
      {dailyQuestion && (
        <DailyQuestion question={dailyQuestion} loading={loading} />
      )}
      {weeklyQuestion && (
        <WeeklyQuestion question={weeklyQuestion} loading={loading} />
      )}
      <MotivationQuote />
    </div>
  )
}

export default Dashboard
