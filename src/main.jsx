import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import BlogOptimize from './pages/BlogOptimize'
import BlogGovern from './pages/BlogGovern'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/m365-licence-waste" element={<BlogOptimize />} />
        <Route path="/blog/azure-governance" element={<BlogGovern />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
