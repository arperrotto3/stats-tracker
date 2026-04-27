import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from "./pages/Dashboard"
import Landing from './pages/Landing'
import LeagueDashboard from './pages/LeagueDashboard'
import Verify from './pages/Verify'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Landing />} />
        <Route path="/league" element={<LeagueDashboard />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App