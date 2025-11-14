import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import PracticeList from '../components/PracticeList'

export default function Home({ onLogin }) {
  const [showLogin, setShowLogin] = useState(false)
  const [showPractices, setShowPractices] = useState(false)

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: 20 }}>
      <header style={{ textAlign: 'center', marginBottom: 20 }}>
        <h1>Платформа практик</h1>
        <p style={{ color: '#555' }}>Добро пожаловать — найдите подходящую практику и подайте заявку.</p>
      </header>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 20 }}>
        <button onClick={() => setShowLogin(s => !s)}>{showLogin ? 'Закрыть форму входа' : 'Войти'}</button>
        <button onClick={() => setShowPractices(s => !s)}>{showPractices ? 'Скрыть практики' : 'Просмотреть практики'}</button>
      </div>

      <div>
        {showLogin && (
          <div style={{ maxWidth: 480, margin: '0 auto 20px' }}>
            <h3>Вход</h3>
            <LoginForm onLogin={onLogin} />
          </div>
        )}

        {showPractices && (
          <section>
            <h3>Доступные практики</h3>
            <PracticeList />
          </section>
        )}
      </div>

      <footer style={{ marginTop: 40, textAlign: 'center', color: '#888' }}>
        <small>Тестовая версия — не для production</small>
      </footer>
    </div>
  )
}

