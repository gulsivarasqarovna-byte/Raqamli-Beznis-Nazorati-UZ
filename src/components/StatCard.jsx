import React from 'react'
import './StatCard.css'

export default function StatCard({ icon, label, value, color }) {
  return (
    <div className="stat-card" style={{ borderColor: color }}>
      <div className="stat-icon" style={{ color }}>
        {icon}
      </div>
      <div className="stat-content">
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value}</p>
      </div>
    </div>
  )
}
