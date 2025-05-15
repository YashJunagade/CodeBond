import {
  CheckCircle,
  XCircle,
  Award,
  Zap,
  Flame,
  Calendar,
  TrendingUp,
  Users,
} from 'lucide-react'
import { useState, useEffect } from 'react'

const ProgressCard = ({ friend }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl p-5 w-full sm:w-72 md:w-80 lg:w-96 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 md:mx-10"
    >
      {/* Decorative corner accent */}
      <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20"></div>

      <div className="flex flex-col sm:flex-row mb-4 items-center sm:items-start">
        <div className="relative w-24 h-24 mb-3 sm:mb-0 sm:mr-4">
          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse ${isHovered ? 'opacity-70' : 'opacity-30'}`}
            style={{
              transform: `scale(${isHovered ? 1.05 : 1})`,
              transition: 'all 0.3s ease',
            }}
          ></div>
          <img
            src={friend.avatar}
            className="absolute inset-1 w-[88px] h-[88px] rounded-full object-cover border-2 border-white dark:border-gray-700"
            alt={friend.name}
          />

          {/* Status indicator */}
          <div
            className={`absolute bottom-0 right-0 w-6 h-6 rounded-full flex items-center justify-center 
              ${friend.todayStatus === 'Done' ? 'bg-green-500' : 'bg-red-500'} border-2 border-white dark:border-gray-700`}
          >
            {friend.todayStatus === 'Done' ? (
              <CheckCircle size={14} className="text-white" />
            ) : (
              <XCircle size={14} className="text-white" />
            )}
          </div>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">
            {friend.name}
          </h3>

          <div className="flex flex-col sm:flex-col space-y-1">
            <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
              <div className="bg-orange-100 dark:bg-orange-900/30 p-1 rounded-full mr-2">
                <Flame size={14} className="text-orange-500" />
              </div>
              <span className="font-medium">Day Streak:</span>
              <span className="ml-1">{friend.dayStreak}</span>
            </div>

            <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded-full mr-2">
                <Calendar size={14} className="text-blue-500" />
              </div>
              <span className="font-medium">Week Streak:</span>
              <span className="ml-1">{friend.weekStreak}</span>
            </div>

            <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-1 rounded-full mr-2">
                <Award size={14} className="text-purple-500" />
              </div>
              <span className="font-medium">Total Score:</span>
              <span className="ml-1">{friend.totalScore}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Today's status with animation */}
      <div className="mt-4 flex justify-center sm:justify-start">
        {friend.todayStatus === 'Done' ? (
          <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-medium py-1 px-3 rounded-full text-sm flex items-center">
            <CheckCircle size={16} className="mr-1" />
            <span>Completed Today</span>
          </div>
        ) : (
          <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 font-medium py-1 px-3 rounded-full text-sm flex items-center">
            <XCircle size={16} className="mr-1" />
            <span>Not Completed Today</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProgressCard
