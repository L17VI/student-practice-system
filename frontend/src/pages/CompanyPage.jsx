import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, IconButton, Skeleton } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Card from '../components/common/Card';
import { CardSkeleton } from '../components/common/Skeletons';

const PRIMARY_BLUE = '#006DB2';

const CompanyPage = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const [practices, setPractices] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [companyInfo, setCompanyInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [practicesRes, favoritesRes] = await Promise.all([
                    axios.get('/api/practice/'),
                    axios.get('/api/favorite/', {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                    }).catch(() => ({ data: [] }))
                ]);

                // Filter practices for this company
                const companyPractices = practicesRes.data.filter(p => p.company.name === name);
                
                // Process data for Card component
                const processedPractices = companyPractices.map(p => {
                    const available = p.total_seats - p.filled_seats;
                    return {
                        ...p,
                        seatsText: available > 0 ? `Осталось мест: ${available} из ${p.total_seats}` : 'Мест нет',
                        isAvailable: available > 0
                    };
                });

                setPractices(processedPractices);
                setFavorites(favoritesRes.data.map(f => f.practice_id));

                if (processedPractices.length > 0) {
                    setCompanyInfo({
                        name: processedPractices[0].company.name,
                        city: processedPractices[0].company.city
                    });
                } else {
                    setCompanyInfo({
                        name: name,
                        city: 'Город не указан' 
                    });
                }

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [name]);

    const handleToggleFavorite = async (practiceId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Пожалуйста, войдите в систему");
            return;
        }

        const isFavorite = favorites.includes(practiceId);
        const headers = { Authorization: `Bearer ${token}` };

        try {
            if (isFavorite) {
                await axios.delete(`/api/favorite/${practiceId}`, { headers });
                setFavorites(prev => prev.filter(id => id !== practiceId));
            } else {
                await axios.post('/api/favorite/', { practice_id: practiceId }, { headers });
                setFavorites(prev => [...prev, practiceId]);
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    };

    if (loading) {
        return (
            <Box sx={{ maxWidth: '1147px', margin: '0 auto', padding: '40px 0 80px 0' }}>
                <Skeleton variant="text" width={150} height={30} sx={{ mb: 4 }} />
                
                {/* Company Header Skeleton */}
                <Box sx={{ 
                    bgcolor: '#FFFFFF', 
                    borderRadius: '40px', 
                    p: 4, 
                    mb: 5, 
                    boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3
                }}>
                    <Skeleton variant="rounded" width={80} height={80} sx={{ borderRadius: '20px' }} />
                    <Box>
                        <Skeleton variant="text" width={200} height={40} />
                        <Skeleton variant="text" width={100} height={20} sx={{ mt: 1 }} />
                    </Box>
                </Box>

                <Skeleton variant="text" width={200} height={30} sx={{ mb: 3 }} />

                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '40px' }}>
                    {[...Array(3)].map((_, i) => <CardSkeleton key={i} />)}
                </Box>
            </Box>
        );
    }

    if (!companyInfo) {
        return <Typography sx={{ p: 4, textAlign: 'center' }}>Компания не найдена</Typography>;
    }

    return (
        <Box sx={{ maxWidth: '1147px', margin: '0 auto', padding: '40px 0 80px 0' }}>
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

            {/* Company Header */}
            <Box sx={{ 
                bgcolor: '#FFFFFF', 
                borderRadius: '40px', 
                p: 4, 
                mb: 5, 
                boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: 3
            }}>
                <Box sx={{ 
                    width: 80, 
                    height: 80, 
                    bgcolor: '#F6F6F6', 
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: PRIMARY_BLUE
                }}>
                    <BusinessIcon sx={{ fontSize: 40 }} />
                </Box>
                <Box>
                    <Typography variant="h1" sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '32px', lineHeight: 1.2, mb: 1 }}>
                        {companyInfo.name}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                        <LocationOnIcon sx={{ fontSize: 20, color: '#A3A8C9' }} />
                        <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontSize: '16px', color: '#A3A8C9' }}>
                            {companyInfo.city}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Typography variant="h2" sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: '24px', mb: 3 }}>
                Вакансии компании ({practices.length})
            </Typography>

            {/* Practices Grid */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '40px',
                }}
            >
                {practices.map((practice) => (
                    <Card 
                        key={practice.id} 
                        data={practice} 
                        // isAdmin={isAdmin} // Pass if needed
                        // onEdit={handleEditClick}
                        // onDelete={handleDeleteClick}
                        isFavorite={favorites.includes(practice.id)}
                        onToggleFavorite={handleToggleFavorite}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default CompanyPage;
