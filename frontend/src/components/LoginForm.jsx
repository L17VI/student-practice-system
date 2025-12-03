import React, { useState } from 'react'
import api from '../services/api'

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const user = await api.login({ username, password })
      onLogin(user)
    } catch (err) {
      setError('Ошибка входа')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Логин</label>
        <input value={username} onChange={e => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Пароль</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit">Войти</button>
    </form>
  )
}

