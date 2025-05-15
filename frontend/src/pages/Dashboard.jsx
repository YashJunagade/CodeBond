import { useEffect, useState } from 'react'
import FriendsProgress from '../components/dashboard/FriendsProgress'
import DailyQuestion from '../components/dashboard/DailyQuestion'
import WeeklyQuestion from '../components/dashboard/WeeklyQuestion'
import MotivationQuote from '../components/dashboard/MotivationQuote'
import { getAllProblems } from '../services/problemService'
import useRedirectIfNotLoggedIn from '../hooks/useRedirectIfNotLoggedIn'

const Dashboard = () => {
  const [dailyQuestion, setDailyQuestion] = useState(null)
  const [weeklyQuestion, setWeeklyQuestion] = useState(null)

  const friends = [
    {
      name: 'Tanu',
      avatar: 'https://example.com/tanu.jpg',
      dayStreak: 1,
      weekStreak: 1,
      totalScore: 10,
      todayStatus: 'Done',
    },
    {
      name: 'Brinda',
      avatar: 'https://example.com/brinda.jpg',
      dayStreak: 1,
      weekStreak: 1,
      totalScore: 10,
      todayStatus: 'Done',
    },
  ]
  useEffect(() => {
    const fetchDashboardQuestions = async () => {
      try {
        const problems = await getAllProblems()
        const now = new Date()
        now.setHours(0, 0, 0, 0)

        // Helper to filter future/today questions and sort them by date
        const getUpcoming = (category) => {
          return problems
            .filter((p) => p.category === category && new Date(p.date) >= now)
            .sort((a, b) => new Date(a.date) - new Date(b.date))[0] // only the next one
        }

        const daily = getUpcoming('daily')
        const weekly = getUpcoming('weekly')

        if (daily) {
          setDailyQuestion({
            day: daily.dayOrWeekNo,
            date: new Date(daily.date).toLocaleDateString('en-GB'),
            title: daily.title,
            timeTaken: `${daily.timeLimit} hr`,
            status: 'Pending', // or 'Done' if you track completion
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
      <FriendsProgress friends={friends} />
      {dailyQuestion && <DailyQuestion question={dailyQuestion} />}
      {weeklyQuestion && <WeeklyQuestion question={weeklyQuestion} />}
      <MotivationQuote />
    </div>
  )
}

export default Dashboard
