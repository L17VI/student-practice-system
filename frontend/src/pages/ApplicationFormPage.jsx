import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, Stack, TextField } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PRIMARY_BLUE = '#006DB2';

const ApplicationFormPage = () => {
    const { id } = useParams(); // practiceId
    const navigate = useNavigate();
    const [practice, setPractice] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Form fields (if any needed in future, currently just confirm)
    const [coverLetter, setCoverLetter] = useState('');

    useEffect(() => {
        const fetchPractice = async () => {
            try {
                const response = await axios.get(`/api/practice/${id}`);
                setPractice(response.data);
            } catch (error) {
                console.error("Error fetching practice:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPractice();
    }, [id]);

    const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            // Create application directly in 'review' status
            await axios.post('/api/applications/', { 
                practice_id: id,
                // cover_letter: coverLetter // If backend supports it later
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/applications');
        } catch (error) {
            console.error("Error submitting application:", error);
            alert("Ошибка при отправке заявки");
        }
    };

    if (loading) return <Typography sx={{ p: 4, textAlign: 'center' }}>Загрузка...</Typography>;
    if (!practice) return <Typography sx={{ p: 4, textAlign: 'center' }}>Практика не найдена</Typography>;

    return (
        <Box sx={{ maxWidth: '800px', margin: '0 auto', padding: '40px 0' }}>
            <Button 
                onClick={() => navigate(`/practice/${id}`)} 
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
                Назад к практике
            </Button>

            <Paper sx={{ 
                p: 5, 
                borderRadius: '40px', 
                boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.15)' 
            }}>
                <Typography variant="h4" sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, mb: 1 }}>
                    Подача заявки
                </Typography>
                <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontSize: '16px', color: '#666', mb: 4 }}>
                    на практику "{practice.title}" в компанию {practice.company.name}
                </Typography>

                {/* Form Fields Placeholder */}
                <Box sx={{ mb: 4 }}>
                    <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, mb: 1 }}>
                        Сопроводительное письмо (необязательно)
                    </Typography>
                    <TextField
                        multiline
                        rows={4}
                        fullWidth
                        placeholder="Расскажите, почему вы хотите пройти практику именно здесь..."
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '20px',
                                fontFamily: "'Montserrat', sans-serif",
                            }
                        }}
                    />
                </Box>

                <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button 
                        variant="outlined" 
                        onClick={() => navigate(`/practice/${id}`)}
                        sx={{ 
                            borderRadius: '30px', 
                            textTransform: 'none', 
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 600,
                            borderColor: '#F43E41',
                            color: '#F43E41',
                            '&:hover': { borderColor: '#d32f2f', bgcolor: 'rgba(244, 62, 65, 0.04)' }
                        }}
                    >
                        Отмена
                    </Button>
                    <Button 
                        variant="contained" 
                        onClick={handleSubmit}
                        sx={{ 
                            bgcolor: PRIMARY_BLUE, 
                            borderRadius: '30px', 
                            textTransform: 'none', 
                            fontFamily: "'Montserrat', sans-serif", 
                            fontWeight: 600,
                            px: 4,
                            '&:hover': { bgcolor: '#005a9e' }
                        }}
                    >
                        Подтвердить
                    </Button>
                </Stack>
            </Paper>
        </Box>
    );
};

export default ApplicationFormPage;
