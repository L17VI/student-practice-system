import React, { useState } from 'react'
import api from '../services/api'

export default function ApplicationForm({ practiceId }) {
  const [cover, setCover] = useState('')
  const [sent, setSent] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await api.createApplication({ practice: practiceId, cover_letter: cover })
      setSent(true)
    } catch (err) {
      console.error(err)
    }
  }

  if (sent) return <div>Заявка отправлена</div>

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={cover} onChange={e => setCover(e.target.value)} placeholder="Сопроводительное письмо" />
      <button type="submit">Отправить заявку</button>
    </form>
  )
}

