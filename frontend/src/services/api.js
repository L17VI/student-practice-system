import axios from 'axios'

const client = axios.create({ baseURL: '/api' })

// Простая mock-логика для локальной разработки: хранит user в localStorage
function saveUser(user) {
  localStorage.setItem('currentUser', JSON.stringify(user))
}
function loadUser() {
  const raw = localStorage.getItem('currentUser')
  return raw ? JSON.parse(raw) : null
}

export default {
  // Mock login: accepts username and optional role override
  async login({ username, password, role }) {
    // In real app replace with POST /auth/token or similar
    const userRole = role || (username === 'admin' ? 'admin' : username === 'student' ? 'student' : 'supervisor')
    const user = { id: 1, username, role: userRole }
    saveUser(user)
    return user
  },

  logout() {
    localStorage.removeItem('currentUser')
  },

  getCurrentUser() {
    return loadUser()
  },

  // Practices
  async fetchPractices() {
    try {
      const res = await client.get('/practices/')
      return res.data
    } catch (err) {
      console.warn('fetchPractices failed, returning empty list', err)
      return []
    }
  },

  // Applications
  async createApplication(payload) {
    try {
      const res = await client.post('/applications/', payload)
      return res.data
    } catch (err) {
      console.error('createApplication error', err)
      throw err
    }
  },

  async fetchApplications() {
    try {
      const res = await client.get('/applications/')
      return res.data
    } catch (err) {
      console.warn('fetchApplications failed, returning empty list', err)
      return []
    }
  }
}

