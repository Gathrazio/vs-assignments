import Auth from './components/Auth'
import Profile from './components/Profile'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from './context/UserProvider.jsx'
import './index.css'

export default function App () {

  const { userInfo: {token}, logout } = useContext(UserContext);

  return (
    <div className="app-wrapper">
      <Routes>
        <Route
          path="/"
          element={ token ? <Navigate to="/profile" /> : <Auth />}
        />
        <Route
          path="/profile"
          element={<Profile token={token} logout={logout} />}
        />
      </Routes>
    </div>
  )
}
