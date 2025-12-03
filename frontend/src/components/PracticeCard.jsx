import React from 'react'
import ApplicationForm from './ApplicationForm'

export default function PracticeCard({ practice }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: 10, margin: 10 }}>
      <h3>{practice.title}</h3>
      <div>{practice.company} — {practice.location}</div>
      <p>{practice.description}</p>
      <ApplicationForm practiceId={practice.id} />
    </div>
  )
}

