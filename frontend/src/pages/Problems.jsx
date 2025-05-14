import ProblemTable from '../components/problem/ProblemTable'

const Problems = () => {
  // Sample data
  const dailyProblems = [
    {
      day: 4,
      date: '13-05-25',
      statement: 'sum of two numbers',
      completed: false,
      time: '0 hr',
    },
    {
      day: 3,
      date: '12-05-25',
      statement: 'sum of three numbers',
      completed: true,
      time: '0.3 hr',
    },
    {
      day: 4,
      date: '13-05-25',
      statement: 'sum of two numbers',
      completed: false,
      time: '0 hr',
    },
    {
      day: 3,
      date: '12-05-25',
      statement: 'sum of three numbers',
      completed: true,
      time: '0.3 hr',
    },
    {
      day: 4,
      date: '13-05-25',
      statement: 'sum of two numbers',
      completed: false,
      time: '0 hr',
    },
    {
      day: 3,
      date: '12-05-25',
      statement: 'sum of three numbers',
      completed: true,
      time: '0.3 hr',
    },
    {
      day: 4,
      date: '13-05-25',
      statement: 'sum of two numbers',
      completed: false,
      time: '0 hr',
    },
  ]

  const weeklyProblems = [
    {
      week: 4,
      date: '13-05-25',
      statement: 'sum of two numbers',
      completed: false,
      time: '0 hr',
    },
    {
      week: 3,
      date: '12-05-25',
      statement: 'sum of three numbers',
      completed: true,
      time: '0.3 hr',
    },
    {
      week: 4,
      date: '13-05-25',
      statement: 'sum of two numbers',
      completed: false,
      time: '0 hr',
    },
    {
      week: 3,
      date: '12-05-25',
      statement: 'sum of three numbers',
      completed: true,
      time: '0.3 hr',
    },
    {
      week: 4,
      date: '13-05-25',
      statement: 'sum of two numbers',
      completed: false,
      time: '0 hr',
    },
    {
      week: 3,
      date: '12-05-25',
      statement: 'sum of three numbers',
      completed: true,
      time: '0.3 hr',
    },
    {
      week: 4,
      date: '13-05-25',
      statement: 'sum of two numbers',
      completed: false,
      time: '0 hr',
    },
  ]

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
