import { useEffect, useState } from 'react'
import FriendsProgress from '../components/dashboard/FriendsProgress'
import DailyQuestion from '../components/dashboard/DailyQuestion'
import WeeklyQuestion from '../components/dashboard/WeeklyQuestion'
import MotivationQuote from '../components/dashboard/MotivationQuote'
import { getAllProblems } from '../services/problemService'
import { useAuth } from '../context/AuthContext' // Import the AuthContext

const Dashboard = () => {
  const [dailyQuestion, setDailyQuestion] = useState(null)
  const [weeklyQuestion, setWeeklyQuestion] = useState(null)
  const [friends, setFriends] = useState([])
  const { user } = useAuth() // Get the user object from the context
  const [loggedInUserId, setLoggedInUserId] = useState(null)

  useEffect(() => {
    if (user) {
      setLoggedInUserId(user._id) // Access the user ID from the user object
    }
  }, [user])

  // Simulate fetching friends on component mount and when a friend is added
  const fetchFriendsProgress = async () => {
    if (!loggedInUserId) return // Don't fetch if we don't have the user ID yet

    try {
      const response = await fetch(`/api/friends/progress/${loggedInUserId}`)
      if (response.ok) {
        const data = await response.json()
        setFriends(data)
      } else {
        console.error('Failed to fetch friends progress')
        setFriends([])
      }
    } catch (error) {
      console.error('Error fetching friends progress:', error)
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
            status: 'Pending',
          })
        }

        if (weekly) {
          setWeeklyQuestion({
            week: weekly.dayOrWeekNo,
            date: new Date(weekly.date).toLocaleDateString('en-GB'),
            title: weekly.title,
            timeTaken: `${weekly.timeLimit} hr`,
          })
        }
      } catch (err) {
        console.error('Error fetching dashboard problems:', err)
      }
    }

    fetchDashboardQuestions()
  }, [])

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
      {dailyQuestion && <DailyQuestion question={dailyQuestion} />}
      {weeklyQuestion && <WeeklyQuestion question={weeklyQuestion} />}
      <MotivationQuote />
    </div>
  )
}

export default Dashboard
