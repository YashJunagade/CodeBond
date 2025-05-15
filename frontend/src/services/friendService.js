const API_BASE_URL = 'http://localhost:5000/api' // Define your base URL

const friendService = {
  addFriend: async (userId, friendId) => {
    const response = await fetch(`${API_BASE_URL}/friends/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, friendId }),
    })
    if (!response.ok) {
      const errorData = await response.json() // Attempt to get error message from server
      throw new Error(errorData.message || 'Failed to add friend') // Use the server message or a default
    }

    return response.json()
  },

  getFriendsProgress: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/friends/progress/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to fetch friends progress')
    }
    return response.json()
  },
}

export default friendService
