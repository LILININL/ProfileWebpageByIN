import { useLocation } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes.jsx'
import './App.css'

function App() {
  const location = useLocation()

  return (
    <div className="app-root">
      <div className="route-container" key={location.pathname}>
        <AppRoutes />
      </div>
    </div>
  )
}

export default App
