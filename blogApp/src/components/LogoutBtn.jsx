import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { logout } from '../store/authSlice'

const LogoutBtn = () => {
    const dispatch = useDispatch()
    const logoutHandler = async () => {
        try {
            await authService.logOut()
            dispatch(logout())
        } catch (error) {
            console.log("LogoutBtn :: logoutHandler :: error", error)
        }

  return (
    <btn
    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    onClick={logoutHandler}
    >Logout</btn>
  )
}
}

export default LogoutBtn