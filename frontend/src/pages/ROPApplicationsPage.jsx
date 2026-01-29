import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, IconButton, InputBase, Stack, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ReplayIcon from '@mui/icons-material/Replay';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

const StatCard = ({ count, label, icon, color }) => (
    <Box sx={{
        bgcolor: '#FFFFFF',
        borderRadius: '30px',
        boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)',
        p: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        flex: 1,
        minWidth: '160px',
        height: '80px',
        boxSizing: 'border-box'
    }}>
        <Box sx={{
            width: 50,
            height: 50,
            bgcolor: color,
            borderRadius: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            flexShrink: 0
        }}>
            {icon}
        </Box>
        <Box>
            <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '24px', lineHeight: 1 }}>
                {count}
            </Typography>
            <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontSize: '11px', color: '#000', lineHeight: 1.2 }}>
                {label}
            </Typography>
        </Box>
    </Box>
);

const ApplicationCard = ({ app }) => {
    const navigate = useNavigate();

    return (
        <Box sx={{
            bgcolor: '#FFFFFF',
            p: '20px',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            borderBottom: '1px solid #E0E0E0',
            '&:last-child': {
                borderBottom: 'none'
            },
            height: '85px',
            boxSizing: 'content-box'
        }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '20px', lineHeight: '24px', color: '#000' }}>
                    {app.studentName}
                </Typography>
                <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: '15px', lineHeight: '18px', color: '#000' }}>
                    {app.practiceTitle}
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                    <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: '11px', lineHeight: '13px', color: TEXT_GRAY }}>
                        {app.companyName} • {app.city}
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', height: '100%' }}>
                <StatusBadge status={app.status} />
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: '11px', color: TEXT_GRAY, display: { xs: 'none', sm: 'block' } }}>
                        Обновлено: {new Date(app.updatedAt).toLocaleDateString()}
                    </Typography>

                    <Button 
                        variant="contained" 
                        onClick={() => navigate(`/rop/applications/${app.id}`)}
                        sx={{
                            bgcolor: PRIMARY_BLUE,
                            borderRadius: '15px',
                            textTransform: 'none',
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 600,
                            fontSize: '15px',
                            width: '119px',
                            height: '35px',
                            p: 0,
                            '&:hover': { bgcolor: '#005a9e' }
                        }}
                    >
                        Открыть
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

