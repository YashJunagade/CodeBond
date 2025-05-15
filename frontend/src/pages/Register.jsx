import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    profilePic: '',
  })
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        formData
      )
      setMessage(res.data.message)
      toast.success(res.data.message)
      navigate('/login')
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed')
      toast.error(err.response?.data?.message || 'Failed to register')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl space-y-4 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center dark:text-white">
          Register
        </h2>

        <input
          name="name"
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
          required
        />
        <input
          name="username"
          onChange={handleChange}
          placeholder="Username"
          className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
          required
        />
        <input
          name="profilePic"
          onChange={handleChange}
          placeholder="Profile Picture URL"
          className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
        >
          Register
        </button>
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="w-full bg-gray-200 hover:bg-gray-300 text-black dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white p-2 rounded"
        >
          Already registered? Login
        </button>

        {message && (
          <p className="text-center text-sm text-gray-700 dark:text-gray-300">
            {message}
          </p>
        )}
      </form>
    </div>
  )
}

export default Register
