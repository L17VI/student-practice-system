import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const TimelineItem = ({ title, date, color, isLast }) => (
    <Box sx={{ display: 'flex', gap: 2, position: 'relative' }}>
        {/* Line */}
        {!isLast && (
            <Box
                sx={{
                    position: 'absolute',
                    left: 9,
                    top: 24,
                    bottom: -24,
                    width: 2,
                    bgcolor: 'grey.200',
                    zIndex: 0,
                }}
            />
        )}
        
        {/* Dot */}
        <Box
            sx={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                bgcolor: color,
                border: '4px solid white',
                boxShadow: 1,
                zIndex: 1,
                mt: 0.5,
                flexShrink: 0,
            }}
        />
        
        {/* Content */}
        <Box sx={{ pb: 3 }}>
            <Typography variant="body2" sx={{ fontWeight: 'medium', color: 'text.primary' }}>
                {title}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {date}
            </Typography>
        </Box>
    </Box>
);

const StatusHistory = () => {
    return (
        <Paper 
            elevation={0} 
            sx={{ 
                p: 4, 
                mb: 4, 
                borderRadius: '40px', 
                boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.15)' 
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <AccessTimeIcon sx={{ color: 'text.secondary' }} />
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    История статусов
                </Typography>
            </Box>

            <Box sx={{ pl: 1 }}>
                <TimelineItem
                    title="Заявка создана"
                    date="10.01.2026, 10:30"
                    color="grey.400"
                />
                <TimelineItem
                    title="На рассмотрении"
                    date="10.01.2026, 10:32"
                    color="primary.main"
                />
                <TimelineItem
                    title="Комментарий руководителя"
                    date="12.01.2026, 14:15"
                    color="grey.400"
                />
                <TimelineItem
                    title="Требуют правок"
                    date="12.01.2026, 14:15"
                    color="warning.main"
                    isLast
                />
            </Box>
        </Paper>
    );
};

export default StatusHistory;