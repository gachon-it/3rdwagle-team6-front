import { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login/Login'
import Main from './pages/Main/Main'
import Profile from './pages/Profile/Profile'
import Message from './pages/Message/Message'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="/Main" element={<Main />} />
      <Route path="/Message" element={<Message />} />
      <Route path="/Profile" element={<Profile />} />
    </Routes>
  )
}

export default App
