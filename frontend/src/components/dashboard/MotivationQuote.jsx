const MotivationQuote = ({ quote }) => {
  return (
    <div className="p-6 text-center mt-6 border-t dark:border-gray-600">
      <h3 className="text-md text-gray-600 dark:text-gray-400 italic mb-2">
        Need motivation? I have something for you
      </h3>
      <blockquote className="text-lg font-semibold text-black dark:text-white">
        “{quote.text}”
        <footer className="text-sm mt-2 text-gray-500">– {quote.author}</footer>
      </blockquote>
    </div>
  )
}

export default MotivationQuote
