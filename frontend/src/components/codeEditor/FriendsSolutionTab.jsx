import React, { useState } from 'react'
import {
  Users,
  Award,
  ThumbsUp,
  Clock,
  Code,
  BarChart,
  Heart,
  Share2,
  Sparkles,
} from 'lucide-react'
import { motion } from 'framer-motion'

const FriendsSolutionTab = ({ friendsSolutions, loadingFriends }) => {
  const [selectedSolution, setSelectedSolution] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalCode, setModalCode] = useState('')

  // Animation variants
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
    show: { y: 0, opacity: 1 },
  }

  const openCodeModal = (code) => {
    setModalCode(code)
    setIsModalOpen(true)
  }

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center h-64 p-6 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: [0, 10, 0, -10, 0] }}
        transition={{ duration: 0.8 }}
        className="mb-6"
      >
        <Users className="w-16 h-16 text-gray-400 dark:text-gray-500" />
      </motion.div>
      <h3 className="text-lg font-semibold mb-2">No Solutions Yet</h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-xs">
        None of your friends have solved this problem yet. Be the first one to
        crack it!
      </p>
    </div>
  )

  const renderLeaderboardHeader = () => (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex items-center justify-between mb-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 p-3 rounded-lg"
    >
      <div className="flex items-center">
        <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
        <h3 className="font-bold text-lg">Friends' Leaderboard</h3>
      </div>
      <motion.div
        whileHover={{ rotate: 20 }}
        className="bg-yellow-100 dark:bg-yellow-900/30 p-1 rounded-full"
      >
        <Award className="w-5 h-5 text-yellow-500" />
      </motion.div>
    </motion.div>
  )

  const renderSolutionItem = (solution, index) => (
    <motion.div
      key={index}
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      className={`relative mb-4 rounded-lg overflow-hidden transition-all ${
        selectedSolution === index
          ? 'ring-2 ring-blue-500 dark:ring-blue-400'
          : 'hover:shadow-md dark:hover:shadow-zinc-800/50'
      }`}
    >
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm">
        {/* Top medal for top 3 solutions */}
        {index < 3 && (
          <div className="absolute -right-2 -top-2">
            <motion.div
              initial={{ rotate: -20, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className={`p-1 rounded-full shadow-lg ${
                index === 0
                  ? 'bg-yellow-100 dark:bg-yellow-900/50'
                  : index === 1
                    ? 'bg-gray-100 dark:bg-gray-700/50'
                    : 'bg-amber-100 dark:bg-amber-900/50'
              }`}
            >
              <Award
                className={`w-5 h-5 ${
                  index === 0
                    ? 'text-yellow-500'
                    : index === 1
                      ? 'text-gray-500'
                      : 'text-amber-600'
                }`}
              />
            </motion.div>
          </div>
        )}

        {/* Solution header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-zinc-700">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={solution.avatar}
                alt={`${solution.name}'s avatar`}
                className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-zinc-700"
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-3 h-3 border-2 border-white dark:border-zinc-800"
              />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                {solution.name}
              </h3>
              <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                <Clock className="w-3 h-3" />
                <span>
                  {Math.floor(solution.timeTaken / 60)}m{' '}
                  {solution.timeTaken % 60}s
                </span>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-zinc-700 dark:hover:bg-zinc-600 transition-colors"
              onClick={() => openCodeModal(solution.solution)}
            >
              <Code className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-1 py-1 px-2 rounded-full bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-800/40 transition-colors"
            >
              <Heart className="w-3 h-3 text-red-500" />
              <span className="text-xs font-medium text-blue-800 dark:text-blue-300">
                Like
              </span>
            </motion.button>
          </div>
        </div>

        {/* Stats footer */}
        <div className="flex items-center justify-between py-2 px-4 bg-gray-50 dark:bg-zinc-900/50 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center">
            <ThumbsUp className="w-3 h-3 mr-1 text-blue-500" />
            {index * 2 + 3} likes
          </span>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="flex items-center"
          >
            <Sparkles className="w-3 h-3 mr-1 text-purple-500" />
            {['Clean', 'Fast', 'Optimized'][index % 3]}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )

  const renderLoading = () => (
    <div className="flex flex-col items-center justify-center h-64">
      <motion.div
        animate={{
          rotate: 360,
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
      >
        <Code className="w-10 h-10 text-blue-500" />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-gray-500 dark:text-gray-400"
      >
        Loading friends' solutions...
      </motion.p>
    </div>
  )

  // Define the Trophy component since it's not provided in lucide-react by default
  const Trophy = ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
      <path d="M4 22h16"></path>
      <path d="M10 5.5V22"></path>
      <path d="M14 5.5V22"></path>
      <path d="M8 5.5a4 4 0 0 1 8 0"></path>
    </svg>
  )

  return (
    <div className="space-y-4">
      {loadingFriends ? (
        renderLoading()
      ) : !friendsSolutions || friendsSolutions.length === 0 ? (
        renderEmptyState()
      ) : (
        <>
          {renderLeaderboardHeader()}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-2"
          >
            {friendsSolutions.map((solution, index) =>
              renderSolutionItem(solution, index)
            )}
          </motion.div>
        </>
      )}
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6l12 12"
                />
              </svg>
            </button>
            <h3 className="text-lg font-semibold mb-4">Code</h3>
            <div className="bg-gray-50 dark:bg-zinc-900 p-4 rounded-md overflow-x-auto">
              <pre className="text-xs whitespace-pre-wrap font-mono text-gray-800 dark:text-gray-300">
                {modalCode}
              </pre>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default FriendsSolutionTab
