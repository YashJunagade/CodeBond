import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import {
  Calendar,
  Clock,
  Check,
  Plus,
  Trash2,
  FileCode,
  CalendarDays,
  Tag,
  Book,
  Code,
  Zap,
  AlarmClock,
} from 'lucide-react'

export default function CustomProblem() {
  const { theme } = useTheme()
  const [problemType, setProblemType] = useState('daily')
  const [testCases, setTestCases] = useState([
    { input: '', expectedOutput: '' },
  ])
  const [difficulty, setDifficulty] = useState('medium')
  const [loading, setLoading] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    exampleExplanation: '',
    timeLimit: 0,
    dayNumber: 1,
    weekNumber: 1,
    weekDay: 'Monday',
    date: new Date().toISOString().split('T')[0],
    tags: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleTestCaseChange = (index, field, value) => {
    const updatedTestCases = [...testCases]
    updatedTestCases[index][field] = value
    setTestCases(updatedTestCases)
  }

  const addTestCase = () => {
    setTestCases([...testCases, { input: '', expectedOutput: '' }])
  }

  const removeTestCase = (index) => {
    const updatedTestCases = testCases.filter((_, i) => i !== index)
    setTestCases(updatedTestCases)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Prepare data for submission
    const problemData = {
      ...formData,
      problemType,
      testCases,
      difficulty,
      dateCreated: new Date().toISOString(),
    }

    console.log('Submitting problem data:', problemData)

    // Mock API call
    setTimeout(() => {
      setLoading(false)
      // Reset form or show success
      alert('Problem uploaded successfully!')
    }, 1500)
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-primaryBg text-gray-900 dark:text-gray-100 transition-colors duration-300 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center">
            <FileCode className="mr-2 text-blue-500" />
            Upload Coding Problem
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info Section */}
          <section className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Book className="mr-2 text-indigo-500" />
              Basic Information
            </h2>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium mb-1"
                >
                  Problem Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  required
                  placeholder="e.g., Two Sum"
                />
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Difficulty Level
                </label>
                <div className="flex flex-wrap gap-3">
                  {['easy', 'medium', 'hard'].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setDifficulty(level)}
                      className={`px-4 py-2 rounded-full text-sm font-medium capitalize
                        ${
                          difficulty === level
                            ? level === 'easy'
                              ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                              : level === 'medium'
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                                : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
                        }
                        transition-colors duration-200`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium mb-1 flex items-center"
                >
                  <Tag className="mr-1 w-4 h-4" />
                  Tags
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="e.g., arrays, hash-table, two-pointers (comma separated)"
                />
              </div>
            </div>
          </section>

          {/* Problem Details Section */}
          <section className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Code className="mr-2 text-teal-500" />
              Problem Details
            </h2>

            <div className="space-y-4">
              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium mb-1"
                >
                  Problem Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors font-mono"
                  required
                  placeholder="Describe the problem in detail..."
                ></textarea>
              </div>

              {/* Example Explanation */}
              <div>
                <label
                  htmlFor="exampleExplanation"
                  className="block text-sm font-medium mb-1"
                >
                  Example Explanation
                </label>
                <textarea
                  id="exampleExplanation"
                  name="exampleExplanation"
                  value={formData.exampleExplanation}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors font-mono"
                  placeholder="Explain the example solution step by step..."
                ></textarea>
              </div>

              {/* Time Limit */}
              <div>
                <label
                  htmlFor="timeLimit"
                  className="block text-sm font-medium mb-1 flex items-center"
                >
                  <AlarmClock className="mr-1 w-4 h-4" />
                  Time Limit (seconds)
                </label>
                <input
                  type="number"
                  id="timeLimit"
                  name="timeLimit"
                  value={formData.timeLimit}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full sm:w-32 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="0 = no limit"
                />
              </div>
            </div>
          </section>

          {/* Test Cases Section */}
          <section className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Zap className="mr-2 text-amber-500" />
              Test Cases
            </h2>

            <div className="space-y-4">
              {testCases.map((testCase, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Test Case #{index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeTestCase(index)}
                      className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
                      disabled={testCases.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Input
                      </label>
                      <textarea
                        value={testCase.input}
                        onChange={(e) =>
                          handleTestCaseChange(index, 'input', e.target.value)
                        }
                        rows={3}
                        className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors font-mono text-sm"
                        placeholder="Input values"
                        required
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Expected Output
                      </label>
                      <textarea
                        value={testCase.expectedOutput}
                        onChange={(e) =>
                          handleTestCaseChange(
                            index,
                            'expectedOutput',
                            e.target.value
                          )
                        }
                        rows={3}
                        className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors font-mono text-sm"
                        placeholder="Expected output"
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addTestCase}
                className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
              >
                <Plus className="w-4 h-4 mr-1" /> Add Test Case
              </button>
            </div>
          </section>

          {/* Scheduling Section */}
          <section className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Calendar className="mr-2 text-purple-500" />
              Scheduling
            </h2>

            <div className="space-y-4">
              {/* Problem Type Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Problem Type
                </label>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setProblemType('daily')}
                    className={`px-4 py-2 rounded-md text-sm font-medium
                      ${problemType === 'daily' ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'}
                      transition-colors duration-200`}
                  >
                    Daily Challenge
                  </button>
                  <button
                    type="button"
                    onClick={() => setProblemType('weekly')}
                    className={`px-4 py-2 rounded-md text-sm font-medium
                      ${problemType === 'weekly' ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'}
                      transition-colors duration-200`}
                  >
                    Weekly Challenge
                  </button>
                </div>
              </div>

              {/* Dynamic fields based on problem type */}
              {problemType === 'daily' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="dayNumber"
                      className="block text-sm font-medium mb-1"
                    >
                      Day Number
                    </label>
                    <input
                      type="number"
                      id="dayNumber"
                      name="dayNumber"
                      value={formData.dayNumber}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium mb-1"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      required
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="weekNumber"
                      className="block text-sm font-medium mb-1"
                    >
                      Week Number
                    </label>
                    <input
                      type="number"
                      id="weekNumber"
                      name="weekNumber"
                      value={formData.weekNumber}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="weekDay"
                      className="block text-sm font-medium mb-1"
                    >
                      Weekday
                    </label>
                    <select
                      id="weekDay"
                      name="weekDay"
                      value={formData.weekDay}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      required
                    >
                      {[
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                        'Saturday',
                        'Sunday',
                      ].map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium mb-1"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      required
                    />
                  </div>
                </div>
              )}
            </div>
          </section>
          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                    ></path>
                  </svg>
                  Uploading...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  Submit Problem
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
