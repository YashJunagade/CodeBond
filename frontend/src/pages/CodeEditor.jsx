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
  Play as Resume,
} from 'lucide-react'
import '../styles/SplitStyles.css'

export default function CodeEditor() {
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

  // Format timer as HH:MM:SS
  const formatTime = () => {
    const getSeconds = `0${timer % 60}`.slice(-2)
    const minutes = Math.floor(timer / 60)
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

    return `${getHours}:${getMinutes}:${getSeconds}`
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
    timerBtn.classList.add('animate-pulse')
    setTimeout(() => timerBtn.classList.remove('animate-pulse'), 800)

    setIsRunning((prevState) => !prevState)
  }

  const runCode = () => {
    // Animation for the run button
    const runBtn = document.getElementById('run-btn')
    runBtn.classList.add('animate-pulse')
    setTimeout(() => runBtn.classList.remove('animate-pulse'), 800)

    console.log('Running code:', code)
  }

  const submitSolution = () => {
    // Animation for the submit button
    const submitBtn = document.getElementById('submit-btn')
    submitBtn.classList.add('animate-bounce')
    setTimeout(() => submitBtn.classList.remove('animate-bounce'), 800)

    console.log('Submitting solution:', code)
    setIsRunning(false)
  }

  const viewFriendSolutions = () => {
    // Animation for the friends button
    const friendsBtn = document.getElementById('friends-btn')
    friendsBtn.classList.add('animate-ping')
    setTimeout(() => friendsBtn.classList.remove('animate-ping'), 800)

    console.log('Viewing friend solutions')
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
                className="flex items-center gap-2 bg-primaryBtn indigo-500 hover:bg-[#db3f3f] px-3 py-1 rounded-full text-white text-sm transition-colors duration-200 shadow-md"
              >
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Friends Solutions</span>
              </button>
            </div>
            <div className="bg-white dark:bg-zinc-800 p-4 rounded-md shadow-inner overflow-y-auto flex-1">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Write a function that returns the sum of two numbers.
                <br />
                <br />
                <strong>Example:</strong>
                <br />
                Input: a = 5, b = 3<br />
                Output: 8
                <br />
                <br />
                <strong>Constraints:</strong>
                <br />
                • -1000 ≤ a, b ≤ 1000
                <br />
                <br />
                <strong>Follow-up:</strong> Can you implement the solution in a
                single line?
                <br />
                <br />
                <strong>Note:</strong> The function should handle negative
                numbers as well.
                <br />
                <br />
                <strong>Example 2:</strong>
                <br />
                Input: a = -3, b = 10
                <br />
                Output: 7
              </p>
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
                    <Resume className="w-4 h-4 text-green-500" />
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
