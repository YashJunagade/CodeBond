import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Code,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  AlertTriangle,
  Trophy,
  ArrowUpCircle,
} from 'lucide-react'

const API_BASE_URL = 'http://localhost:5000/api'

export default function SubmissionsList({ problemId }) {
  const { user } = useAuth()
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [expandedSubmission, setExpandedSubmission] = useState(null)

  useEffect(() => {
    if (!user?._id || !problemId) return

    const fetchSubmissions = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(
          `${API_BASE_URL}/submissions/user/${user._id}/problem/${problemId}`
        )
        if (!response.ok) {
          throw new Error('Failed to fetch submissions')
        }
        const data = await response.json()
        setSubmissions(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchSubmissions()
  }, [user, problemId])

  const toggleExpand = (id) => {
    setExpandedSubmission(expandedSubmission === id ? null : id)
  }

  // Calculate pass rate for each submission
  const getPassRate = (results) => {
    if (!results || results.length === 0) return 0
    const passed = results.filter((r) => r.passed).length
    return Math.round((passed / results.length) * 100)
  }

  if (!user?._id) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center p-8 bg-white dark:bg-zinc-900 rounded-lg shadow-md"
      >
        <AlertTriangle
          className="text-yellow-500 mr-2 animate-pulse"
          size={20}
        />
        <span>Please login to view your submissions.</span>
      </motion.div>
    )
  }

  if (loading)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center p-8"
      >
        <Loader2 className="text-blue-500 animate-spin mb-2" size={32} />
        <p className="text-gray-600 dark:text-gray-300">
          Loading submissions...
        </p>
      </motion.div>
    )

  if (error)
    return (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 p-4 rounded"
      >
        <div className="flex items-center">
          <AlertTriangle className="text-red-500 mr-2" size={20} />
          <span className="text-red-700 dark:text-red-300">{error}</span>
        </div>
      </motion.div>
    )

  if (submissions.length === 0)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-zinc-800/50 rounded-lg shadow-sm"
      >
        <Code className="text-gray-400 dark:text-gray-500 mb-2" size={32} />
        <p className="text-gray-600 dark:text-gray-400">
          No submissions found.
        </p>
      </motion.div>
    )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-h-96 overflow-y-auto pr-2 space-y-4 rounded-lg"
    >
      <AnimatePresence>
        {submissions.map((sub, index) => {
          const passRate = getPassRate(sub.results)
          const isExpanded = expandedSubmission === sub._id

          return (
            <motion.div
              key={sub._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
              className={`border rounded-lg overflow-hidden bg-gradient-to-r ${
                passRate > 80
                  ? 'from-emerald-50 to-white dark:from-emerald-900/20 dark:to-zinc-800'
                  : passRate > 30
                    ? 'from-amber-50 to-white dark:from-amber-900/20 dark:to-zinc-800'
                    : 'from-rose-50 to-white dark:from-rose-900/20 dark:to-zinc-800'
              } shadow-sm hover:shadow-md transition-all duration-300`}
            >
              <div
                onClick={() => toggleExpand(sub._id)}
                className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`p-2 rounded-full ${
                      passRate > 80
                        ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300'
                        : passRate > 30
                          ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300'
                          : 'bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300'
                    }`}
                  >
                    {passRate > 80 ? (
                      <Trophy size={20} />
                    ) : passRate > 30 ? (
                      <Code size={20} />
                    ) : (
                      <AlertTriangle size={20} />
                    )}
                  </motion.div>

                  <div>
                    <h3 className="font-semibold">
                      {sub.problemId?.title || 'Unknown Problem'}
                    </h3>
                    <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                      <Clock size={12} className="mr-1" />
                      {new Date(sub.submittedAt).toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center mt-2 sm:mt-0">
                  {sub.results && sub.results.length > 0 && (
                    <div className="flex items-center mr-3">
                      <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${passRate}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className={`h-full ${
                            passRate > 80
                              ? 'bg-emerald-500'
                              : passRate > 30
                                ? 'bg-amber-500'
                                : 'bg-rose-500'
                          }`}
                        />
                      </div>
                      <span className="ml-2 text-xs font-medium">
                        {passRate}%
                      </span>
                    </div>
                  )}

                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    className="bg-gray-100 dark:bg-gray-800 p-1 rounded-full"
                  >
                    <ArrowUpCircle
                      size={16}
                      className="text-gray-500 dark:text-gray-400"
                    />
                  </motion.div>
                </div>
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-4 pb-4">
                      <div className="bg-white dark:bg-zinc-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                        <div className="p-2 bg-gray-50 dark:bg-zinc-800 border-b border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-500 dark:text-gray-400">
                          Code Submission
                        </div>
                        <pre className="p-3 text-xs font-mono max-h-32 overflow-auto">
                          {sub.code}
                        </pre>
                      </div>

                      {sub.results && sub.results.length > 0 ? (
                        <div className="mt-3 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                          <div className="p-2 bg-gray-50 dark:bg-zinc-800 border-b border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-500 dark:text-gray-400">
                            Test Results
                          </div>
                          <div className="divide-y divide-gray-200 dark:divide-gray-700">
                            {sub.results.map((res, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="p-2 text-xs flex flex-col sm:flex-row justify-between"
                              >
                                <div className="mb-1 sm:mb-0">
                                  <span className="font-medium">Input:</span>
                                  <span className="ml-1 font-mono">
                                    {res.testcaseInput}
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <span className="font-medium">Output:</span>
                                  <span className="ml-1 font-mono">
                                    {res.actualOutput}
                                  </span>
                                  <motion.div
                                    initial={{ scale: 0.5 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                      type: 'spring',
                                      stiffness: 500,
                                      damping: 10,
                                      delay: idx * 0.05 + 0.2,
                                    }}
                                    className="ml-2"
                                  >
                                    {res.passed ? (
                                      <CheckCircle
                                        size={16}
                                        className="text-green-500"
                                      />
                                    ) : (
                                      <XCircle
                                        size={16}
                                        className="text-red-500"
                                      />
                                    )}
                                  </motion.div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="mt-3 p-3 text-center text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-zinc-800 rounded-lg">
                          No test results available.
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </motion.div>
  )
}
