import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Navbar from './components/navbar/Header'
import Problems from './pages/Problems'
import CodeEditor from './pages/CodeEditor'
import CustomProblem from './pages/CustomProblem'
import { Toaster } from 'react-hot-toast'
import Register from './pages/Register'
import Login from './pages/Login'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './PrivateRoute'

const AppContent = () => {
  const location = useLocation()

  const hideNavbar =
    location.pathname === '/login' || location.pathname === '/register'

  return (
    <>
      {!hideNavbar && (
        <Navbar user={{ name: 'You', avatar: 'https://i.pravatar.cc/100' }} />
      )}
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/problems"
          element={
            <PrivateRoute>
              <Problems />
            </PrivateRoute>
          }
        />
        <Route
          path="/codeEditor/:title"
          element={
            <PrivateRoute>
              <CodeEditor />
            </PrivateRoute>
          }
        />
        <Route
          path="/customProblem"
          element={
            <PrivateRoute>
              <CustomProblem />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  )
}

const App = () => {
  return (
    <>
      <Toaster position="bottom-right" />
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
