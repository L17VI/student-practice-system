import React from 'react';
import { Box, Typography, Paper, Chip, Link } from '@mui/material';
import { ArrowBack as ArrowBackIcon, Place as PlaceIcon, Computer as ComputerIcon, CalendarToday as CalendarTodayIcon, ErrorOutline as ErrorOutlineIcon, AccessTime as AccessTimeIcon, CheckCircleOutline as CheckCircleOutlineIcon, CancelOutlined as CancelOutlinedIcon, EditNote as EditNoteIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const statusLabels = {
    draft: 'Черновик',
    review: 'На рассмотрении',
    accepted: 'Принята',
    rejected: 'Отклонена',
    withdrawn: 'Отозвана',
    changes_requested: 'Требуют правок'
};

const StatusBadge = ({ status }) => {
    const statusMap = {
        review: { color: 'info', icon: <AccessTimeIcon sx={{ fontSize: 14 }} /> },
        changes_requested: { color: 'warning', icon: <ErrorOutlineIcon sx={{ fontSize: 14 }} /> },
        accepted: { color: 'success', icon: <CheckCircleOutlineIcon sx={{ fontSize: 14 }} /> },
        rejected: { color: 'error', icon: <CancelOutlinedIcon sx={{ fontSize: 14 }} /> },
        draft: { color: 'default', icon: <EditNoteIcon sx={{ fontSize: 14 }} /> },
        withdrawn: { color: 'default', icon: <RefreshIcon sx={{ fontSize: 14 }} /> },
    };

    const { color, icon } = statusMap[status] || { color: 'default', icon: null };
    const label = statusLabels[status] || status;

    return (
        <Chip
            label={label}
            icon={icon}
            color={color}
            size="medium"
            sx={{ fontWeight: 'bold', borderRadius: '12px' }}
        />
    );
};

const ApplicationCard = ({ application }) => {
    if (!application) return null;

    const { practice, updated_at, id, status } = application;

    return (
        <Box sx={{ mb: 3 }}>
            <Link component={RouterLink} to="/applications" sx={{ display: 'flex', alignItems: 'center', color: 'primary.main', textDecoration: 'none', mb: 2, fontWeight: 'medium' }}>
                <ArrowBackIcon sx={{ fontSize: 16, mr: 0.5 }} />
                К моим заявкам
            </Link>

            <Typography variant="caption" sx={{ color: 'text.secondary', mb: 0.5, display: 'block' }}>
                Заявка № {id} • Обновлено: {new Date(updated_at).toLocaleDateString()}
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
                            {practice.title}
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                            {practice.company.name}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            <Chip icon={<PlaceIcon />} label={practice.city} variant="outlined" size="small" sx={{ borderRadius: '12px' }} />
                            <Chip icon={<ComputerIcon />} label={practice.format} variant="outlined" size="small" sx={{ borderRadius: '12px' }} />
                            <Chip icon={<CalendarTodayIcon />} label={practice.season} variant="outlined" size="small" sx={{ borderRadius: '12px' }} />
                        </Box>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 2 }}>
                            Дата подачи: {new Date(application.created_at).toLocaleDateString()}
                        </Typography>
                    </Box>
                    <Box>
                        <StatusBadge status={status} />
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default ApplicationCard;