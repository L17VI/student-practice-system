import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Stack, IconButton } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { PracticePageSkeleton } from '../components/Skeletons';

const PRIMARY_BLUE = '#006DB2';

const statusLabels = {
    draft: 'Черновик', // Should not be seen in list usually, but kept for safety
    review: 'На рассмотрении',
    accepted: 'Принята',
    rejected: 'Отклонена',
    changes_requested: 'Требует правок',
    withdrawn: 'Отозвана'
};

const PracticePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [practice, setPractice] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(true);
    const [application, setApplication] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const headers = token ? { Authorization: `Bearer ${token}` } : {};

                const [practiceRes, favoritesRes, applicationsRes] = await Promise.all([
                    axios.get(`/api/practice/${id}`),
                    axios.get('/api/favorite/', { headers }).catch(() => ({ data: [] })),
                    axios.get('/api/applications/my', { headers }).catch(() => ({ data: [] }))
                ]);

                setPractice(practiceRes.data);
                
                const favoriteIds = favoritesRes.data.map(f => f.practice_id);
                setIsFavorite(favoriteIds.includes(parseInt(id)));

                const myApp = applicationsRes.data.find(app => app.practice_id === parseInt(id));
                setApplication(myApp);

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleToggleFavorite = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Пожалуйста, войдите в систему");
            return;
        }

        try {
            if (isFavorite) {
                await axios.delete(`/api/favorite/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setIsFavorite(false);
            } else {
                await axios.post('/api/favorite/', { practice_id: id }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setIsFavorite(true);
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    };

    const handleApply = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        // Navigate to application form (draft)
        navigate(`/practice/${id}/apply`);
    };

    if (loading) {
        return <PracticePageSkeleton />;
    }

    if (!practice) {
        return <Typography sx={{ p: 4, textAlign: 'center' }}>Практика не найдена</Typography>;
    }

    const availableSeats = practice.total_seats - practice.filled_seats;
    const seatsText = availableSeats > 0 ? `Осталось мест: ${availableSeats} из ${practice.total_seats}` : 'Мест нет';

    return (
        <Box sx={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 0 80px 0' }}>
            
            {/* Back Button */}
            <Button 
                onClick={() => navigate('/')} 
                startIcon={<ArrowBackIcon />}
                sx={{ 
                    color: '#A3A8C9', 
                    textTransform: 'none', 
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 500,
                    mb: 4,
                    '&:hover': { color: PRIMARY_BLUE, bgcolor: 'transparent' }
                }}
            >
                Назад к каталогу
            </Button>

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 360px' },
                gap: '40px',
                alignItems: 'start'
            }}>
                
                {/* LEFT COLUMN: Content */}
                <Box sx={{
                    bgcolor: '#FFFFFF',
                    borderRadius: '40px',
                    boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.15)',
                    padding: '50px'
                }}>
                    <Typography variant="h1" sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '36px', lineHeight: 1.2, mb: 2 }}>
                        {practice.title}
                    </Typography>
                    
                    {/* Tags */}
                    <Box sx={{ display: 'flex', gap: '12px', mb: 5, flexWrap: 'wrap' }}>
                        <Box sx={{ bgcolor: '#F6F6F6', borderRadius: '40px', px: 2.5, py: 1, display: 'flex', alignItems: 'center', gap: 1, fontSize: '14px', fontFamily: "'Montserrat', sans-serif" }}>
                            <LocationOnIcon sx={{ fontSize: 18, color: '#666' }} /> {practice.city}
                        </Box>
                        <Box sx={{ bgcolor: '#F6F6F6', borderRadius: '40px', px: 2.5, py: 1, display: 'flex', alignItems: 'center', gap: 1, fontSize: '14px', fontFamily: "'Montserrat', sans-serif" }}>
                            <AccessTimeIcon sx={{ fontSize: 18, color: '#666' }} /> {practice.format}
                        </Box>
                        <Box sx={{ bgcolor: '#F6F6F6', borderRadius: '40px', px: 2.5, py: 1, fontSize: '14px', fontFamily: "'Montserrat', sans-serif" }}>
                            {practice.season}
                        </Box>
                    </Box>

                    <Box sx={{ borderTop: '1px solid #EEE', my: 4 }} />

                    {/* Description */}
                    <Box sx={{ mb: 5 }}>
                        <Typography variant="h3" sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '20px', mb: 2 }}>
                            О практике
                        </Typography>
                        <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontSize: '16px', lineHeight: 1.6, color: 'rgba(0,0,0,0.8)', whiteSpace: 'pre-wrap' }}>
                            {practice.description || "Описание отсутствует."}
                        </Typography>
                    </Box>

                    {/* Tasks */}
                    <Box sx={{ mb: 5 }}>
                        <Typography variant="h3" sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '20px', mb: 2 }}>
                            Чем предстоит заниматься:
                        </Typography>
                        <ul style={{ paddingLeft: '20px', margin: 0 }}>
                            <li style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '16px', lineHeight: 1.6, marginBottom: '8px', color: 'rgba(0,0,0,0.8)' }}>
                                Разработка и поддержка веб-приложений
                            </li>
                            <li style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '16px', lineHeight: 1.6, marginBottom: '8px', color: 'rgba(0,0,0,0.8)' }}>
                                Взаимодействие с командой дизайнеров и бэкенд-разработчиков
                            </li>
                        </ul>
                    </Box>

                    {/* Requirements */}
                    <Box sx={{ mb: 5 }}>
                        <Typography variant="h3" sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '20px', mb: 2 }}>
                            Что мы ждем от тебя:
                        </Typography>
                        <ul style={{ paddingLeft: '20px', margin: 0 }}>
                            <li style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '16px', lineHeight: 1.6, marginBottom: '8px', color: 'rgba(0,0,0,0.8)' }}>
                                Базовые знания технологий (React, Python, etc.)
                            </li>
                            <li style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '16px', lineHeight: 1.6, marginBottom: '8px', color: 'rgba(0,0,0,0.8)' }}>
                                Желание учиться и развиваться
                            </li>
                        </ul>
                    </Box>

                </Box>

                {/* RIGHT COLUMN: Sidebar */}
                <Box sx={{
                    bgcolor: '#FFFFFF',
                    borderRadius: '40px',
                    boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.15)',
                    padding: '30px',
                    position: 'sticky',
                    top: '20px'
                }}>
                    {/* Company Header */}
                    <Box 
                        onClick={() => navigate(`/company/${practice.company.name}`)}
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 2, 
                            mb: 3, 
                            pb: 3, 
                            borderBottom: '1px solid #F0F0F0',
                            cursor: 'pointer',
                            transition: 'opacity 0.2s',
                            '&:hover': { opacity: 0.7 }
                        }}
                    >
                        <Box sx={{ width: 50, height: 50, bgcolor: '#D9D9D9', borderRadius: '12px' }} />
                        <Box>
                            <Typography sx={{ fontWeight: 700, fontSize: '16px', fontFamily: "'Montserrat', sans-serif", color: PRIMARY_BLUE }}>
                                {practice.company.name}
                            </Typography>
                            <Typography sx={{ fontSize: '12px', color: '#999', fontFamily: "'Montserrat', sans-serif" }}>
                                IT-компания
                            </Typography>
                        </Box>
                    </Box>

                    {/* Seats */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                        <Box sx={{ width: 8, height: 8, bgcolor: availableSeats > 0 ? '#08A600' : '#F43E41', borderRadius: '50%' }} />
                        <Typography sx={{ fontSize: '14px', fontWeight: 500, color: availableSeats > 0 ? '#08A600' : '#F43E41', fontFamily: "'Montserrat', sans-serif" }}>
                            {seatsText}
                        </Typography>
                    </Box>

                    {/* Actions */}
                    <Stack spacing={1.5}>
                        {application ? (
                            <Button 
                                variant="contained" 
                                fullWidth
                                onClick={() => navigate('/applications')}
                                sx={{ 
                                    bgcolor: '#F6F6F6', 
                                    color: PRIMARY_BLUE,
                                    borderRadius: '40px', 
                                    height: '45px',
                                    textTransform: 'none',
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontWeight: 700,
                                    fontSize: '15px',
                                    '&:hover': { bgcolor: '#E0E0E0' }
                                }}
                            >
                                {statusLabels[application.status]}
                            </Button>
                        ) : (
                            <Button 
                                variant="contained" 
                                fullWidth
                                disabled={availableSeats <= 0}
                                onClick={handleApply}
                                sx={{ 
                                    bgcolor: PRIMARY_BLUE, 
                                    borderRadius: '40px', 
                                    height: '45px',
                                    textTransform: 'none',
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontWeight: 700,
                                    fontSize: '15px',
                                    '&:hover': { bgcolor: '#005a9e' }
                                }}
                            >
                                {availableSeats > 0 ? 'Записаться' : 'Места закончились'}
                            </Button>
                        )}

                        <Button 
                            variant="outlined" 
                            fullWidth
                            onClick={handleToggleFavorite}
                            startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                            sx={{ 
                                borderColor: '#F43E41', 
                                color: '#F43E41',
                                borderRadius: '40px', 
                                height: '45px',
                                textTransform: 'none',
                                fontFamily: "'Montserrat', sans-serif",
                                fontWeight: 500,
                                '&:hover': { bgcolor: 'rgba(244, 62, 65, 0.05)', borderColor: '#F43E41' }
                            }}
                        >
                            {isFavorite ? 'В избранном' : 'В избранное'}
                        </Button>
                    </Stack>

                    <Typography sx={{ mt: 3, fontSize: '12px', color: '#AAA', textAlign: 'center', fontFamily: "'Montserrat', sans-serif" }}>
                        Опубликовано недавно
                    </Typography>
                </Box>

            </Box>
        </Box>
    );
};

export default PracticePage;
