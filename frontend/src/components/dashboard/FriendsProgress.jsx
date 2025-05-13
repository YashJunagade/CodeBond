import ProgressCard from './ProgressCard'

const FriendsProgress = ({ friends }) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Your Friends Progress
      </h2>
      <div className="flex gap-4 overflow-x-auto">
        {friends.map((friend) => (
          <ProgressCard key={friend.name} friend={friend} />
        ))}
      </div>
    </div>
  )
}

export default FriendsProgress
