import Navbar from '../components/navbar/Header'
import FriendsProgress from '../components/dashboard/FriendsProgress'
import DailyQuestion from '../components/dashboard/DailyQuestion'
import WeeklyQuestion from '../components/dashboard/WeeklyQuestion'
import MotivationQuote from '../components/dashboard/MotivationQuote'

const Dashboard = () => {
  const user = {
    name: 'Yash',
    avatar: 'https://example.com/yash.jpg',
  }

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

  const daily = {
    day: 1,
    date: '13-05-25',
    title: 'Sum of Two Number',
    timeTaken: '1.3 hr',
  }
  const weekly = {
    week: 1,
    date: '18-05-25',
    title: 'Fibonacci Series',
    timeTaken: '1 hr',
  }
  const quote = {
    text: 'THANK YOU SO MUCH GOD FOR EVERYTHING. I NEVER SEE THAT YOU GIVE ME LESS THAN ANYONE',
    author: 'Yash Junagade',
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <FriendsProgress friends={friends} />
      <DailyQuestion question={daily} />
      <WeeklyQuestion question={weekly} />
      <MotivationQuote quote={quote} />
    </div>
  )
}

export default Dashboard
