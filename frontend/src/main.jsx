import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext.jsx'
import { UserProgressProvider } from './context/UserProgressContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <UserProgressProvider>
          <App />
        </UserProgressProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
)
