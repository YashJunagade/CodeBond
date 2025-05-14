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
  Tag,
  Calendar,
  BarChart2,
  AlarmClock,
} from 'lucide-react'
import '../styles/SplitStyles.css'
import { useParams } from 'react-router-dom'
import { getProblemByTitle } from '../services/problemService'

export default function CodeEditor() {
  const { title } = useParams() // Get the slugified title from URL params
  const [problem, setProblem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { theme } = useTheme()
  const [code, setCode] = useState('// Your code here')
  const [timer, setTimer] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  // Handle timer
  useEffect(() => {
    let interval = null
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime + 1)
      }, 1000)
    } else if (!isRunning) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  // Fetch problem data
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        setLoading(true)
        const problemData = await getProblemByTitle(title || 'two-sum')
        setProblem(problemData)
        console.log(problemData)

        // Use C++ boilerplate if available
        const cppBoilerplate =
          problemData?.boilerplate ||
          `#include <iostream>
using namespace std;

int main() {
  // Your code here
  return 0;
}`
        setCode(cppBoilerplate)

        setLoading(false)
      } catch (err) {
        console.error('Error fetching problem:', err)
        setError('Failed to load problem. Please try again later.')
        setLoading(false)
      }
    }

    fetchProblem()
  }, [title])

  // Format timer as HH:MM:SS
  const formatTime = () => {
    const getSeconds = `0${timer % 60}`.slice(-2)
    const minutes = Math.floor(timer / 60)
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

    return `${getHours}:${getMinutes}:${getSeconds}`
  }

  // Format date to readable format
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

  const toggleTimer = () => {
    // Animation for the timer button
    const timerBtn = document.getElementById('timer-btn')
    if (timerBtn) {
      timerBtn.classList.add('animate-pulse')
      setTimeout(() => timerBtn.classList.remove('animate-pulse'), 800)
    }

    setIsRunning((prevState) => !prevState)
  }

  const runCode = () => {
    // Animation for the run button
    const runBtn = document.getElementById('run-btn')
    if (runBtn) {
      runBtn.classList.add('animate-pulse')
      setTimeout(() => runBtn.classList.remove('animate-pulse'), 800)
    }

    console.log('Running code:', code)
    // Here you would typically send the code to a backend for execution
    alert('Code execution functionality would be implemented here!')
  }

  const submitSolution = () => {
    // Animation for the submit button
    const submitBtn = document.getElementById('submit-btn')
    if (submitBtn) {
      submitBtn.classList.add('animate-bounce')
      setTimeout(() => submitBtn.classList.remove('animate-bounce'), 800)
    }

    console.log('Submitting solution:', code)
    setIsRunning(false)

    // Here you would typically send the code to a backend for validation
    alert('Solution submission functionality would be implemented here!')
  }

  const viewFriendSolutions = () => {
    // Animation for the friends button
    const friendsBtn = document.getElementById('friends-btn')
    if (friendsBtn) {
      friendsBtn.classList.add('animate-ping')
      setTimeout(() => friendsBtn.classList.remove('animate-ping'), 800)
    }

    console.log('Viewing friend solutions')

    // Here you would typically load and display friend solutions
    alert('Friend solutions functionality would be implemented here!')
  }

  // Determine difficulty color
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
    <div className="h-screen w-full flex flex-col bg-white dark:bg-zinc-900 text-black dark:text-white transition-colors duration-300 overflow-hidden">
      {/* Main Content - Takes full height of screen */}
      <Split
        className="flex flex-1 flex-col"
        direction="vertical"
        sizes={[6, 94]}
        minSize={40}
        gutterSize={0}
      >
        {/* Content Area with Problem & Editor */}
        <Split
          className="flex flex-1 split h-full"
          minSize={200}
          gutterSize={8}
          gutterAlign="center"
          snapOffset={0}
        >
          {/* Problem Statement Panel - with its own scroll */}
          <div className="flex flex-col bg-gray-100 dark:bg-zinc-900 p-4 rounded-md shadow-md h-full overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                <h2 className="font-bold text-lg">Problem Statement</h2>
              </div>
              <button
                id="friends-btn"
                onClick={viewFriendSolutions}
                className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 px-3 py-1 rounded-full text-white text-sm transition-colors duration-200 shadow-md"
              >
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Friends Solutions</span>
              </button>
            </div>

            {/* Problem Content */}
            <div className="bg-white dark:bg-zinc-800 p-4 rounded-md shadow-inner overflow-y-auto flex-1">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : error ? (
                <div className="text-red-500 text-center p-4">{error}</div>
              ) : problem ? (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {/* Problem Header */}
                  <div className="border-b pb-4 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <h1 className="text-xl font-bold">{problem.title}</h1>
                      <span
                        className={`font-medium ${getDifficultyColor(problem.level)}`}
                      >
                        {problem.level}
                      </span>
                    </div>

                    {/* Problem ID */}
                    {problem.qid && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Problem ID: {problem.qid}
                      </div>
                    )}

                    {/* Problem Metadata */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {problem.category && (
                        <div className="flex items-center gap-1 text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
                          <BarChart2 className="w-3 h-3" />
                          <span>{problem.category}</span>
                          {problem.dayOrWeekNo && (
                            <span className="ml-1">
                              Day {problem.dayOrWeekNo}
                            </span>
                          )}
                        </div>
                      )}

                      {problem.timeLimit > 0 && (
                        <div className="flex items-center gap-1 text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
                          <AlarmClock className="w-3 h-3" />
                          <span>{problem.timeLimit}s</span>
                        </div>
                      )}

                      {problem.date && (
                        <div className="flex items-center gap-1 text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(problem.date)}</span>
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    {problem.tags && problem.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {problem.tags.map((tag, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full"
                          >
                            <Tag className="w-3 h-3" />
                            <span>{tag}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Problem Description */}
                  <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
                    <div className="whitespace-pre-line font-medium">
                      {problem.description}
                    </div>

                    {/* Examples */}
                    {problem.example && (
                      <div className="mt-4">
                        <h3 className="font-bold mb-2">Example:</h3>
                        <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded-md font-mono text-xs whitespace-pre-line">
                          {problem.example}
                        </div>
                      </div>
                    )}

                    {/* Test Cases */}
                    {problem.testcases && problem.testcases.length > 0 && (
                      <div className="mt-4">
                        <h3 className="font-bold mb-2">Test Cases:</h3>
                        <div className="space-y-2">
                          {problem.testcases.map((testcase, index) => (
                            <div
                              key={index}
                              className="bg-gray-100 dark:bg-gray-900 p-3 rounded-md"
                            >
                              <div className="font-mono text-xs">
                                <span className="text-blue-600 dark:text-blue-400">
                                  Input:
                                </span>{' '}
                                {testcase.input}
                              </div>
                              <div className="font-mono text-xs mt-1">
                                <span className="text-green-600 dark:text-green-400">
                                  Output:
                                </span>{' '}
                                {testcase.output}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center p-4">No problem data available</div>
              )}
            </div>
          </div>

          {/* Code Editor Panel - with its own scroll */}
          <div className="flex flex-col p-1 gap-2 h-full overflow-hidden">
            {/* Code Controls */}
            <div className="flex items-center justify-between gap-4 mb-2 px-2">
              <button
                id="run-btn"
                onClick={runCode}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md text-white font-medium transition-all duration-200 shadow-md hover:shadow-lg"
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
                  className="flex items-center justify-center bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 p-1 rounded-md transition-colors duration-200"
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
                onClick={submitSolution}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Submit</span>
              </button>
            </div>

            {/* Editor - takes remaining height */}
            <div className="flex-1 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden shadow-lg">
              <div className="h-8 flex-shrink-0 bg-gray-100 dark:bg-zinc-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-3">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                    main.cpp
                  </span>
                </div>
              </div>
              <div className="h-[calc(100%-2rem)]">
                <Editor
                  height="100%"
                  defaultLanguage="cpp"
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
                    // Customize editor themes
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
          </div>
        </Split>
      </Split>
    </div>
  )
}
