import React, { useState, useEffect } from 'react';
import { Header, Footer } from './components/Header';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Box, Container, Typography, CircularProgress } from '@mui/material';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Home from './pages/Home';
import PracticePage from './pages/PracticePage';
import AccountPage from './pages/AccountPage';
import ApplicationsPage from './pages/ApplicationsPage';
import ApplicationFormPage from './pages/ApplicationFormPage';
import CompanyPage from './pages/CompanyPage';
import ROPApplicationsPage from './pages/ROPApplicationsPage';
import ROPApplicationDetailsPage from './pages/ROPApplicationDetailsPage';
import userService from './services/userService';

const VacanciesPage = () => <Typography variant="h4" component="h1">Вакансии</Typography>;
const StudentsPage = () => <Typography variant="h4" component="h1">Список студентов (В разработке)</Typography>;

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [isAdmin, setIsAdmin] = useState(false);
    const [userRole, setUserRole] = useState(null); // 'student', 'rop', 'admin'
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const user = await userService.getMe();
                if (user) {
                    setIsAuthenticated(true);
                    setUserRole(user.role);
                    if (user.role === 'admin') {
                        setIsAdmin(true);
                    } else {
                        setIsAdmin(false);
                    }
                } else {
                    // Token invalid or expired
                    setIsAuthenticated(false);
                    setIsAdmin(false);
                    setUserRole(null);
                    localStorage.removeItem('token');
                }
            } else {
                setIsAuthenticated(false);
                setIsAdmin(false);
                setUserRole(null);
            }
            setIsLoading(false);
        };
        checkUser();
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
        // Re-check user to get role
        userService.getMe().then(user => {
            if (user) {
                setUserRole(user.role);
                if (user.role === 'admin') setIsAdmin(true);
                
                // Redirect based on role
                if (user.role === 'rop' || user.role === 'admin') {
                    navigate('/rop/applications');
                } else {
                    navigate('/');
                }
            }
        });
    };

    const handleLogout = () => {
        userService.logout();
        setIsAuthenticated(false);
        setIsAdmin(false);
        setUserRole(null);
        navigate('/login');
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#F6F6F6' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            bgcolor: '#F6F6F6',
            fontFamily: "'Montserrat', sans-serif",
        }}>
            <Header isAuthenticated={isAuthenticated} role={userRole} onLogout={handleLogout} />

            <Container 
                component="main" 
                disableGutters // Убираем стандартные отступы MUI
                sx={{
                    maxWidth: '1200px', // Фиксированная ширина для десктопа
                    flexGrow: 1,
                    py: 4,
                    // px: { xs: 2, md: 0 } // Горизонтальные отступы будут на страницах
                }}
            >
                <Routes>
                    {/* Public & Student Routes */}
                    <Route path="/" element={<Home isAdmin={isAdmin} />} />
                    <Route path="/practice/:id" element={<PracticePage />} />
                    <Route path="/practice/:id/apply" element={isAuthenticated ? <ApplicationFormPage /> : <Login onLogin={handleLogin} />} />
                    <Route path="/company/:name" element={<CompanyPage />} />
                    
                    {/* Protected Routes */}
                    <Route path="/account" element={isAuthenticated ? <AccountPage onLogout={handleLogout} /> : <Login onLogin={handleLogin} />} />
                    <Route path="/favorites" element={isAuthenticated ? <AccountPage onLogout={handleLogout} /> : <Login onLogin={handleLogin} />} />
                    <Route path="/applications" element={isAuthenticated ? <ApplicationsPage /> : <Login onLogin={handleLogin} />} />
                    
                    {/* ROP / Admin Routes */}
                    <Route path="/rop/applications" element={isAuthenticated && (userRole === 'rop' || userRole === 'admin') ? <ROPApplicationsPage /> : <Login onLogin={handleLogin} />} />
                    <Route path="/rop/applications/:id" element={isAuthenticated && (userRole === 'rop' || userRole === 'admin') ? <ROPApplicationDetailsPage /> : <Login onLogin={handleLogin} />} />
                    <Route path="/rop/students" element={isAuthenticated && (userRole === 'rop' || userRole === 'admin') ? <StudentsPage /> : <Login onLogin={handleLogin} />} />

                    <Route path="/vacancies" element={<VacanciesPage />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/register" element={<Registration />} />
                </Routes>
            </Container>

            <Footer role={userRole} />
        </Box>
    );
}

export default App;
