import { Navigate } from 'react-router-dom'
import { useAuth } from '../src/context/AuthContext'
import Loader from './components/loader/Loader'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading)
    return (
      <div className="flex justify-center items-center">
        <Loader></Loader>
      </div>
    )
  if (!user) {
    return <Navigate to="/login" />
  }

  return children
}

export default PrivateRoute
