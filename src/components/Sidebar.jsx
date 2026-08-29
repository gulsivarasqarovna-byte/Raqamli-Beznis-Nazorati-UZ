import React from 'react'
import './Sidebar.css'

export default function Sidebar({ isOpen }) {
  const menuItems = [
    { id: 1, icon: '📈', label: 'Dashboard', href: '#' },
    { id: 2, icon: '👥', label: 'Xodimlar', href: '#' },
    { id: 3, icon: '📋', label: 'Loyihalar', href: '#' },
    { id: 4, icon: '💰', label: 'Moliya', href: '#' },
    { id: 5, icon: '📊', label: 'Hisobotlar', href: '#' },
    { id: 6, icon: '⚙️', label: 'Sozlamalar', href: '#' },
  ]

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <nav className="menu">
        {menuItems.map(item => (
          <a key={item.id} href={item.href} className="menu-item">
            <span className="icon">{item.icon}</span>
            <span className="label">{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  )
}
