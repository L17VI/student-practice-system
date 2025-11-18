import React, { useState } from 'react';
import { Header, Footer } from './components/Header';
import { Routes, Route } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Home from './pages/Home';

const VacanciesPage = () => <Typography variant="h4" component="h1">Вакансии</Typography>;

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header isAuthenticated={isAuthenticated} />

            <Box component="main" sx={{ 
                flexGrow: 1, 
                pt: '126px',
            }}>
                <Container>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/vacancies" element={<VacanciesPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Registration />} />
                    </Routes>
                </Container>
            </Box>

            <Footer />
        </Box>
    );
}

export default App;
