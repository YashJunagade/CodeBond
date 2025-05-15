// frontend/src/services/userService.js
import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api/users' // Adjust as needed

/**
 * Retrieves a user's profile data.
 * @param {string} userId - The ID of the user to retrieve.
 * @returns {Promise<object>} - The user's profile data.
 */
export const getUserProfile = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${userId}`)
    return response.data // Return the user data from the response
  } catch (error) {
    console.error('Error fetching user profile:', error)
    throw error // Re-throw the error for the component to handle
  }
}

/**
 * Updates a user's submission data.
 * @param {string} userId - The ID of the user.
 * @param {object} submissionData - The submission data (qid, solution, timeTaken).
 * @param {boolean} dailyProblemSolved - Flag for daily problem status.
 * @returns {Promise<object>}
 */
export const updateUserSubmission = async (
  userId,
  submissionData,
  dailyProblemSolved
) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${userId}/submissions`, {
      ...submissionData,
      dailyProblemSolved,
    })

    return response.data
  } catch (error) {
    console.error('Error updating user submission:', error)
    throw error
  }
}

// Add other named exports here as needed
