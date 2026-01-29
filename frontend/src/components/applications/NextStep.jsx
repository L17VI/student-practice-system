import React from 'react';
import { Paper, Typography, Box, Button, Alert } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const NextStep = () => {
    return (
        <Paper 
            elevation={0} 
            sx={{ 
                p: 4, 
                mb: 3, 
                borderRadius: '40px', 
                boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.15)' 
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
                Следующий шаг
            </Typography>

            <Alert severity="warning" sx={{ mb: 2, borderRadius: '20px' }}>
                Нужны правки: проверьте комментарий руководителя и обновите документы.
            </Alert>

            <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    fontWeight: 'bold',
                    borderRadius: '30px',
                    textTransform: 'none',
                    px: 3,
                    py: 1,
                    '&:hover': { bgcolor: 'primary.dark' },
                }}
            >
                Исправить и отправить
            </Button>
        </Paper>
    );
};

export default NextStep;