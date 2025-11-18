import { Box, Typography, Grid, useTheme, useMediaQuery } from '@mui/material';

export const Home = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box sx={{ 
            backgroundColor: '#5d6bc4',
            borderRadius: '16px',
            display: 'flex',
            overflow: 'hidden',
            flexDirection: { xs: 'column', md: 'row' }, // Stack on mobile, row on desktop
        }}>
            <Grid container>
                {/* Text Content */}
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

                {/* Image Placeholder */}
                <Grid item xs={12} md={5} sx={{ 
                    minHeight: '200px',
                    background: 'rgba(0, 0, 0, 0.1)',
                    display: 'flex',
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

export default Home;
