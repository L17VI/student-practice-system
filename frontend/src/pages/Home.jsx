import { Box, Typography, Stack, Grid, useTheme, useMediaQuery } from '@mui/material';

const HeroSection = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box sx={{
            maxWidth: '845px',
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
        maxWidth: '845px',
        width: '100%',
        minHeight: '272px',
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
        borderRadius: '16px',
        py: { xs: 4, md: 0 },
        pt: { md: '68px' },
        pb: { md: '21px' },
        px: { xs: 2, md: 0 },
    }}>
        <Grid container spacing={{ xs: 2, md: '21px' }} justifyContent="center">
            {[1, 2, 3].map((item) => (
                <Grid item key={item} xs={12} sm={6} md="auto">
                    <Box sx={{
                        width: '195px',
                        height: '183px',
                        backgroundColor: 'rgba(0, 0, 0, 0.08)',
                        borderRadius: '16px',
                        mx: 'auto',
                    }} />
                </Grid>
            ))}
        </Grid>
    </Box>
);

export const Home = () => {
    return (
        <Stack spacing="24px" alignItems="center">
            <HeroSection />
            <TopCompaniesSection />
        </Stack>
    );
};

export default Home;
