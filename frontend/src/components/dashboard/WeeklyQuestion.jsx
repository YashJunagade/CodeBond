import { useState } from 'react'
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  CalendarDays,
  Zap,
  BookOpen,
  Trophy,
} from 'lucide-react'

const WeeklyQuestion = ({ question }) => {
  const [isHovered, setIsHovered] = useState(false)

  // Determine status color and icon
  const isDone = question.status === 'Done'

  return (
    <div
      className="p-5 mt-6 border-t dark:border-gray-700 relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative background element */}
      <div
        className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-100 to-transparent dark:from-purple-900/20 rounded-full -mr-16 -mt-16 transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
      ></div>

      <div className="flex items-center mb-4">
        <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg mr-3">
          <CalendarDays
            size={18}
            className="text-purple-600 dark:text-purple-400"
          />
        </div>
        <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center">
          Weekly Challenge
          <div
            className={`ml-3 h-2 w-2 rounded-full ${isDone ? 'bg-green-500' : 'bg-amber-500'} animate-pulse`}
          ></div>
        </h2>

        <div className="ml-auto flex items-center bg-gray-100 dark:bg-gray-800 py-1 px-3 rounded-full text-sm">
          <CalendarDays
            size={14}
            className="mr-1 text-gray-500 dark:text-gray-400"
          />
          <span className="text-gray-600 dark:text-gray-300">
            Week {question.week}
          </span>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
          <div className="flex items-center mb-2 md:mb-0">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-lg mr-2">
              <Zap size={16} className="text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-medium text-gray-800 dark:text-white">
              {question.title}
            </h3>
          </div>

          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
            <div className="flex items-center mr-4">
              <CalendarDays size={15} className="mr-1" />
              <span>{question.date}</span>
            </div>
            <div className="flex items-center">
              <Clock size={15} className="mr-1" />
              <span>Time: {question.timeTaken}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {isDone ? (
            <div className="flex items-center text-sm bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full">
              <CheckCircle size={16} className="mr-1.5" />
              <span>Completed</span>
            </div>
          ) : (
            <div className="flex items-center text-sm bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-3 py-1 rounded-full">
              <XCircle size={16} className="mr-1.5" />
              <span>Not Completed</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WeeklyQuestion
