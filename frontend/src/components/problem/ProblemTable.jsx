import { useState } from 'react'
import { CheckCircle, XCircle } from 'lucide-react'

const ProblemTable = ({ title, problems, type }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
        {title}
      </h2>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gradient-to-r from-indigo-100 to-indigo-200 dark:from-gray-800 dark:to-gray-900">
              <tr>
                <th className="py-3 px-4 text-xs font-bold text-gray-700 dark:text-gray-300 text-center rounded-tl-lg uppercase">
                  {type === 'daily' ? 'Day' : 'Week'}
                </th>
                <th className="py-3 px-4 text-xs font-bold text-gray-700 dark:text-gray-300 text-center uppercase">
                  Date
                </th>
                <th className="py-3 px-4 text-xs font-bold text-gray-700 dark:text-gray-300 text-center uppercase">
                  Problem Statement
                </th>
                <th className="py-3 px-4 text-xs font-bold text-gray-700 dark:text-gray-300 text-center uppercase">
                  Status
                </th>
                <th className="py-3 px-4 text-xs font-bold text-gray-700 dark:text-gray-300 text-center rounded-tr-lg uppercase">
                  Time
                </th>
              </tr>
            </thead>
            <tbody>
              {problems.slice(0, expanded ? problems.length : 4).map((problem, index) => (
                <tr
                  key={index}
                  className={`transition-colors duration-200 ${
                    index % 2 === 0
                      ? 'bg-white dark:bg-gray-800'
                      : 'bg-gray-50 dark:bg-gray-900'
                  } hover:bg-indigo-50 dark:hover:bg-gray-700`}
                >
                  <td className="py-3 px-4 text-center text-sm font-medium text-gray-800 dark:text-gray-200">
                    {type === 'daily' ? problem.day : problem.week}
                  </td>
                  <td className="py-3 px-4 text-center text-sm text-gray-700 dark:text-gray-300">
                    {problem.date}
                  </td>
                  <td className="py-3 px-4 text-center text-gray-700 dark:text-gray-300">
                    {problem.statement}
                  </td>
                  <td className="py-3 px-4 text-center text-sm">
                    {problem.completed ? (
                      <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 text-xs font-medium rounded-full">
                        <CheckCircle className="w-4 h-4 mr-1" /> Done
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 text-xs font-medium rounded-full">
                        <XCircle className="w-4 h-4 mr-1" /> Pending
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center text-sm text-gray-700 dark:text-gray-300">
                    {problem.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {problems.length > 4 && (
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 text-center border-t border-gray-200 dark:border-gray-700">
            <button
  onClick={() => setExpanded(!expanded)}
  className="text-sm font-semibold text-indigo-600 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-indigo-400 focus:outline-none transition duration-300"
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
