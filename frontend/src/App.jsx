import React, { useState } from 'react';
import { Header, Footer } from './components/Header';
import { Routes, Route } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Home from './pages/Home';

const VacanciesPage = () => <Typography variant="h4" component="h1">Вакансии</Typography>;

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '100vh',
            bgcolor: 'background.default',
            alignItems: 'center',
        }}>
            <Box sx={{
                width: '100%',
                maxWidth: { xs: '100%', md: '954px' }, // Optimized for mobile
                bgcolor: 'background.paper',
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
            }}>
                <Header isAuthenticated={isAuthenticated} />

                <Box component="main" sx={{ 
                    flexGrow: 1,
                    px: { xs: 2, md: 4 },
                    py: 4,
                }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/vacancies" element={<VacanciesPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element="/register" />
                    </Routes>
                </Box>

                <Footer />
            </Box>
        </Box>
    );
}

export default App;
