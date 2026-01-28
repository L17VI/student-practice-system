import React from 'react';
import { Box, Typography } from '@mui/material';

const ApplicationsPage = () => {
    return (
        <Box sx={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 0' }}>
            <Typography variant="h1" sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: '36px', margin: '0 0 10px 0', color: '#000000' }}>
                Мои заявки
            </Typography>
            <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontSize: '16px', color: '#A3A8C9' }}>
                Здесь будут отображаться ваши заявки на практику.
            </Typography>
        </Box>
    );
};

export default ApplicationsPage;
