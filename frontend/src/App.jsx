import React, { useState } from 'react';
import { Header, Footer } from './components/Header';
import { Routes, Route } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import Registration from './pages/Registration';
import Login from './pages/Login';

const HomePage = () => <Typography variant="h4" component="h1">Главная страница</Typography>;
const VacanciesPage = () => <Typography variant="h4" component="h1">Вакансии</Typography>;

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Mock authentication state

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header isAuthenticated={isAuthenticated} />

            {}
            <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/vacancies" element={<VacanciesPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Registration />} />
                    
                </Routes>
            </Container>

            <Footer />
        </Box>
    );
}

export default App;