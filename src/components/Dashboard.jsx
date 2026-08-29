import React from 'react'
import './Dashboard.css'
import StatCard from './StatCard'

export default function Dashboard() {
  const stats = [
    { icon: '▪', label: 'Kompaniya yaratish', value: '0', detail: 'faol tizim', color: 'blue' },
    { icon: '▪', label: 'Faol xodimlar', value: '0', detail: 'Natija kutilmoqda', color: 'lime' },
    { icon: '▪', label: 'Joriy tarif', value: 'Tanlanmagan', detail: 'Tarif tanlanmagan', color: 'yellow' },
  ]

  return (
    <div className="dashboard">
      <div className="dashboard-header"><div><p className="eyebrow">BOSH SAHIFA</p><h2>Salom, Sardorbek Mirzayev</h2></div><div className="profile"><span>S</span><div><strong>Sardorbek Mirzayev</strong><small>Rahbar</small></div></div></div>

      <section className="hero-panel"><div className="hero-copy"><p className="eyebrow">KOMPANIYALARIM</p><h3>Kompaniyangizni<br /><em>qulay boshqaruv</em> bilan<br />nazorat qiling</h3><p>Jamoangizni kuzatish, xodimlar holatini ko'rish va kompaniya faoliyatini bir joydan boshqarish.</p><button className="create-btn">＋ Kompaniya yaratish</button></div><span className="status-pill">● Faol tizim</span><div className="monitor-card"><small>Monitoring</small><strong>0 kompaniya</strong></div><span className="employee-pill">0 ta xodim</span></section>

      <div className="stats-grid">{stats.map((stat, index) => <StatCard key={index} {...stat} />)}</div>

      <div className="dashboard-sections"></div>
    </div>
  )
}
