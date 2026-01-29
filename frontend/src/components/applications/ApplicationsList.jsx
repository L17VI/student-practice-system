import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Button,
    Paper,
    InputAdornment,
    TextField,
    Chip,
    IconButton,
    Grid
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import EditNoteIcon from '@mui/icons-material/EditNote';
import RefreshIcon from '@mui/icons-material/Refresh';

const StatusBadge = ({ status }) => {
    const statusMap = {
        'На рассмотрении': { color: 'info', icon: <AccessTimeIcon sx={{ fontSize: 14 }} /> },
        'Требуют правок': { color: 'warning', icon: <ErrorOutlineIcon sx={{ fontSize: 14 }} /> },
        'Принята': { color: 'success', icon: <CheckCircleOutlineIcon sx={{ fontSize: 14 }} /> },
        'Отклонена': { color: 'error', icon: <CancelOutlinedIcon sx={{ fontSize: 14 }} /> },
        'Черновик': { color: 'default', icon: <EditNoteIcon sx={{ fontSize: 14 }} /> },
        'Отозвана': { color: 'default', icon: <RefreshIcon sx={{ fontSize: 14 }} /> },
    };

    const { color, icon } = statusMap[status] || { color: 'default', icon: null };

    return (
        <Chip
            label={status}
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

const ApplicationsList = () => {
    const [activeTab, setActiveTab] = useState('Все');
    const navigate = useNavigate();

    const stats = [
        { label: 'На рассмотрении', count: 2, icon: <AccessTimeIcon sx={{ color: 'info.main' }} /> },
        { label: 'Требуют правок', count: 1, icon: <ErrorOutlineIcon sx={{ color: 'warning.main' }} /> },
        { label: 'Приняты', count: 2, icon: <CheckCircleOutlineIcon sx={{ color: 'success.main' }} /> },
        { label: 'Отклонены', count: 1, icon: <CancelOutlinedIcon sx={{ color: 'error.main' }} /> },
        { label: 'Черновики', count: 1, icon: <EditNoteIcon sx={{ color: 'text.secondary' }} /> },
    ];

    const applications = [
        { id: 1, title: 'Backend-разработчик', company: 'ООО Програм', city: 'Владивосток', format: 'Удалённо', season: 'Весна', date: '12.01.2026', status: 'На рассмотрении', isNew: true },
        { id: 2, title: 'Пищевой инженер', company: 'ДВФУ', city: 'Владивосток', format: 'Очно', season: 'Лето', date: '11.01.2026', status: 'Требуют правок' },
        { id: 3, title: 'ML-разработчик', company: 'ООО ИскусствИнтел', city: 'Москва', format: 'Гибрид', season: 'Весна', date: '09.01.2026', status: 'Принята' },
        { id: 4, title: 'UX/UI-дизайнер', company: 'ООО Програм', city: 'Владивосток', format: 'Удалённо', season: 'Лето', date: '08.01.2026', status: 'Отклонена' },
        { id: 5, title: 'Frontend-разработчик', company: 'ООО Програм', city: 'Владивосток', format: 'Удалённо', season: 'Весна', date: '07.01.2026', status: 'Черновик' },
        { id: 6, title: 'Data Lab', company: 'ДВФУ / Партнер', city: 'Владивосток', format: 'Очно', season: 'Осень', date: '06.01.2026', status: 'Отозвана' },
    ];

    const handleOpenApplication = (id) => {
        navigate(`/applications/${id}`);
    };

    return (
        <Box sx={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 0', fontFamily: "'Montserrat', sans-serif" }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
                Мои заявки
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
                Отслеживайте статус заявок и взаимодействуйте с ними
            </Typography>

            <Grid container spacing={2} sx={{ mb: 4 }}>
                {stats.map((stat, i) => (
                    <Grid item xs={12} sm={6} md={2.4} key={i}>
                        <Paper elevation={0} sx={{ p: 2, borderRadius: '40px', display: 'flex', alignItems: 'center', gap: 2, boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.15)', }}>
                            <Box sx={{ bgcolor: 'grey.50', p: 1.5, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {stat.icon}
                            </Box>
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', lineHeight: 1 }}>
                                    {stat.count}
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', fontSize: '10px', lineHeight: 1 }}>
                                    {stat.label}
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {['Все', 'На рассмотрении', 'Требуют правок', 'Приняты', 'Отклонены', 'Черновики', 'Отозваны'].map((tab) => (
                        <Button
                            key={tab}
                            variant={activeTab === tab ? 'contained' : 'text'}
                            onClick={() => setActiveTab(tab)}
                            sx={{
                                borderRadius: '30px',
                                textTransform: 'none',
                                fontWeight: 'medium',
                                px: 2.5,
                                py: 1,
                                bgcolor: activeTab === tab ? 'primary.main' : 'grey.200',
                                color: activeTab === tab ? 'white' : 'text.primary',
                                '&:hover': {
                                    bgcolor: activeTab === tab ? 'primary.dark' : 'grey.300',
                                },
                            }}
                        >
                            {tab}
                        </Button>
                    ))}
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Button
                        variant="text"
                        endIcon={<KeyboardArrowDownIcon />}
                        sx={{
                            bgcolor: 'grey.200',
                            color: 'text.primary',
                            textTransform: 'none',
                            borderRadius: '30px',
                            px: 2,
                            py: 1,
                            '&:hover': { bgcolor: 'grey.300' },
                        }}
                    >
                        Сортировка: <Typography component="span" sx={{ fontWeight: 'bold', ml: 0.5 }}>по обновлению</Typography>
                    </Button>
                    <IconButton sx={{ bgcolor: 'grey.200', borderRadius: '30px', p: 1, '&:hover': { bgcolor: 'grey.300' } }}>
                        <FilterListIcon sx={{ color: 'text.secondary' }} />
                    </IconButton>
                </Box>
            </Box>

            <TextField
                fullWidth
                placeholder="Поиск по названию практики или организации..."
                variant="outlined"
                sx={{
                    mb: 4,
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '30px',
                        paddingLeft: '12px',
                        backgroundColor: 'white',
                        boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.15)',
                        '& fieldset': { border: 'none' },
                    },
                    '& .MuiInputBase-input': {
                        padding: '12px 14px',
                        '::placeholder': { color: 'grey.400', opacity: 1 },
                    },
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon sx={{ color: 'grey.400' }} />
                        </InputAdornment>
                    ),
                }}
            />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {applications.map((app) => (
                    <Paper 
                        key={app.id} 
                        elevation={0} 
                        sx={{ 
                            borderRadius: '40px', 
                            p: 3, 
                            boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.15)',
                            transition: 'transform 0.2s',
                            '&:hover': {
                                transform: 'translateY(-5px)',
                            }
                        }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 3 }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                                        Практика: {app.title}
                                    </Typography>
                                    {app.isNew && (
                                        <Chip
                                            label="НОВОЕ"
                                            size="small"
                                            sx={{
                                                bgcolor: 'primary.main',
                                                color: 'white',
                                                fontWeight: 'black',
                                                fontSize: '9px',
                                                height: '18px',
                                                borderRadius: '8px',
                                                '& .MuiChip-label': { px: 0.8 },
                                            }}
                                        />
                                    )}
                                </Box>
                                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                                    {app.company}
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'text.disabled', display: 'flex', gap: 1.5 }}>
                                    <span>{app.city}</span> • <span>{app.format}</span> • <span>{app.season}</span>
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'flex-start', md: 'flex-end' }, gap: 2, width: { xs: '100%', md: 'auto' } }}>
                                <StatusBadge status={app.status} />

                                <Box sx={{ display: 'flex', gap: 1.5, width: { xs: '100%', md: 'auto' } }}>
                                    {(app.status === 'На рассмотрении' || app.status === 'Черновик' || app.status === 'Отозвана') && (
                                        <Button
                                            variant="contained"
                                            sx={{
                                                bgcolor: 'grey.200',
                                                color: 'text.secondary',
                                                fontWeight: 'bold',
                                                borderRadius: '30px',
                                                textTransform: 'none',
                                                flexGrow: 1,
                                                '&:hover': { bgcolor: 'grey.300' },
                                            }}
                                        >
                                            Отозвать
                                        </Button>
                                    )}

                                    <Button
                                        variant="contained"
                                        onClick={() => handleOpenApplication(app.id)}
                                        sx={{
                                            bgcolor: 'primary.main',
                                            color: 'white',
                                            fontWeight: 'bold',
                                            borderRadius: '30px',
                                            textTransform: 'none',
                                            flexGrow: 1,
                                            '&:hover': { bgcolor: 'primary.dark' },
                                        }}
                                    >
                                        {app.status === 'Требуют правок' ? 'Исправить' :
                                            app.status === 'Черновик' ? 'Продолжить' : 'Открыть'}
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ borderTop: '1px solid', borderColor: 'grey.100', pt: 2, mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                            <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '11px' }}>
                                Обновлено: {app.date}
                            </Typography>
                        </Box>
                    </Paper>
                ))}
            </Box>
        </Box>
    );
};

export default ApplicationsList;