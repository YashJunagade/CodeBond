import { useEffect, useState, useRef } from 'react'
import ProgressCard from './ProgressCard'
import { TrendingUp, Users, UserPlus, X } from 'lucide-react'
import friendService from '../../services/friendService'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const FriendsProgress = ({ userId, onFriendAdded }) => {
  const [friends, setFriends] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const [addFriendId, setAddFriendId] = useState('')
  const [isAddingFriend, setIsAddingFriend] = useState(false)
  const [addFriendError, setAddFriendError] = useState('')
  const [isAddFriendExpanded, setIsAddFriendExpanded] = useState(false)
  const addFriendInputRef = useRef(null)
  const navigate = useNavigate()

  const fetchFriends = async () => {
    try {
      const fetchedFriends = await friendService.getFriendsProgress(userId)
      setFriends(fetchedFriends)
    } catch (error) {
      console.error('Failed to fetch friends', error)
      setFriends([])
    }
  }

  useEffect(() => {
    setIsVisible(true)
    if (userId) {
      fetchFriends()
    }
  }, [userId]) // Remove fetchFriends from dependency array

  const handleAddFriend = async () => {
    setIsAddingFriend(true)
    setAddFriendError('')

    try {
      const data = await friendService.addFriend(userId, addFriendId)
      setAddFriendId('')
      setIsAddingFriend(false)
      setIsAddFriendExpanded(false)
      // Refetch friends data after successful addition
      fetchFriends()
      if (onFriendAdded) {
        onFriendAdded(data.updatedFriends)
      }
    } catch (error) {
      console.error('Error adding friend:', error)
      setAddFriendError(error.message || 'Failed to add friend')
      setIsAddingFriend(false)
    }
  }

  const toggleAddFriendExpanded = () => {
    setIsAddFriendExpanded(!isAddFriendExpanded)
    if (!isAddFriendExpanded && addFriendInputRef.current) {
      addFriendInputRef.current.focus()
    }
  }

  const addFriendButtonVariants = {
    initial: { width: 'auto', padding: '0.5rem', opacity: 1 },
    compact: {
      width: 'auto',
      padding: '0.5rem',
      opacity: 1,
      transition: { duration: 0.2 },
    },
    expanded: {
      width: 'auto',
      padding: '0.5rem 1rem',
      transition: { duration: 0.3 },
    },
    iconOnly: {
      width: 'auto',
      padding: '0.5rem',
      opacity: 1,
      transition: { duration: 0.2 },
    },
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg mr-3">
          <Users size={20} className="text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Friends Progress
        </h2>
        <div className="ml-auto flex items-center text-sm text-gray-600 dark:text-gray-400">
          <TrendingUp size={16} className="mr-1" />
          <span>Last updated: Today</span>
        </div>
      </div>

      {/* Add Friend Input and Button - Conditional Size */}
      <div className="flex justify-center mb-6 relative">
        <motion.button
          variants={addFriendButtonVariants}
          initial="initial"
          animate={
            friends.length === 0
              ? isAddFriendExpanded
                ? 'expanded'
                : 'iconOnly'
              : isAddFriendExpanded
                ? 'expanded'
                : 'compact'
          }
          className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 transition-all duration-300 overflow-hidden`}
          onClick={toggleAddFriendExpanded}
          disabled={isAddingFriend}
        >
          <AnimatePresence>
            {isAddFriendExpanded && (
              <motion.span
                key="addFriendText"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="mr-2"
              >
                {isAddingFriend ? 'Adding...' : 'Add Friend'}
              </motion.span>
            )}
          </AnimatePresence>
          <UserPlus size={16} />
        </motion.button>

        <AnimatePresence>
          {isAddFriendExpanded && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute ml-2 flex items-center bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700"
              style={{ zIndex: 10 }}
            >
              <input
                ref={addFriendInputRef}
                type="text"
                placeholder="Friend ID"
                className="px-4 py-2 text-sm border-0 focus:ring-indigo-500 focus:border-indigo-500 rounded-l-md dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                value={addFriendId}
                onChange={(e) => setAddFriendId(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddFriend()
                  }
                }}
              />
              <button
                onClick={handleAddFriend}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-r-md dark:bg-indigo-500 dark:hover:bg-indigo-400"
                disabled={isAddingFriend || !addFriendId}
              >
                {isAddingFriend ? 'Adding...' : 'Add'}
              </button>
              <button
                onClick={() => {
                  setIsAddFriendExpanded(false)
                  setAddFriendId('')
                  setAddFriendError('')
                }}
                className="px-2 py-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <X size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {addFriendError && (
        <p className="mb-4 text-center text-red-500">{addFriendError}</p>
      )}

      {/* Conditional rendering for "No friends" message and friend list */}
      {friends.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <Users size={40} className="mx-auto opacity-40 mb-2" />
          <p>No friends added yet</p>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-8">
          {friends.map((friend) => (
            <ProgressCard key={friend.id} friend={friend} />
          ))}
        </div>
      )}
    </div>
  )
}

export default FriendsProgress
