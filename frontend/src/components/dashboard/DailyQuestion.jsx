const DailyQuestion = ({ question }) => {
  return (
    <div className="p-4 mt-4 border-t dark:border-gray-600">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
        Daily Question
      </h2>
      <div className="mt-2 grid grid-cols-4 text-sm text-gray-700 dark:text-gray-300">
        <span>Day - {question.day}</span>
        <span>{question.date}</span>
        <span>{question.title}</span>
        <span className="text-right">Time taken: {question.timeTaken}</span>
      </div>
      <div className="text-green-600 text-sm">✅ Done / ❌ Not Done</div>
    </div>
  )
}

export default DailyQuestion
