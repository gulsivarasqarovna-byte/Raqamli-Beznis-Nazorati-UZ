import React from 'react'
import './Sidebar.css'

export default function Sidebar({ isOpen }) {
  const menuItems = [
    { id: 1, icon: '⌂', label: 'Bosh sahifa', href: '#', active: true },
    { id: 2, icon: '+', label: 'Kompaniya yaratish', href: '#' },
    { id: 3, icon: '▣', label: 'Kompaniyalarim', href: '#' },
    { id: 4, icon: '▤', label: 'Tariflar', href: '#' },
    { id: 5, icon: '▥', label: 'Monetizatsiya', href: '#' },
    { id: 6, icon: '♧', label: 'Bildirishnomalar', href: '#' },
    { id: 7, icon: '♙', label: 'Boshqa Kompaniyalar', href: '#' },
  ]

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-brand"><span className="brand-mark">▥</span><div><strong>Kompaniya</strong><small>Nazorat tizimi</small></div></div>
      <p className="sidebar-label">ASOSIY</p>
      <nav className="menu">
        {menuItems.slice(0, 2).map(item => <a key={item.id} href={item.href} className={`menu-item ${item.active ? 'active' : ''}`}><span className="icon">{item.icon}</span><span className="label">{item.label}</span></a>)}
        <p className="sidebar-label services">XIZMATLAR</p>
        {menuItems.slice(2).map(item => <a key={item.id} href={item.href} className="menu-item"><span className="icon">{item.icon}</span><span className="label">{item.label}</span></a>)}
      </nav>
      <button className="logout"><span>↪</span> Chiqish</button>
    </aside>
  )
}
