import { useEffect, useState } from 'react'
import ProgressCard from './ProgressCard'
import { TrendingUp, Users } from 'lucide-react'

// Animation variants for staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
}
const FriendsProgress = ({ friends }) => {
  const [isVisible, setIsVisible] = useState(false)

  // Simulate entering view on load
  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg mr-3">
          <Users size={20} className="text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Friends Progress
        </h2>
        <div className="ml-auto flex items-center text-sm text-gray-600 dark:text-gray-400">
          <TrendingUp size={16} className="mr-1" />
          <span>Last updated: Today</span>
        </div>
      </div>

      <div
        initial="hidden"
        animate={isVisible ? 'show' : 'hidden'}
        variants={containerVariants}
        className="flex flex-wrap justify-center gap-8"
      >
        {friends.map((friend, index) => (
          <div
            key={friend.name}
            initial="hidden"
            animate={isVisible ? 'show' : 'hidden'}
            variants={itemVariants}
          >
            <ProgressCard friend={friend} />
          </div>
        ))}
      </div>

      {friends.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <Users size={40} className="mx-auto opacity-40 mb-2" />
          <p>No friends added yet</p>
        </div>
      )}
    </div>
  )
}

export default FriendsProgress
