import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Stack, IconButton, Chip, CircularProgress } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DownloadIcon from '@mui/icons-material/Download';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ReplayIcon from '@mui/icons-material/Replay';

const PRIMARY_BLUE = '#006DB2';
const TEXT_GRAY = '#7C7C7C';

const statusLabels = {
    new: 'Новая',
    review: 'На рассмотрении',
    accepted: 'Принята',
    rejected: 'Отклонена',
    withdrawn: 'Отозвана',
    changes_requested: 'Требует правок'
};

const StatusBadge = ({ status }) => {
    const statusMap = {
        review: { color: 'info', icon: <AccessTimeIcon sx={{ fontSize: 14 }} /> },
        changes_requested: { color: 'warning', icon: <ErrorOutlineIcon sx={{ fontSize: 14 }} /> },
        accepted: { color: 'success', icon: <CheckCircleOutlineIcon sx={{ fontSize: 14 }} /> },
        rejected: { color: 'error', icon: <HighlightOffIcon sx={{ fontSize: 14 }} /> },
        withdrawn: { color: 'default', icon: <ReplayIcon sx={{ fontSize: 14 }} /> },
        new: { color: 'primary', icon: <AccessTimeIcon sx={{ fontSize: 14 }} /> },
    };

    const { color, icon } = statusMap[status] || { color: 'default', icon: null };
    const label = statusLabels[status] || 'Неизвестно';

    return (
        <Chip
            label={label}
            icon={icon}
            color={color}
            size="small"
            sx={{
                fontWeight: 'bold',
                textTransform: 'uppercase',
                fontSize: '10px',
                height: '24px',
                borderRadius: '12px',
                '& .MuiChip-label': { paddingLeft: '6px', paddingRight: '6px' },
                '& .MuiChip-icon': { fontSize: 14, marginLeft: '6px' },
            }}
        />
    );
};

const ROPApplicationDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplication = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;
            try {
                const response = await axios.get(`/api/applications/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setApplication(response.data);
            } catch (error) {
                console.error("Error fetching application:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchApplication();
    }, [id]);

    const handleStatusChange = async (newStatus) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put(`/api/applications/${id}/status`, { status: newStatus }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setApplication(response.data);
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Ошибка при обновлении статуса");
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!application) {
        return <Typography sx={{ p: 4, textAlign: 'center' }}>Заявка не найдена</Typography>;
    }

    const practice = application.practice;
    const user = application.user;
    const company = practice.company;

    return (
        <Box sx={{ width: '100%', padding: '40px 0 80px 0' }}>
            
            {/* Header */}
            <Button 
                onClick={() => navigate('/rop/applications')} 
                startIcon={<ArrowBackIcon />}
                sx={{ 
                    color: PRIMARY_BLUE, 
                    textTransform: 'none', 
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 600,
                    fontSize: '20px',
                    mb: 1,
                    p: 0,
                    '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' }
                }}
            >
                К списку заявок
            </Button>

            <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontSize: '16px', color: '#000', mb: 2 }}>
                Заявка № {application.id} Обновлено: {new Date(application.updated_at).toLocaleDateString()}
            </Typography>

            <Typography variant="h1" sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '32px', mb: 1 }}>
                Заявка
            </Typography>
            <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontSize: '18px', fontWeight: 600, color: TEXT_GRAY, mb: 4 }}>
                Просмотрите материалы студента и примите решение
            </Typography>

            {/* Main Content - Single Column Layout */}
            <Stack spacing={4} sx={{ width: '100%' }}>
                
                {/* Student Card */}
                <Box sx={{
                    bgcolor: '#FFFFFF',
                    borderRadius: '40px',
                    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)',
                    p: 4,
                    position: 'relative',
                    width: '100%',
                    boxSizing: 'border-box'
                }}>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                        <Box>
                            <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '32px', lineHeight: 1.2, mb: 1 }}>
                                {user.fullname}
                            </Typography>
                            <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontSize: '16px', fontWeight: 600, color: '#000', mb: 1 }}>
                                {practice.title}
                            </Typography>
                            <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontSize: '12px', fontWeight: 600, color: TEXT_GRAY }}>
                                {company.name} {practice.city} {practice.format} {practice.season}
                            </Typography>
                        </Box>
                        
                        <StatusBadge status={application.status} />
                    </Box>

                    {/* Student Info Tags (Placeholder data as User model might not have these yet) */}
                    <Stack direction="row" spacing={2} mt={3}>
                        <Chip label="3 курс" sx={{ bgcolor: '#D9D9D9', borderRadius: '20px', fontFamily: "'Montserrat', sans-serif", fontSize: '10px' }} />
                        <Chip label="ИИТ" sx={{ bgcolor: '#D9D9D9', borderRadius: '20px', fontFamily: "'Montserrat', sans-serif", fontSize: '10px' }} />
                        <Chip label="В9121-09.03.04" sx={{ bgcolor: '#D9D9D9', borderRadius: '20px', fontFamily: "'Montserrat', sans-serif", fontSize: '10px' }} />
                    </Stack>
                    
                    <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontSize: '12px', fontWeight: 600, color: TEXT_GRAY, mt: 2 }}>
                        Дата подачи: {new Date(application.created_at).toLocaleDateString()}
                    </Typography>
                </Box>

                {/* Actions Block */}
                <Box>
                    <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '20px', mb: 2 }}>
                        Действия
                    </Typography>
                    <Stack spacing={2}>
                        <Button 
                            onClick={() => handleStatusChange('accepted')}
                            sx={{ 
                                bgcolor: PRIMARY_BLUE, 
                                color: '#FFFFFF', 
                                borderRadius: '15px', 
                                height: '44px', 
                                textTransform: 'none', 
                                fontFamily: "'Montserrat', sans-serif", 
                                fontWeight: 700, 
                                fontSize: '20px',
                                width: '100%',
                                '&:hover': { bgcolor: '#005a9e' }
                            }}
                        >
                            Принять
                        </Button>
                        <Button 
                            onClick={() => handleStatusChange('changes_requested')}
                            sx={{ 
                                bgcolor: '#EEEEEE', 
                                color: '#000000', 
                                border: `1px solid ${PRIMARY_BLUE}`,
                                borderRadius: '15px', 
                                height: '44px', 
                                textTransform: 'none', 
                                fontFamily: "'Montserrat', sans-serif", 
                                fontWeight: 700, 
                                fontSize: '20px',
                                width: '100%'
                            }}
                        >
                            Требуют правок
                        </Button>
                        <Button 
                            onClick={() => handleStatusChange('rejected')}
                            sx={{ 
                                bgcolor: '#EEEEEE', 
                                color: '#000000', 
                                border: '1px solid #D2060A',
                                borderRadius: '15px', 
                                height: '44px', 
                                textTransform: 'none', 
                                fontFamily: "'Montserrat', sans-serif", 
                                fontWeight: 700, 
                                fontSize: '20px',
                                width: '100%'
                            }}
                        >
                            Отклонить
                        </Button>
                    </Stack>
                </Box>

                {/* Documents */}
                <Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '20px' }}>
                            Документы
                        </Typography>
                        <Button sx={{ textTransform: 'none', color: '#000', fontFamily: "'Montserrat', sans-serif", fontSize: '14px' }}>
                            Скачать всё
                        </Button>
                    </Box>
                    <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontSize: '14px', fontWeight: 600, color: TEXT_GRAY, mb: 2 }}>
                        При изменении статуса студент получит уведомление
                    </Typography>

                    <Stack spacing={2}>
                        {/* Placeholder documents as backend doesn't store them yet */}
                        {['Резюме.pdf', 'Портфолио.pdf'].map((doc, index) => (
                            <Box key={index} sx={{
                                bgcolor: '#EEEEEE',
                                borderRadius: '15px',
                                p: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <Box display="flex" alignItems="center" gap={2}>
                                    <Box sx={{ width: 40, height: 40, bgcolor: '#D9D9D9', borderRadius: '50%' }} />
                                    <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontSize: '16px' }}>
                                        {doc}
                                    </Typography>
                                </Box>
                                <Button startIcon={<DownloadIcon />} sx={{ textTransform: 'none', color: '#000' }}>
                                    Скачать
                                </Button>
                            </Box>
                        ))}
                    </Stack>
                </Box>

                {/* Application Form Data */}
                <Box sx={{
                    bgcolor: '#FFFFFF',
                    borderRadius: '30px',
                    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)',
                    p: 4,
                    width: '100%',
                    boxSizing: 'border-box'
                }}>
                    <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '20px', mb: 3 }}>
                        Анкета заявки
                    </Typography>
                    
                    <Stack spacing={3}>
                        <Box>
                            <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontSize: '14px', color: TEXT_GRAY }}>
                                Желаемый период
                            </Typography>
                            <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontSize: '16px', fontWeight: 600 }}>
                                {practice.season}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontSize: '14px', color: TEXT_GRAY }}>
                                Формат практики
                            </Typography>
                            <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontSize: '16px', fontWeight: 600 }}>
                                {practice.format}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontSize: '14px', color: TEXT_GRAY }}>
                                Ссылки на проекты
                            </Typography>
                            <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontSize: '16px', fontWeight: 600 }}>
                                -
                            </Typography>
                        </Box>
                        <Box>
                            <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontSize: '14px', color: TEXT_GRAY }}>
                                Комментарий студента
                            </Typography>
                            <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontSize: '16px', fontWeight: 600 }}>
                                -
                            </Typography>
                        </Box>
                    </Stack>
                </Box>

            </Stack>
        </Box>
    );
};

export default ROPApplicationDetailsPage;
