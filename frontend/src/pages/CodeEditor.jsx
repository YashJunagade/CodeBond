import React, { useState, useEffect } from 'react'
import Split from 'react-split'
import Editor from '@monaco-editor/react'
import { useTheme } from '../context/ThemeContext'
import { Code, Play, CheckCircle, Clock, Pause } from 'lucide-react'
import '../styles/SplitStyles.css'
import { useParams } from 'react-router-dom'
import { getProblemByTitle } from '../services/problemService'
import ProblemDescription from '../components/CodeEditor/ProblemDescription'
import ExecutionResults from '../components/CodeEditor/ExecutionResults'
import { runCode, submitCodeWithTests } from '../services/executionServer'
import { getUserProfile, updateUserSubmission } from '../services/userService'
import { useAuth } from '../context/AuthContext'
import SubmissionsList from '../components/codeEditor/SubmissionList'
import { createSubmission } from '../services/submissionService'
import { getFriendsSolutions } from '../services/friendService'
import FriendsSolutionTab from '../components/codeEditor/FriendsSolutionTab' // Import the new tab component

export default function CodeEditor() {
  const { title } = useParams()
  const { theme } = useTheme()
  const { user } = useAuth()
  const userId = user?._id

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
  const [isProblemSolved, setIsProblemSolved] = useState(false)
  const [solvedCode, setSolvedCode] = useState(null)
  const [boilerplateCode, setBoilerplateCode] = useState('// Your code here')
  const [dailyProblemSolved, setDailyProblemSolved] = useState(false)

  const [friendsSolutions, setFriendsSolutions] = useState(null)
  const [loadingFriends, setLoadingFriends] = useState(false)

  useEffect(() => {
    let intervalId

    const fetchFriendsSolutionsPeriodically = async () => {
      if (userId && problem?._id) {
        try {
          const solutions = await getFriendsSolutions(userId, problem._id)
          setFriendsSolutions(solutions)
        } catch (err) {
          console.error('Failed to fetch friends’ solutions:', err)
        }
      }
    }

    if (activeTab === 'friends solution' && userId && problem?._id) {
      setLoadingFriends(true)
      fetchFriendsSolutionsPeriodically() // Initial fetch
      intervalId = setInterval(fetchFriendsSolutionsPeriodically, 5000) // Fetch every 5 seconds
      setLoadingFriends(false)
    } else {
      clearInterval(intervalId) // Clear interval if tab is not active or no problem/user
    }

    return () => clearInterval(intervalId) // Cleanup on unmount
  }, [userId, problem?._id, activeTab])

  useEffect(() => {
    let interval = null
    if (isRunning) {
      interval = setInterval(() => setTimer((prev) => prev + 1), 1000)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  useEffect(() => {
    const fetchProblemAndUserData = async () => {
      try {
        setLoadingProblem(true)
        const problemData = await getProblemByTitle(title)
        setProblem(problemData)

        let initialCode = problemData?.boilerplate || `// Your code here`
        setBoilerplateCode(initialCode)

        let isSolved = false
        let savedSolution = null

        if (userId) {
          const userProfile = await getUserProfile(userId)
          const solvedEntry =
            userProfile.problemSolved.daily.find(
              (entry) =>
                entry.qid === problemData._id && entry.progress === 'solved'
            ) ||
            userProfile.problemSolved.weekly.find(
              (entry) =>
                entry.qid === problemData._id && entry.progress === 'solved'
            )

          if (solvedEntry) {
            isSolved = true
            savedSolution = solvedEntry.solution
            initialCode = savedEntry.solution
          }
        }

        setSolvedCode(savedSolution)

        setIsProblemSolved(isSolved)
        setLoadingProblem(false)
      } catch (err) {
        console.error('Error fetching problem:', err)
        setErrorProblem('Failed to load problem. Please try again later.')
        setLoadingProblem(false)
      }
    }

    fetchProblemAndUserData()
  }, [title, userId])

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        setLoadingProblem(true)
        const problemData = await getProblemByTitle(title)
        setProblem(problemData)

        let initialCode = problemData?.boilerplate || `// Your code here`
        let alreadySolved = false

        if (userId) {
          const userProfile = await getUserProfile(userId)
          const solvedEntry = userProfile.problemSolved?.daily?.find(
            (entry) =>
              entry.qid === problemData._id && entry.progress === 'solved'
          )

          if (solvedEntry) {
            alreadySolved = true
            initialCode = solvedEntry.solution
          }
        }

        setDailyProblemSolved(alreadySolved)
        setCode(initialCode)
        setLoadingProblem(false)
      } catch (err) {
        console.error('Error fetching problem:', err)
        setErrorProblem('Failed to load problem. Please try again later.')
        setLoadingProblem(false)
      }
    }

    fetchProblem()
  }, [title, userId])

  const formatTime = () => {
    const seconds = `0${timer % 60}`.slice(-2)
    const minutes = `0${Math.floor(timer / 60) % 60}`.slice(-2)
    const hours = `0${Math.floor(timer / 3600)}`.slice(-2)
    return `${hours}:${minutes}:${seconds}`
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

    if (!problem?.testcases?.length) {
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
      console.error('Error running code:', err)
      setSubmissionError('Failed to run code.')
      setIsSubmitting(false)
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
      return
    }

    setIsRunning(false)
    setIsSubmitting(true)
    setSubmissionResults([])
    setSubmissionError(null)

    if (!problem?.testcases?.length) {
      setSubmissionError('No test cases found.')
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

      const allPassed = results.every((r) => r.passed)

      if (allPassed) {
        const submissionData = {
          userId,
          problemId: problem._id,
          code,
          language,
          results,
          timeTaken: timer,
        }

        await createSubmission(submissionData)

        const profileData = {
          qid: problem._id,
          progress: 'solved',
          solution: code,
          timeTaken: timer,
        }

        const updateRes = await updateUserSubmission(
          userId,
          profileData,
          dailyProblemSolved
        )
        setDailyProblemSolved(updateRes.dailyProblemSolved)
      } else {
        setSubmissionError('Your solution did not pass all test cases.')
      }

      setIsSubmitting(false)
      setActiveTab('results')
    } catch (err) {
      console.error('Submission error:', err)
      setSubmissionError('Failed to submit your solution.')
      setIsSubmitting(false)
      setActiveTab('results')
    }
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

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
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
            {['problem', 'results', 'submissions', 'friends solution'].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-4 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400'
                  }`}
                  disabled={tab === 'results' && isSubmitting}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {tab === 'results' && isSubmitting && (
                    <span className="ml-2 inline-block animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full" />
                  )}
                </button>
              )
            )}
          </div>

          <div className="bg-white dark:bg-zinc-800 p-4 rounded-md overflow-y-scroll flex-1">
            {activeTab === 'problem' && (
              <ProblemDescription
                problem={problem}
                loading={loadingProblem}
                error={errorProblem}
                formatDate={formatDate}
                getDifficultyColor={getDifficultyColor}
                isSolved={isProblemSolved}
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
            {activeTab === 'submissions' && problem && (
              <SubmissionsList problemId={problem._id} />
            )}
            {activeTab === 'friends solution' && (
              <FriendsSolutionTab
                friendsSolutions={friendsSolutions}
                loadingFriends={loadingFriends}
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
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md text-white"
            >
              <Play className="w-4 h-4" />
              Run
            </button>

            <div className="flex items-center gap-2">
              <div className="bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded-md flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="font-mono text-sm">{formatTime()}</span>
              </div>
              <button
                onClick={toggleTimer}
                className="p-1 rounded-md bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
              >
                {isRunning ? (
                  <Pause className="w-4 h-4 text-orange-500" />
                ) : (
                  <Play className="w-4 h-4 text-green-500" />
                )}
              </button>
            </div>
            <button
              onClick={() => setCode(boilerplateCode)}
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded-md text-black dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Reset
            </button>

            <button
              onClick={() => solvedCode && setCode(solvedCode)}
              disabled={!solvedCode || isSubmitting}
              className="flex items-center gap-2 bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded-md text-black dark:text-white  dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Retrieve
            </button>

            <button
              id="submit-btn"
              onClick={submitSolutionWithTestCases}
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white"
            >
              <CheckCircle className="w-4 h-4" />
              Submit
            </button>
          </div>

          <div className="flex-1 max-h-[79%] border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
            <div className="h-8 bg-gray-100 dark:bg-zinc-800 border-b px-3 flex items-center">
              <Code className="w-4 h-4 text-gray-500" />
              <span className="ml-2 text-xs">
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
                tabSize: 2,
              }}
            />
          </div>
        </div>
      </Split>
    </div>
  )
}
