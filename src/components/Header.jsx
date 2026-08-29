import React from 'react'
import './Header.css'

export default function Header({ onToggleSidebar }) {
  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-btn" onClick={onToggleSidebar} aria-label="Menyuni ochish">
          ☰
        </button>
        <h1 className="logo"><span className="logo-mark">▥</span> Kompaniya Nazorati</h1>
      </div>
      <div className="header-right">
        <button className="language-btn">UZ <span>⌄</span></button>
        <div className="clock">◷ <strong>13:57:23</strong></div>
        <button className="user-menu"><span className="online-dot"></span> Rangni o'zgartirish</button>
        <button className="mode-btn">▣ <span>Fon</span></button>
      </div>
    </header>
  )
}
