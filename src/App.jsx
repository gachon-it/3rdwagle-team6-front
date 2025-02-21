import { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/Login/Login'
import Main from './pages/Main/Main'
import Profile from './pages/Profile/Profile'
import Message from './pages/Message/Message'
import Search from './pages/Search/Search'
import Signup from './pages/Signup'
import './App.css'


function App() {
  return (
    <Routes>
      <Route path="" element={<Navigate to="/Login" replace />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Main" element={<Main />} />
      <Route path="/Message" element={<Message />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path='/Search' element={<Search />} />
      <Route path="/signup" element={<Signup/>}/>
    </Routes>
  )
}

export default App
