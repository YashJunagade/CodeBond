// services/problemService.js
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const createProblem = async (problemData) => {
  try {
    const response = await axios.post(`${API_URL}/problems/`, problemData)
    return response.data
  } catch (error) {
    console.error(
      'Error creating problem:',
      error.response?.data || error.message
    )
    throw error
  }
}

export const getAllProblems = async () => {
  try {
    const response = await axios.get(`${API_URL}/problems`)
    // Ensure we return the actual array of problems
    return Array.isArray(response.data) ? response.data : response.data.problems
  } catch (error) {
    console.error(
      'Error fetching problems:',
      error.response?.data || error.message
    )
    throw error
  }
}
