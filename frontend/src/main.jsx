import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { CssBaseline } from '@mui/material'

const root = document.getElementById('root')

ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <CssBaseline />
        <App />
    </BrowserRouter>
)
