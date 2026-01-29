import React from 'react';
import { Box, Typography, Paper, Chip, Link } from '@mui/material';
import { ArrowBack as ArrowBackIcon, Place as PlaceIcon, Computer as ComputerIcon, CalendarToday as CalendarTodayIcon, ErrorOutline as ErrorOutlineIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const ApplicationCard = () => {
    return (
        <Box sx={{ mb: 3 }}>
            <Link component={RouterLink} to="/applications" sx={{ display: 'flex', alignItems: 'center', color: 'primary.main', textDecoration: 'none', mb: 2, fontWeight: 'medium' }}>
                <ArrowBackIcon sx={{ fontSize: 16, mr: 0.5 }} />
                К моим заявкам
            </Link>

            <Typography variant="caption" sx={{ color: 'text.secondary', mb: 0.5, display: 'block' }}>
                Заявка № 01234 • Обновлено: 12.01.2026
            </Typography>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 0.5, color: 'text.primary' }}>
                Заявка на практику
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
                Отслеживайте статус и выполняйте действия по заявке
            </Typography>

            <Paper 
                elevation={0} 
                sx={{ 
                    p: 4, 
                    borderRadius: '40px', 
                    boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.15)' 
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5, color: 'text.primary' }}>
                            Backend-разработчик
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                            ООО Програм
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            <Chip icon={<PlaceIcon />} label="Владивосток" variant="outlined" size="small" sx={{ borderRadius: '12px' }} />
                            <Chip icon={<ComputerIcon />} label="Удалённо" variant="outlined" size="small" sx={{ borderRadius: '12px' }} />
                            <Chip icon={<CalendarTodayIcon />} label="Весна 2026" variant="outlined" size="small" sx={{ borderRadius: '12px' }} />
                        </Box>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 2 }}>
                            Дата подачи: 10.01.2026
                        </Typography>
                    </Box>
                    <Box>
                        <Chip
                            label="Требуют правок"
                            icon={<ErrorOutlineIcon />}
                            color="warning"
                            size="medium"
                            sx={{ fontWeight: 'bold', borderRadius: '12px' }}
                        />
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default ApplicationCard;