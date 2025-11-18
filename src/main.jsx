import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Test from './Test'
import New from './pages/New'
import Post from './pages/Post'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/test" element={<Test />} />
        <Route path="/new" element={<New />} />
        <Route path="/p/:id" element={<Post />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)