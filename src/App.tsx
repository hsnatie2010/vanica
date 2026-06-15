import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ChildrensBooking from './pages/ChildrensBooking'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<ChildrensBooking />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App