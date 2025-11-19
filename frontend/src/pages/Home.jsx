import { Box, Typography, Stack, Grid, useTheme, useMediaQuery, Button } from '@mui/material';
import PartnersCarousel from '../components/PartnersCarousel';

const HeroSection = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box sx={{
            width: '100%',
            backgroundColor: '#5d6bc4',
            borderRadius: '16px',
            overflow: 'hidden',
        }}>
            <Grid container alignItems="center">
                <Grid item xs={12} md={7} sx={{ p: { xs: 3, md: 4 } }}>
                    <Box>
                        <Typography variant={isMobile ? "h5" : "h4"} component="h1" sx={{ color: '#FFFFFF', fontWeight: 'bold', lineHeight: 1.2 }}>
                            Наш сервис —
                        </Typography>
                        <Typography variant={isMobile ? "h6" : "h5"} component="span" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                            полигон для амбиций
                        </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', mt: 2 }}>
                        Студенты погружаются в реальные проекты от настоящих компаний, а работодатели находят таланты.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={5} sx={{
                    display: { xs: 'none', md: 'flex' },
                    minHeight: '143px',
                    background: 'rgba(0, 0, 0, 0.1)',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Typography sx={{ color: 'rgba(255,255,255,0.5)' }}>
                        Фото
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

const TopCompaniesSection = () => (
    <Box sx={{
        width: '100%',
        minHeight: '272px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #5d6bc4',
        borderRadius: '16px',
        py: { xs: 4, md: '68px' },
        px: { xs: 2, md: 0 },
    }}>
        <Grid container spacing={{ xs: 2, md: '21px' }} justifyContent="center">
            {[1, 2, 3].map((item) => (
                <Grid item key={item} xs={12} sm={6} md="auto">
                    <Box sx={{
                        width: '195px',
                        height: '183px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #5d6bc4',
                        borderRadius: '16px',
                        mx: 'auto',
                    }} />
                </Grid>
            ))}
        </Grid>
    </Box>
);

const ProfessionsSection = () => (
    <Box sx={{
        width: '100%',
        minHeight: '274px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
        backgroundColor: '#FFFFFF',
        border: '1px solid #5d6bc4',
        borderRadius: '16px',
    }}>
        <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 4 }}>
            Отрасли профессий
        </Typography>
        <Stack spacing={1.5} sx={{ width: '100%', maxWidth: '628px' }}>
            <Button variant="contained" sx={{ height: '50px', borderRadius: '12px', bgcolor: '#5d6bc4', '&:hover': { bgcolor: '#4a56a1' } }}>
                Классические и фундаментальные
            </Button>
            <Button variant="contained" sx={{ height: '50px', borderRadius: '12px', bgcolor: '#5d6bc4', '&:hover': { bgcolor: '#4a56a1' } }}>
                Современные и цифровые
            </Button>
            <Button variant="contained" sx={{ height: '50px', borderRadius: '12px', bgcolor: '#5d6bc4', '&:hover': { bgcolor: '#4a56a1' } }}>
                Творческие и социальные
            </Button>
        </Stack>
    </Box>
);

export const Home = () => {
    return (
        <Stack spacing="24px" alignItems="center">
            <HeroSection />
            <TopCompaniesSection />
            <Box sx={{ 
                width: '100%', 
                mt: '18px !important',
                border: '1px solid #5d6bc4',
                borderRadius: '16px',
                overflow: 'hidden', // To contain the carousel
            }}>
                <PartnersCarousel />
            </Box>
            <Box sx={{ width: '100%', mt: '182px !important' }}>
                <ProfessionsSection />
            </Box>
        </Stack>
    );
};

export default Home;
