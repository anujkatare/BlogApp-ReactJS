import {React, useState, useEffect, use} from 'react'
import { useDispatch } from 'react-redux'
import './index.css'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'

function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then(userData => {
      if (userData) {
        dispatch(login(userData))
      } else {
        dispatch(logout())
      }
    })
    .catch(() => {
      dispatch(logout())
    })
    .finally(()=>{
      setLoading(false)
    })
  }, [])
  
  if(loading){
    return <div className='bg-black w-screen h-screen flex flex-wrap content-between text-amber-50'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
      </div>
  }else{
    null
  }

}

export default App
