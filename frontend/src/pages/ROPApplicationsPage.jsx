import React from 'react';
import { Box, Typography, Button, Grid, IconButton, InputBase, Stack, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ReplayIcon from '@mui/icons-material/Replay';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const PRIMARY_BLUE = '#006DB2';
const TEXT_GRAY = '#7C7C7C';

// Data from CSS
const applications = [
    {
        id: 1,
        name: 'Петров Петр Петрович',
        type: 'Производственная практика',
        details: 'ООО “ТехноСофт” Москва Очно 01.02.2026 - 28.02.2026',
        status: 'new',
        updated: '24.01.2026'
    },
    {
        id: 2,
        name: 'Сидоров Илья Андреевич',
        type: 'Производственная практика',
        details: 'ПАО “Сбер” Москва Очно 01.02.2026 - 28.02.2026',
        status: 'accepted',
        updated: '20.01.2026'
    },
    {
        id: 3,
        name: 'Кузнецова Анна Владимировна',
        type: 'Учебная практика',
        details: 'ООО “Веб-Студия” Казань Удаленно 10.01.2026 - 10.02.2026',
        status: 'rejected',
        updated: '18.01.2026'
    },
    {
        id: 4,
        name: 'Орлов Денис Игоревич',
        type: 'Производственная практика',
        details: 'ООО “Инновации” Новосибирск Очно 01.03.2026 - 31.03.2026',
        status: 'withdrawn',
        updated: '15.01.2026'
    },
    {
        id: 5,
        name: 'Смирнова Елена Дмитриевна',
        type: 'Преддипломная практика',
        details: 'ООО “АйТи Лаб” Екатеринбург Гибрид 20.02.2026 - 20.04.2026',
        status: 'review',
        updated: '22.01.2026'
    },
    {
        id: 6,
        name: 'Козлов Максим Николаевич',
        type: 'Производственная практика',
        details: 'ООО “ДатаПро” Москва Очно 01.02.2026 - 28.02.2026',
        status: 'review',
        updated: '21.01.2026'
    },
    {
        id: 7,
        name: 'Новикова Ольга Александровна',
        type: 'Учебная практика',
        details: 'ООО “Кодекс” Ростов-на-Дону Удаленно 15.01.2026 - 15.02.2026',
        status: 'review',
        updated: '19.01.2026'
    }
];

const statusConfig = {
    new: { label: 'Новая', color: PRIMARY_BLUE, bgcolor: 'rgba(0, 109, 178, 0.19)', border: '#006DB2' },
    review: { label: 'На рассмотрении', color: PRIMARY_BLUE, bgcolor: 'rgba(0, 109, 178, 0.35)', border: '#006DB2' },
    accepted: { label: 'Принята', color: '#08A600', bgcolor: 'rgba(8, 166, 0, 0.26)', border: '#08A600' },
    rejected: { label: 'Отклонена', color: '#D2060A', bgcolor: 'rgba(210, 6, 10, 0.36)', border: '#D2060A' },
    withdrawn: { label: 'Отозвана', color: TEXT_GRAY, bgcolor: 'rgba(124, 124, 124, 0.27)', border: '#7C7C7C' },
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
        height: '100%', // Fill grid item height
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
    const status = statusConfig[app.status];

    return (
        <Box sx={{
            bgcolor: '#FFFFFF',
            p: { xs: 2, sm: '20px' },
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' }, // Stack on mobile
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' }, // Align center on desktop
            borderBottom: '1px solid #7C7C7C',
            '&:last-child': {
                borderBottom: 'none'
            },
            gap: { xs: 2, sm: 0 }
        }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '20px', lineHeight: '24px', color: '#000' }}>
                    {app.name}
                </Typography>
                <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: '15px', lineHeight: '18px', color: '#000' }}>
                    {app.type}
                </Typography>
                <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                    <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: '11px', lineHeight: '13px', color: TEXT_GRAY }}>
                        {app.details}
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'row', sm: 'column' }, 
                justifyContent: 'space-between', 
                alignItems: { xs: 'center', sm: 'flex-end' }, 
                width: { xs: '100%', sm: 'auto' },
                gap: 1
            }}>
                <Box sx={{
                    bgcolor: status.bgcolor,
                    border: `0.5px solid ${status.border}`,
                    borderRadius: '15px',
                    px: 1.5,
                    height: '27px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: '13px', color: status.color }}>
                        {status.label}
                    </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: '11px', color: TEXT_GRAY, display: { xs: 'none', sm: 'block' } }}>
                        Обновлено: {app.updated}
                    </Typography>

                    <Button 
                        variant="contained" 
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
    return (
        <Box sx={{ width: '100%', padding: '40px 0 80px 0' }}>
            <Typography variant="h1" sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: { xs: '28px', md: '32px' }, mb: 1 }}>
                Заявки
            </Typography>
            <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontSize: { xs: '16px', md: '20px' }, color: TEXT_GRAY, mb: 4 }}>
                Просматривайте заявки по закрепленным практикам и принимайте решения
            </Typography>

            {/* Stats Row - Responsive Grid */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={6} sm={4} md={2}>
                    <StatCard count={2} label="Новые" icon={<AccessTimeIcon />} color={PRIMARY_BLUE} />
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                    <StatCard count={6} label="На рассмотрении" icon={<AccessTimeIcon />} color={PRIMARY_BLUE} />
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                    <StatCard count={2} label="Требуют правок" icon={<ErrorOutlineIcon />} color="#FCA818" />
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                    <StatCard count={3} label="Приняты" icon={<CheckCircleOutlineIcon />} color="#01CF0F" />
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                    <StatCard count={1} label="Отклонены" icon={<HighlightOffIcon />} color="#D2060A" />
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                    <StatCard count={1} label="Отозваны" icon={<ReplayIcon />} color={TEXT_GRAY} />
                </Grid>
            </Grid>

            {/* Filters Row - Responsive Flex */}
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
                    {['Новые', 'На рассмотрении', 'Требуют правок', 'Приняты', 'Отклонены', 'Отозваны'].map(label => (
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
                p: { xs: 2, md: '20px' },
                minHeight: '600px'
            }}>
                {applications.map(app => (
                    <ApplicationCard key={app.id} app={app} />
                ))}
            </Box>
        </Box>
    );
};

export default ROPApplicationsPage;
