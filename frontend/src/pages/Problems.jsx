import { useEffect, useState } from 'react'
import ProblemTable from '../components/problem/ProblemTable'
import { getAllProblems } from '../services/problemService'
import Loader from '../components/loader/Loader'
import { useUserProgress } from '../context/UserProgressContext'

const Problems = () => {
  const [dailyProblems, setDailyProblems] = useState([])
  const [weeklyProblems, setWeeklyProblems] = useState([])
  const [loading, setLoading] = useState(true)
  const { progress } = useUserProgress() // Access the entire progress object

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const allProblems = await getAllProblems()
        const daily = allProblems
          .filter((p) => p.category === 'daily')
          .map((p) => ({
            qid: p._id,
            day: p.dayOrWeekNo,
            date: new Date(p.date).toLocaleDateString('en-GB'),
            statement: p.title,
            completed: progress?.solvedProblems?.includes(p._id) || false, // Use optional chaining on progress and solvedProblems
            time: `${p.timeLimit} hr`,
          }))
          .sort((a, b) => b.day - a.day)

        const weekly = allProblems
          .filter((p) => p.category === 'weekly')
          .map((p) => ({
            qid: p._id,
            week: p.dayOrWeekNo,
            date: new Date(p.date).toLocaleDateString('en-GB'),
            statement: p.title,
            completed: progress?.solvedProblems?.includes(p._id) || false, // Use optional chaining
            time: `${p.timeLimit} hr`,
          }))
          .sort((a, b) => b.week - a.week)

        setDailyProblems(daily)
        setWeeklyProblems(weekly)
      } catch (error) {
        console.error('Failed to fetch problems:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProblems()
  }, [progress?.solvedProblems]) // Re-run effect when solvedProblems updates

  if (loading) {
    return (
      <div className="flex justify-center items-center dark:bg-primaryBg">
        <Loader />
      </div>
    )
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
