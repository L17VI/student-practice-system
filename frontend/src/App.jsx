import React, { useState, useEffect } from 'react';
import { Header, Footer } from './components/Header';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Home from './pages/Home';
import PracticePage from './pages/PracticePage';
import AccountPage from './pages/AccountPage';
import userService from './services/userService';

const VacanciesPage = () => <Typography variant="h4" component="h1">Вакансии</Typography>;

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            if (isAuthenticated) {
                const user = await userService.getMe();
                if (user && user.role === 'admin') {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            } else {
                setIsAdmin(false);
            }
        };
        checkUser();
    }, [isAuthenticated]);

    const handleLogin = () => {
        setIsAuthenticated(true);
        navigate('/');
    };

    const handleLogout = () => {
        userService.logout();
        setIsAuthenticated(false);
        setIsAdmin(false);
        navigate('/login');
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            bgcolor: '#F6F6F6',
            fontFamily: "'Montserrat', sans-serif",
        }}>
            <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />

            <Container component="main" sx={{
                maxWidth: 'lg',
                flexGrow: 1,
                py: 4,
            }}>
                <Routes>
                    <Route path="/" element={<Home isAdmin={isAdmin} />} />
                    <Route path="/practice" element={<PracticePage />} />
                    <Route path="/account" element={<AccountPage onLogout={handleLogout} />} />
                    <Route path="/favorites" element={<AccountPage onLogout={handleLogout} />} />
                    <Route path="/applications" element={<AccountPage onLogout={handleLogout} />} />
                    <Route path="/vacancies" element={<VacanciesPage />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/register" element={<Registration />} />
                </Routes>
            </Container>

            <Footer />
        </Box>
    );
}

export default App;
