const ProblemRow = ({ day, week, date, statement, completed, time }) => {
  return (
    <tr className="border-b border-gray-200 dark:border-gray-700">
      <td className="py-3 px-4 text-center">{day || week}</td>
      <td className="py-3 px-4 text-center">{date}</td>
      <td className="py-3 px-4">{statement}</td>
      <td className="py-3 px-4 text-center">
        {completed ? (
          <span className="inline-flex items-center text-green-600">
            <svg
              className="w-5 h-5 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Done
          </span>
        ) : (
          <span className="inline-flex items-center text-red-600">
            <svg
              className="w-5 h-5 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            Not Done
          </span>
        )}
      </td>
      <td className="py-3 px-4 text-center">{time}</td>
    </tr>
  )
}

export default ProblemRow
