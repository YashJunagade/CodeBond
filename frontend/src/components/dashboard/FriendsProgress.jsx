import ProgressCard from './ProgressCard'

const FriendsProgress = ({ friends }) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
        Your Friends Progress :- 
      </h2>
      <div className="flex justify-center gap-10 w-full px-4">
        {friends.map((friend) => (
          <ProgressCard key={friend.name} friend={friend} />
        ))}
      </div>
    </div>
  )
}

export default FriendsProgress