const ROPApplicationsPage = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchApplications = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await axios.get('/api/applications/', {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            const mappedApps = response.data.map(app => ({
                id: app.id,
                studentName: app.user.fullname,
                practiceTitle: app.practice.title,
                companyName: app.practice.company.name,
                city: app.practice.city,
                status: app.status,
                updatedAt: app.updated_at
            }));
            setApplications(mappedApps);
        } catch (error) {
            console.error("Error fetching applications:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    // Calculate stats
    const stats = {
        review: applications.filter(a => a.status === 'review').length,
        accepted: applications.filter(a => a.status === 'accepted').length,
        rejected: applications.filter(a => a.status === 'rejected').length,
        changes_requested: applications.filter(a => a.status === 'changes_requested').length,
        withdrawn: applications.filter(a => a.status === 'withdrawn').length,
    };

    return (
        <Box sx={{ width: '100%', padding: '40px 0 80px 0' }}>
            <Typography variant="h1" sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: { xs: '28px', md: '32px' }, mb: 1 }}>
                Заявки
            </Typography>
            <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontSize: { xs: '16px', md: '20px' }, color: TEXT_GRAY, mb: 4 }}>
                Просматривайте заявки по закрепленным практикам и принимайте решения
            </Typography>

            {/* Stats Row */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={6} sm={4} md={2.4}>
                    <StatCard count={stats.review} label="На рассмотрении" icon={<AccessTimeIcon />} color={PRIMARY_BLUE} />
                </Grid>
                <Grid item xs={6} sm={4} md={2.4}>
                    <StatCard count={stats.changes_requested} label="Требуют правок" icon={<ErrorOutlineIcon />} color="#FCA818" />
                </Grid>
                <Grid item xs={6} sm={4} md={2.4}>
                    <StatCard count={stats.accepted} label="Приняты" icon={<CheckCircleOutlineIcon />} color="#01CF0F" />
                </Grid>
                <Grid item xs={6} sm={4} md={2.4}>
                    <StatCard count={stats.rejected} label="Отклонены" icon={<HighlightOffIcon />} color="#D2060A" />
                </Grid>
                <Grid item xs={6} sm={4} md={2.4}>
                    <StatCard count={stats.withdrawn} label="Отозваны" icon={<ReplayIcon />} color={TEXT_GRAY} />
                </Grid>
            </Grid>

            {/* Filters Row */}
            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems={{ xs: 'flex-start', md: 'center' }} justifyContent="space-between" mb={3} gap={2}>
                <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
                    <Button variant="contained" sx={{ 
                        bgcolor: PRIMARY_BLUE, 
                        borderRadius: '30px', 
                        textTransform: 'none', 
                        fontFamily: "'Montserrat', sans-serif", 
                        fontWeight: 600,
                        fontSize: '14px',
                        height: '38px',
                        px: 3
                    }}>
                        Все
                    </Button>
                    {['На рассмотрении', 'Требуют правок', 'Приняты', 'Отклонены', 'Отозваны'].map(label => (
                        <Button key={label} sx={{ 
                            color: TEXT_GRAY, 
                            textTransform: 'none', 
                            fontFamily: "'Montserrat', sans-serif", 
                            fontWeight: 600, 
                            fontSize: '14px',
                            minWidth: 'auto',
                            p: 1,
                            '&:hover': { color: PRIMARY_BLUE } 
                        }}>
                            {label}
                        </Button>
                    ))}
                </Stack>

                <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap sx={{ mt: { xs: 2, md: 0 } }}>
                    <Button endIcon={<KeyboardArrowDownIcon />} sx={{ 
                        color: '#000', 
                        textTransform: 'none', 
                        fontFamily: "'Montserrat', sans-serif", 
                        fontWeight: 400,
                        fontSize: '14px',
                        bgcolor: '#FFFFFF',
                        boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)',
                        borderRadius: '30px',
                        height: '38px',
                        px: 2
                    }}>
                        Практика: все
                    </Button>
                    <Button endIcon={<KeyboardArrowDownIcon />} sx={{ 
                        color: '#000', 
                        textTransform: 'none', 
                        fontFamily: "'Montserrat', sans-serif", 
                        fontWeight: 400,
                        fontSize: '14px',
                        bgcolor: '#FFFFFF',
                        boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)',
                        borderRadius: '30px',
                        height: '38px',
                        px: 2
                    }}>
                        По обновлению
                    </Button>
                    <IconButton sx={{ 
                        bgcolor: '#FFFFFF', 
                        boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)',
                        width: '46px',
                        height: '38px',
                        borderRadius: '30px'
                    }}>
                        <FilterListIcon />
                    </IconButton>
                </Stack>
            </Box>

            {/* Search Bar */}
            <Box sx={{ 
                bgcolor: '#FFFFFF', 
                borderRadius: '20px', 
                boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)', 
                p: 0,
                height: '46px',
                display: 'flex', 
                alignItems: 'center',
                mb: 4 
            }}>
                <SearchIcon sx={{ color: TEXT_GRAY, ml: 2, mr: 1 }} />
                <InputBase 
                    placeholder="Поиск по ФИО студента или названию практики..." 
                    sx={{ width: '100%', fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: '14px', color: TEXT_GRAY }}
                />
            </Box>

            {/* Applications List Container */}
            <Box sx={{
                bgcolor: '#FFFFFF',
                borderRadius: '40px',
                boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)',
                p: '20px', 
                minHeight: '600px'
            }}>
                {applications.length === 0 ? (
                    <Typography sx={{ textAlign: 'center', color: TEXT_GRAY, mt: 4 }}>Заявок пока нет</Typography>
                ) : (
                    applications.map(app => (
                        <ApplicationCard key={app.id} app={app} />
                    ))
                )}
            </Box>
        </Box>
    );
};

export default ROPApplicationsPage;
