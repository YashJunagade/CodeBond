import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Navbar from './components/navbar/Header'
import Problems from './pages/Problems'
import CodeEditor from './pages/CodeEditor'
import CustomProblem from './pages/CustomProblem'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <>
      <Toaster position="bottom-right" />
      <Router>
        <Navbar user={{ name: 'You', avatar: 'https://i.pravatar.cc/100' }} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/codeEditor/:title" element={<CodeEditor />} />
          <Route path="/customProblem" element={<CustomProblem />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
