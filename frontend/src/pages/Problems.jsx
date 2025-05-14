import { useEffect, useState } from 'react'
import ProblemTable from '../components/problem/ProblemTable'
import { getAllProblems } from '../services/problemService'

const Problems = () => {
  const [dailyProblems, setDailyProblems] = useState([])
  const [weeklyProblems, setWeeklyProblems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const allProblems = await getAllProblems()

        const daily = allProblems
          .filter((p) => p.category === 'daily')
          .map((p) => ({
            day: p.dayOrWeekNo,
            date: new Date(p.date).toLocaleDateString('en-GB'),
            statement: p.title,
            completed: false,
            time: `${p.timeLimit} hr`,
          }))
          .sort((a, b) => b.day - a.day) // Sort descending by day

        const weekly = allProblems
          .filter((p) => p.category === 'weekly')
          .map((p) => ({
            week: p.dayOrWeekNo,
            date: new Date(p.date).toLocaleDateString('en-GB'),
            statement: p.title,
            completed: false,
            time: `${p.timeLimit} hr`,
          }))
          .sort((a, b) => b.week - a.week) // Sort descending by week

        setDailyProblems(daily)
        setWeeklyProblems(weekly)
      } catch (error) {
        console.error('Failed to fetch problems:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProblems()
  }, [])

  if (loading) {
    return <div className="text-center mt-8">Loading problems...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-primaryBg">
      <main className="container mx-auto px-4 py-8">
        <ProblemTable
          title="Daily Problems"
          problems={dailyProblems}
          type="daily"
        />
        <ProblemTable
          title="Weekly Problems"
          problems={weeklyProblems}
          type="weekly"
        />
      </main>
    </div>
  )
}

export default Problems
