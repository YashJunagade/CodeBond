import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api'

export const createSubmission = async (submissionData) => {
  const res = await axios.post(`${API_BASE_URL}/submissions`, submissionData)
  return res.data
}
