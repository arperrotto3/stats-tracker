import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from "./pages/Dashboard"
import Landing from './pages/Landing'
import LeagueDashboard from './pages/LeagueDashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Landing />} />
        <Route path="/league" element={<LeagueDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App