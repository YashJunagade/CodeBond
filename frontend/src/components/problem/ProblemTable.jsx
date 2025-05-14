import { useState } from 'react'
import ProblemRow from './ProblemRow'

const ProblemTable = ({ title, problems, type }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="mb-8">
      <h2 className="text-lg font-medium mb-4 text-black dark:text-white">
        {title}
      </h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">
                  {type === 'daily' ? 'Day' : 'Week'}
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">
                  Date
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Problem Statement
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">
                  Completed or not
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {problems
                .slice(0, expanded ? problems.length : 4)
                .map((problem, index) => (
                  <ProblemRow
                    key={index}
                    day={type === 'daily' ? problem.day : null}
                    week={type === 'weekly' ? problem.week : null}
                    date={problem.date}
                    statement={problem.statement}
                    completed={problem.completed}
                    time={problem.time}
                  />
                ))}
            </tbody>
          </table>
        </div>

        {problems.length > 4 && (
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 text-center border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white focus:outline-none"
            >
              {expanded ? 'Show Less' : 'Load More...'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProblemTable
