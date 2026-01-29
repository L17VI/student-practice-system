import React from 'react';
import { Paper, Typography, Box, Grid } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';

const ApplicationInfo = ({ application }) => {
    if (!application) return null;

    const { practice, user } = application;

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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <DescriptionIcon sx={{ color: 'text.secondary' }} />
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    Данные заявки
                </Typography>
            </Box>

            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                        Период
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'medium', color: 'text.primary' }}>
                        {practice.season}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                        Формат
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'medium', color: 'text.primary' }}>
                        {practice.format}
                    </Typography>
                </Grid>
            </Grid>

            <Box sx={{ mb: 3 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                    Контакты
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 'medium', color: 'text.primary' }}>
                    {user.email}
                </Typography>
            </Box>

            <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                    Комментарий студента
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.primary' }}>
                    {application.cover_letter || 'Комментарий не был оставлен.'}
                </Typography>
            </Box>
        </Paper>
    );
};

export default ApplicationInfo;