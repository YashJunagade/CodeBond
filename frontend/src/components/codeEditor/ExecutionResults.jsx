import React, { useState } from 'react'
import {
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  AlertTriangle,
  Terminal,
  Code,
  ArrowRight,
} from 'lucide-react'

const ExecutionResults = ({ submissionResults, problem, loading, error }) => {
  const [expandedTests, setExpandedTests] = useState({})

  const toggleTest = (index) => {
    setExpandedTests((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const decodeBase64 = (base64String) => {
    try {
      return atob(base64String)
    } catch (e) {
      console.error('Error decoding base64:', e)
      return '' // Return empty string on decoding error
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 p-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-blue-200 dark:border-blue-900 border-t-blue-500 dark:border-t-blue-400 animate-spin"></div>
          <Terminal className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-500 dark:text-blue-400 w-5 h-5" />
        </div>
        <p className="mt-4 text-blue-600 dark:text-blue-400 font-medium animate-pulse">
          Running tests...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4 my-4">
        <div className="flex items-center">
          <AlertTriangle className="text-red-500 w-6 h-6 mr-2" />
          <div className="text-red-600 dark:text-red-400 font-semibold">
            Error executing tests
          </div>
        </div>
        <div className="mt-2 text-red-500 dark:text-red-300">{error}</div>
      </div>
    )
  }

  if (!submissionResults || submissionResults.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 p-6 bg-gray-50 dark:bg-zinc-800/50 rounded-lg border border-gray-200 dark:border-zinc-700">
        <Code className="w-10 h-10 text-gray-400 dark:text-gray-500 mb-3" />
        <p className="text-gray-500 dark:text-gray-400 text-center">
          No execution results yet. Run or submit your code.
        </p>
      </div>
    )
  }

  const passedCount = submissionResults.filter((result) => result.passed).length
  const totalCount = submissionResults.length
  const allPassed = passedCount === totalCount

  return (
    <div className="space-y-4 p-4 overflow-y-auto max-h-[600px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg flex items-center">
          <Terminal className="mr-2 w-5 h-5" />
          Execution Results
        </h3>
        <div
          className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${
            allPassed
              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
              : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
          }`}
        >
          {allPassed ? (
            <CheckCircle className="w-4 h-4 mr-1" />
          ) : (
            <Clock className="w-4 h-4 mr-1" />
          )}
          {passedCount}/{totalCount} Tests Passed
        </div>
      </div>

      <div className="space-y-3">
        {submissionResults.map((result, index) => {
          const testCase = problem?.testcases?.[index]
          const hasError =
            result?.stderr || result?.compileOutput || result?.error
          const isExpanded = expandedTests[index] || false

          return (
            <div
              key={index}
              className={`bg-white dark:bg-zinc-800 rounded-lg shadow-sm overflow-hidden transition-all duration-200 border-l-4 ${
                result.passed
                  ? 'border-l-green-500 dark:border-l-green-400'
                  : 'border-l-red-500 dark:border-l-red-400'
              }`}
            >
              <div
                className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition-colors"
                onClick={() => toggleTest(index)}
              >
                <div className="flex items-center space-x-3">
                  {result.passed ? (
                    <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 dark:text-red-400" />
                  )}
                  <h4 className="font-medium">
                    Test Case #{index + 1}:{' '}
                    <span
                      className={
                        result.passed
                          ? 'text-green-500 dark:text-green-400'
                          : 'text-red-500 dark:text-red-400'
                      }
                    >
                      {result.passed ? 'Passed' : 'Failed'}
                    </span>
                  </h4>
                </div>
                <div className="flex items-center space-x-2">
                  {testCase?.input && (
                    <div className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                      Input:{' '}
                      {testCase.input.length > 10
                        ? `${testCase.input.substring(0, 10)}...`
                        : testCase.input}
                    </div>
                  )}
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>

              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-gray-100 dark:border-zinc-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {testCase?.input && (
                      <div className="bg-gray-50 dark:bg-zinc-900/50 p-3 rounded-md">
                        <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium mb-1">
                          <ArrowRight className="w-4 h-4 mr-1" />
                          Input:
                        </div>
                        <pre className="font-mono text-xs whitespace-pre-wrap text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-zinc-900 p-2 rounded border border-gray-200 dark:border-zinc-700">
                          {testCase.input}
                        </pre>
                      </div>
                    )}

                    {testCase?.output && (
                      <div className="bg-gray-50 dark:bg-zinc-900/50 p-3 rounded-md">
                        <div className="flex items-center text-green-600 dark:text-green-400 font-medium mb-1">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Expected Output:
                        </div>
                        <pre className="font-mono text-xs whitespace-pre-wrap text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-zinc-900 p-2 rounded border border-gray-200 dark:border-zinc-700">
                          {testCase.output}
                        </pre>
                      </div>
                    )}

                    <div
                      className={`bg-gray-50 dark:bg-zinc-900/50 p-3 rounded-md ${!testCase?.output ? 'md:col-span-2' : ''}`}
                    >
                      <div
                        className={`flex items-center font-medium mb-1 ${result.passed ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}
                      >
                        {result.passed ? (
                          <CheckCircle className="w-4 h-4 mr-1" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 mr-1" />
                        )}
                        Actual Output:
                      </div>
                      <pre
                        className={`font-mono text-xs whitespace-pre-wrap text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-zinc-900 p-2 rounded border ${
                          result.passed
                            ? 'border-green-200 dark:border-green-900'
                            : 'border-yellow-200 dark:border-yellow-900'
                        }`}
                      >
                        {result?.actualOutput
                          ? result.actualOutput
                          : '<No output>'}
                      </pre>
                    </div>
                  </div>

                  {hasError && (
                    <div className="mt-4 p-3 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 animate-pulse-gentle">
                      <h5 className="font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        {result?.stderr
                          ? 'Runtime Error'
                          : result?.compileOutput
                            ? 'Compilation Error'
                            : 'Execution Error'}
                      </h5>
                      {result?.stderr && (
                        <div>
                          <span className="font-medium text-red-500 dark:text-red-300">
                            Details:
                          </span>
                          <pre className="mt-1 font-mono text-xs whitespace-pre-wrap text-red-500 dark:text-red-300 bg-red-100 dark:bg-red-900/30 p-2 rounded border border-red-200 dark:border-red-800">
                            {result.stderr}
                          </pre>
                        </div>
                      )}
                      {result?.compileOutput && (
                        <div>
                          <span className="font-medium text-yellow-600 dark:text-yellow-400">
                            Details:
                          </span>
                          <pre className="mt-1 font-mono text-xs whitespace-pre-wrap text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded border border-yellow-200 dark:border-yellow-800">
                            {result.compileOutput}
                          </pre>
                        </div>
                      )}
                      {result?.error &&
                        !result?.stderr &&
                        !result?.compileOutput && (
                          <div>
                            <span className="font-medium text-red-500 dark:text-red-300">
                              Details:
                            </span>
                            <pre className="mt-1 font-mono text-xs whitespace-pre-wrap text-red-500 dark:text-red-300 bg-red-100 dark:bg-red-900/30 p-2 rounded border border-red-200 dark:border-red-800">
                              {result.error}
                            </pre>
                          </div>
                        )}
                    </div>
                  )}

                  {result?.message && !hasError && (
                    <div className="mt-4 p-3 rounded-md bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                      <h5 className="font-semibold text-blue-600 dark:text-blue-400 mb-1 flex items-center">
                        <Terminal className="w-4 h-4 mr-1" />
                        Message
                      </h5>
                      <pre className="mt-1 font-mono text-xs whitespace-pre-wrap text-blue-500 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 p-2 rounded border border-blue-200 dark:border-blue-800">
                        {result.message}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <style jsx global>{`
        @keyframes pulse-gentle {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.85;
          }
        }
        .animate-pulse-gentle {
          animation: pulse-gentle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  )
}

export default ExecutionResults
