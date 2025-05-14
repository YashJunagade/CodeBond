// services/problemService.js
import axios from 'axios'

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/'
const API_URL = 'http://localhost:5000/api'

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
    return response.data
  } catch (error) {
    console.error(
      'Error fetching problems:',
      error.response?.data || error.message
    )
    throw error
  }
}

const fetchProblems = async () => {
  try {
    const problems = await getAllProblems()
    console.log('Fetched problems:', problems)
  } catch (error) {
    console.error('Error fetching problems:', error)
  }
}

fetchProblems()
