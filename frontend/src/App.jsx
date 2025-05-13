import Dashboard from './pages/Dashboard'
import Navbar from './components/navbar/Header'

const App = () => {
  return (
    <div>
      <Navbar user={{ name: 'You', avatar: 'https://i.pravatar.cc/100' }} />
      <Dashboard />
    </div>
  )
}

export default App
