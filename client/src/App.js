import React from 'react'
import NavBar from './components/navbar/NavBar'
import { Routes,Route } from 'react-router-dom'
import './index.css'
import AdminSignup from './components/auth/admin/AdminSignup'
import AdminLogin from './components/auth/admin/AdminLogin'
import Home from './components/pages/Home'
import AddMovie from './components/pages/AddMovie'
import AllMovies from './components/pages/AllMovies'
import View from './components/pages/View'
import Update from './components/pages/Update'
import UserSignup from './components/auth/user/UserSignup'
import UserLogin from './components/auth/user/UserLogin'
import AllMoviesUser from './components/pages/AllMoviesUser'
import MyBooking from './components/pages/MyBooking'
import Ticket from './components/pages/Ticket'

const App = () => {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/adminSignup'  element={<AdminSignup/>} />
        <Route path='/adminLogin'  element={<AdminLogin/>} />
        <Route path='/userSignup'  element={<UserSignup/>} />
        <Route path='/userLogin'  element={<UserLogin/>} />
        <Route path='/addMovie'  element={<AddMovie/>} />
        <Route path='/allMovies'  element={<AllMovies/>} />
        <Route path='/allMoviesUser'  element={<AllMoviesUser/>} />
        <Route path='/ticket/:bookingId' element={<Ticket/>} />
        <Route path='/myBooking' element={<MyBooking/>} />
        <Route path='/:movieId/update'  element={<Update/>} />
        <Route  path="/:movieId"  element={<View/>} />
      </Routes>
    </div>
  )
}

export default App
