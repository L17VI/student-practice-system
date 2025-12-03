import React, { useEffect, useState } from 'react'
import api from '../services/api'

export default function ApplicationList() {
  const [applications, setApplications] = useState([])

  useEffect(() => {
    api.fetchApplications().then(setApplications).catch(console.error)
  }, [])

  return (
    <div>
      <h2>Мои заявки</h2>
      {applications.map(a => (
        <div key={a.id} style={{ borderBottom: '1px solid #eee', padding: 8 }}>
          <div>Практика: {a.practice}</div>
          <div>Статус: {a.status}</div>
          <div>{a.cover_letter}</div>
        </div>
      ))}
    </div>
  )
}

