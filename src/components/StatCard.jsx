import React from 'react'
import './StatCard.css'

export default function StatCard({ icon, label, value, detail, color }) {
  return (
    <div className={`stat-card ${color}`}>
      <p className="stat-label"><span className="stat-icon">{icon}</span>{label}</p>
      <p className="stat-value">{value}</p>
      <p className="stat-detail">{detail}</p>
    </div>
  )
}
