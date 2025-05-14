// services/problemService.js
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Create a new problem
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

// Get all problems
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

    // Return mock data in development environment
    if (import.meta.env.DEV) {
      console.log('Using mock problem data for development')
      return MOCK_PROBLEMS
    }

    throw error
  }
}

// Fetch a specific problem by its title (slugified version)
export const getProblemByTitle = async (slug) => {
  try {
    const response = await axios.get(`${API_URL}/problems/title/${slug}`)
    return response.data
  } catch (error) {
    console.error(
      'Error fetching problem by title:',
      error.response?.data || error.message
    )

    // Return mock data in development environment
    if (import.meta.env.DEV) {
      console.log('Using mock problem data for development')
      // Find a mock problem that matches the slug or return the first one
      const mockProblem =
        MOCK_PROBLEMS.find(
          (p) => p.title.toLowerCase().replace(/\s+/g, '-') === slug
        ) || MOCK_PROBLEMS[0]

      return mockProblem
    }

    throw error
  }
}
