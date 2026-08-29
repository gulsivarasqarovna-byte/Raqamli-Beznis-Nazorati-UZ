import React from 'react'
import './Dashboard.css'
import StatCard from './StatCard'

export default function Dashboard() {
  const stats = [
    { icon: '👥', label: 'Jami Xodimlar', value: 45, color: '#3498db' },
    { icon: '📋', label: 'Faol Loyihalar', value: 12, color: '#e74c3c' },
    { icon: '✅', label: 'Tugallangan', value: 28, color: '#2ecc71' },
    { icon: '⏳', label: 'Davom Etayotgan', value: 8, color: '#f39c12' },
  ]

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Bosh Sahifa</h2>
        <p>Kompaniya nazorati tizimi</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="dashboard-sections">
        <div className="section">
          <h3>📈 So'ngi Faoliyat</h3>
          <div className="activity-list">
            <div className="activity-item">
              <span className="time">14:30</span>
              <span className="text">Yangi loyiha qo'shildi: "Web Loyiha"</span>
            </div>
            <div className="activity-item">
              <span className="time">13:15</span>
              <span className="text">Xodim "Sardor" qo'shildi</span>
            </div>
            <div className="activity-item">
              <span className="time">12:00</span>
              <span className="text">Hisobot tayyorlandi</span>
            </div>
            <div className="activity-item">
              <span className="time">10:45</span>
              <span className="text">Loyiha "Vebsayt" tugallandi</span>
            </div>
          </div>
        </div>

        <div className="section">
          <h3>⚡ Tez Amallar</h3>
          <div className="quick-actions">
            <button className="action-btn">➕ Xodim Qo'shish</button>
            <button className="action-btn">📋 Loyiha Qo'shish</button>
            <button className="action-btn">📊 Hisobot Ko'rish</button>
            <button className="action-btn">💾 Backup Qilish</button>
          </div>
        </div>
      </div>
    </div>
  )
}
