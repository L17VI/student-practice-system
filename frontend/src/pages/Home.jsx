import { Box, Typography } from '@mui/material';

export const Home = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{
            width: '845px',
            height: '143px',
            backgroundColor: '#5d6bc4', // Light blue color from header
            borderRadius: '16px', // Same rounded corners
            display: 'flex',
            alignItems: 'flex-start',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Text Content */}
            <Box sx={{
                pt: '12px',
                pl: '25px',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Box sx={{ width: '259px', height: '72px' }}>
                    {/* Title split into two lines */}
                    <Typography variant="h4" component="h1" sx={{ color: '#FFFFFF', fontWeight: 'bold', lineHeight: 1.2 }}>
                        Наш сервис —
                    </Typography>
                    <Typography variant="h5" component="span" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                        полигон для амбиций
                    </Typography>
                </Box>
                <Box sx={{ width: '387px', height: '36px', mt: '2px' }}>
                    <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                        Студенты погружаются в реальные проекты от настоящих компаний, а работодатели находят таланты
                    </Typography>
                </Box>
            </Box>

            {/* Image Placeholder */}
            <Box sx={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: 'calc(845px - 259px - 25px)', // Calculate remaining space
                backgroundColor: 'rgba(0, 0, 0, 0.1)', // Placeholder color
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Typography sx={{ color: 'rgba(255,255,255,0.5)' }}>
                    Фото
                </Typography>
            </Box>
        </Box>
    </Box>
);

export default Home;
