import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [username, setUsername] = useState('')
  const [message, setMessage] = useState('')
  const { setUser } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { username }
      )
      setUser(res.data.user)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      console.log(res.data.user)
      setMessage('Login successful')
      navigate('/')
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl space-y-4 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center dark:text-white">
          Login
        </h2>
        <input
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded"
        >
          Login
        </button>

        {/* Button to go to register page */}
        <button
          type="button"
          onClick={() => navigate('/register')}
          className="w-full bg-gray-200 hover:bg-gray-300 text-black dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white p-2 rounded"
        >
          Not registered? Sign up
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

export default Login
