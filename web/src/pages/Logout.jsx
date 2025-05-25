import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../provider/AuthProvider'

function Logout() {
    const { logout, user } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate("/")
    }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#001F3F] to-[#007BFF]">
      <div className="bg-white rounded-xl shadow-lg p-10 text-center max-w-md w-full">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">Ready to leave {user.username} ?</h2>
        <p className="mb-6 text-gray-600">Click below to logout of your account.</p>
        <button
          onClick={()=>handleLogout()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Logout