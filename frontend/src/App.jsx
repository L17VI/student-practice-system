import React, { useState, useEffect } from 'react';
import { Header, Footer } from './components/Header';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Home from './pages/Home';
import PracticePage from './pages/PracticePage';
import AccountPage from './pages/AccountPage';
import PartnersCarousel from './components/PartnersCarousel';
import userService from './services/userService';

const VacanciesPage = () => <Typography variant="h4" component="h1">Вакансии</Typography>;

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const navigate = useNavigate();

    const handleLogin = () => {
        setIsAuthenticated(true);
        navigate('/account');
    };

    const handleLogout = () => {
        userService.logout();
        setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            bgcolor: 'background.paper',
        }}>
            <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />

            <Container component="main" sx={{
                maxWidth: 'lg',
                flexGrow: 1,
                py: 4,
            }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/practice" element={<PracticePage />} />
                    <Route path="/account" element={<AccountPage />} />
                    <Route path="/vacancies" element={<VacanciesPage />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/register" element={<Registration />} />
                </Routes>
            </Container>

            <Box sx={{ width: '100%', my: 4 }}>
                <PartnersCarousel />
            </Box>

            <Footer />
        </Box>
    );
}

export default App;
