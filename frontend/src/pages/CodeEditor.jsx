import React, { useState, useEffect } from 'react'
import Split from 'react-split'
import Editor from '@monaco-editor/react'
import { useTheme } from '../context/ThemeContext'
import {
  Code,
  Play,
  CheckCircle,
  Clock,
  Users,
  Lightbulb,
  Pause,
} from 'lucide-react'
import '../styles/SplitStyles.css'
import { useParams } from 'react-router-dom'
import { getProblemByTitle } from '../services/problemService'
import ProblemDescription from '../components/CodeEditor/ProblemDescription'
import ExecutionResults from '../components/CodeEditor/ExecutionResults'
import { runCode, submitCodeWithTests } from '../services/executionServer'
import { updateUserSubmission } from '../services/userService' // Import the new service function
import { useAuth } from '../context/AuthContext'

export default function CodeEditor() {
  const { title } = useParams()
  const { theme } = useTheme()

  const [problem, setProblem] = useState(null)
  const [loadingProblem, setLoadingProblem] = useState(true)
  const [errorProblem, setErrorProblem] = useState(null)

  const [code, setCode] = useState('// Your code here')
  const [timer, setTimer] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [language, setLanguage] = useState('cpp')
  const [activeTab, setActiveTab] = useState('problem')
  const [submissionResults, setSubmissionResults] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionError, setSubmissionError] = useState(null)
  const { user } = useAuth()
  const userId = user?._id
  const [dailyProblemSolved, setDailyProblemSolved] = useState(false) // Add state to track if daily problem is solved

  // Timer Effect
  useEffect(() => {
    let interval = null
    if (isRunning) {
      interval = setInterval(() => setTimer((prev) => prev + 1), 1000)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  // Fetch problem
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        setLoadingProblem(true)
        const problemData = await getProblemByTitle(title)
        setProblem(problemData)

        const cppBoilerplate =
          problemData?.boilerplate ||
          `#include <iostream>\n#include <vector>\n\nint main() {\n    // Your code here\n    return 0;\n}`

        setCode(cppBoilerplate)
        setLoadingProblem(false)
      } catch (err) {
        console.error('Error fetching problem:', err)
        setErrorProblem('Failed to load problem. Please try again later.')
        setLoadingProblem(false)
      }
    }

    fetchProblem()
  }, [title])

  const formatTime = () => {
    const seconds = `0${timer % 60}`.slice(-2)
    const minutes = `0${Math.floor(timer / 60) % 60}`.slice(-2)
    const hours = `0${Math.floor(timer / 3600)}`.slice(-2)
    return `${hours}:${minutes}:${seconds}`
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const handleEditorChange = (value) => {
    setCode(value)
    if (!isRunning && timer === 0) {
      setIsRunning(true)
    }
  }

  const toggleTimer = () => setIsRunning((prev) => !prev)

  const runCodeSingle = async () => {
    const runBtn = document.getElementById('run-btn')
    if (runBtn) {
      runBtn.classList.add('animate-pulse')
      setTimeout(() => runBtn.classList.remove('animate-pulse'), 800)
    }

    setIsSubmitting(true)
    setSubmissionResults([])
    setSubmissionError(null)

    if (!problem?.testcases || problem.testcases.length === 0) {
      setSubmissionError('No test cases found for this problem.')
      setIsSubmitting(false)
      return
    }

    try {
      const results = await submitCodeWithTests(
        language,
        code,
        problem.testcases
      )
      setSubmissionResults(results)
      setIsSubmitting(false)
      setActiveTab('results')
    } catch (err) {
      console.error('Error running code against test cases:', err)
      setSubmissionError('Failed to run code against test cases.')
      setIsSubmitting(false)
      setSubmissionResults([])
      setActiveTab('results')
    }
  }

  const submitSolutionWithTestCases = async () => {
    const submitBtn = document.getElementById('submit-btn')
    if (submitBtn) {
      submitBtn.classList.add('animate-bounce')
      setTimeout(() => submitBtn.classList.remove('animate-bounce'), 800)
    }

    if (!userId) {
      setSubmissionError('You must be logged in to submit a solution.')
      setIsSubmitting(false)
      return
    }
    setIsRunning(false)
    setIsSubmitting(true)
    setSubmissionResults([])
    setSubmissionError(null)

    if (!problem?.testcases || problem.testcases.length === 0) {
      setSubmissionError('No test cases found for this problem.')
      setIsSubmitting(false)
      return
    }

    try {
      const results = await submitCodeWithTests(
        language,
        code,
        problem.testcases
      )
      setSubmissionResults(results)

      // Check if all test cases passed
      const allPassed = results.every((result) => result.passed)

      if (allPassed) {
        //  Update user submission data
        const submissionData = {
          qid: problem._id, //  problem ID
          progress: 'solved', //  or 'attempted', etc.
          solution: code,
          timeTaken: timer,
        }

        try {
          //  Call the service function to update the user's submission
          const response = await updateUserSubmission(
            userId,
            submissionData,
            dailyProblemSolved
          )
          console.log('User submission updated:', response)
          setDailyProblemSolved(response.dailyProblemSolved) // Update state if daily problem solved
        } catch (userUpdateError) {
          console.error('Error updating user submission:', userUpdateError)
          setSubmissionError(
            'Failed to submit your solution.  Please try again.'
          )
          setIsSubmitting(false)
          setActiveTab('results')
          return // Important: Exit the function on error
        }
      } else {
        setSubmissionError(
          'Your solution did not pass all test cases.  Please try again.'
        )
        console.log('Solution did not pass all test cases.')
      }

      setIsSubmitting(false)
      setActiveTab('results')
    } catch (err) {
      console.error('Error submitting with test cases:', err)
      setSubmissionError('Failed to submit solution for evaluation.')
      setIsSubmitting(false)
      setSubmissionResults([])
      setActiveTab('results')
    }
  }

  const viewFriendSolutions = () => {
    const friendsBtn = document.getElementById('friends-btn')
    if (friendsBtn) {
      friendsBtn.classList.add('animate-ping')
      setTimeout(() => friendsBtn.classList.remove('animate-ping'), 800)
    }
    alert('Friend solutions functionality would be implemented here!')
  }

  const getDifficultyColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'easy':
        return 'text-green-500'
      case 'medium':
        return 'text-yellow-500'
      case 'hard':
        return 'text-red-500'
      default:
        return 'text-gray-500'
    }
  }

  return (
    <div className="h-screen w-full flex flex-col bg-white dark:bg-zinc-900 text-black dark:text-white transition-colors duration-300 overflow-hidden pb-8">
      <Split
        className="flex flex-1"
        direction="horizontal"
        sizes={[40, 60]}
        minSize={200}
        gutterSize={8}
      >
        {/* Left Panel */}
        <div className="flex flex-col bg-gray-100 dark:bg-zinc-900 p-4 rounded-md shadow-md h-full overflow-hidden">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('problem')}
              className={`py-2 px-4 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'problem'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:border-gray-300'
              }`}
            >
              Problem
            </button>
            <button
              onClick={() => setActiveTab('results')}
              className={`py-2 px-4 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'results'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:border-gray-300'
              }`}
              disabled={isSubmitting}
            >
              Results
              {isSubmitting && (
                <div className="inline-block ml-2 animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500"></div>
              )}
            </button>
          </div>
          <div className="bg-white dark:bg-zinc-800 p-4 rounded-md shadow-inner overflow-y-auto flex-1">
            {activeTab === 'problem' && (
              <ProblemDescription
                problem={problem}
                loading={loadingProblem}
                error={errorProblem}
                formatDate={formatDate}
                getDifficultyColor={getDifficultyColor}
                viewFriendSolutions={viewFriendSolutions}
              />
            )}
            {activeTab === 'results' && (
              <ExecutionResults
                submissionResults={submissionResults}
                problem={problem}
                loading={isSubmitting}
                error={submissionError}
              />
            )}
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex flex-col p-1 gap-2 h-full overflow-hidden">
          <div className="flex items-center justify-between gap-4 mb-2 px-2">
            <button
              id="run-btn"
              onClick={runCodeSingle}
              disabled={isSubmitting}
              className={`flex items-center gap-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md text-white font-medium transition-all duration-200 shadow-md hover:shadow-lg ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Play className="w-4 h-4" />
              <span>Run</span>
            </button>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded-md">
                <Clock className="w-4 h-4 text-blue-500" />
                <div className="text-sm font-mono">{formatTime()}</div>
              </div>
              <button
                id="timer-btn"
                onClick={toggleTimer}
                className="flex items-center justify-center bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 p-1 rounded-md"
              >
                {isRunning ? (
                  <Pause className="w-4 h-4 text-orange-500" />
                ) : (
                  <Play className="w-4 h-4 text-green-500" />
                )}
              </button>
            </div>

            <button
              id="submit-btn"
              onClick={submitSolutionWithTestCases}
              disabled={isSubmitting}
              className={`flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white font-medium transition-all duration-200 shadow-md hover:shadow-lg ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>Submit</span>
            </button>
          </div>

          <div className="flex-1 max-h-[79%] border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden shadow-lg">
            <div className="h-8 bg-gray-100 dark:bg-zinc-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-3">
              <Code className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                main.{language === 'python3' ? 'py' : language}
              </span>
            </div>
            <Editor
              height="90%"
              defaultLanguage={language}
              value={code}
              onChange={handleEditorChange}
              theme={theme === 'dark' ? 'vs-dark' : 'light'}
              options={{
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                fontSize: 14,
                fontFamily: 'Menlo, Monaco, "Courier New", monospace',
                tabSize: 2,
              }}
              beforeMount={(monaco) => {
                monaco.editor.defineTheme('vs-dark', {
                  base: 'vs-dark',
                  inherit: true,
                  rules: [],
                  colors: {
                    'editor.background': '#1e1e1e',
                    'editor.lineHighlightBackground': '#2d2d2d',
                    'editorLineNumber.foreground': '#6e6e6e',
                    'editorCursor.foreground': '#d4d4d4',
                  },
                })
                monaco.editor.defineTheme('light', {
                  base: 'vs',
                  inherit: true,
                  rules: [],
                  colors: {
                    'editor.background': '#ffffff',
                    'editor.lineHighlightBackground': '#f5f5f5',
                    'editorLineNumber.foreground': '#999999',
                    'editorCursor.foreground': '#333333',
                  },
                })
              }}
            />
          </div>
        </div>
      </Split>
    </div>
  )
}
