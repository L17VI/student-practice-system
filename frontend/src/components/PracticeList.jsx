import React, { useEffect, useState } from 'react'
import api from '../services/api'
import PracticeCard from './PracticeCard'

export default function PracticeList() {
  const [practices, setPractices] = useState([])

  useEffect(() => {
    api.fetchPractices().then(setPractices).catch(console.error)
  }, [])

  return (
    <div>
      {practices.map(p => (
        <PracticeCard key={p.id} practice={p} />
      ))}
    </div>
  )
}

