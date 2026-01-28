import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const PRIMARY_BLUE = '#006DB2';

const CompanyCard = ({ company }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/company/${company.name}`);
    };

    return (
        <Box
            onClick={handleCardClick}
            sx={{
                background: '#FFFFFF',
                borderRadius: '40px',
                boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.15)',
                padding: '30px',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                boxSizing: 'border-box',
                position: 'relative',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'translateY(-5px)',
                }
            }}
        >
            {/* Header */}
            <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Box sx={{ 
                    width: 60, 
                    height: 60, 
                    bgcolor: '#F6F6F6', 
                    borderRadius: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: PRIMARY_BLUE
                }}>
                    <BusinessIcon fontSize="large" />
                </Box>
                <Box>
                    <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '20px', lineHeight: 1.2 }}>
                        {company.name}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={0.5} mt={0.5}>
                        <LocationOnIcon sx={{ fontSize: 16, color: '#A3A8C9' }} />
                        <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontSize: '14px', color: '#A3A8C9' }}>
                            {company.city}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: '16px', color: '#000' }}>
                        {company.practices.length} вакансий
                    </Typography>
                    <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontSize: '12px', color: '#A3A8C9' }}>
                        Всего мест: {company.practices.reduce((acc, p) => acc + p.total_seats, 0)}
                    </Typography>
                </Box>
                
                <Button 
                    variant="contained" 
                    sx={{ 
                        borderRadius: '30px', 
                        minWidth: '50px', 
                        height: '50px', 
                        p: 0,
                        bgcolor: PRIMARY_BLUE,
                        '&:hover': { bgcolor: '#005a9e' }
                    }}
                >
                    <ArrowForwardIcon />
                </Button>
            </Box>
        </Box>
    );
};

export default CompanyCard;
