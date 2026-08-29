import React from 'react'
import './Header.css'

export default function Header({ onToggleSidebar }) {
  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-btn" onClick={onToggleSidebar}>
          ☰
        </button>
        <h1 className="logo">📊 Kompaniya Nazorati</h1>
      </div>
      <div className="header-right">
        <div className="user-menu">
          <span>👤 Admin</span>
        </div>
      </div>
    </header>
  )
}
