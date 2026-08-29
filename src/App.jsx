import React, { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="app-container">
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="main-layout">
        <Sidebar isOpen={sidebarOpen} />
        <main className="main-content">
          <Dashboard />
        </main>
      </div>
    </div>
  )
}

export default App
