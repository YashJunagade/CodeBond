// src/components/CodeEditor/ProblemDescription.jsx

import React from 'react'
import {
  Lightbulb,
  Users,
  Tag,
  Calendar,
  BarChart2,
  AlarmClock,
} from 'lucide-react'

const ProblemDescription = ({
  problem,
  formatDate,
  getDifficultyColor,
  viewFriendSolutions,
  isSolved,
}) => {
  if (!problem) {
    return <div>No problem data available</div>
  }

  return (
    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
      {/* Problem Header */}
      <div className="border-b pb-4 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold flex items-center gap-2">
            {problem.title}
            {isSolved && (
              <span className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm font-semibold bg-green-100 dark:bg-green-800 px-2 py-0.5 rounded-md">
                ✅ Solved
              </span>
            )}
          </h1>
          <span className={`font-medium ${getDifficultyColor(problem.level)}`}>
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
                <span className="ml-1">Day {problem.dayOrWeekNo}</span>
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
  )
}

export default ProblemDescription
