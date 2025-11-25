import React from 'react';
import { Box, Typography } from '@mui/material';

const PartnerLogo = ({ id, itemWidth }) => (
    <Box sx={{
        height: '60px',
        width: `${itemWidth}px`,
        minWidth: `${itemWidth}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #5d6bc4',
        borderRadius: '16px',
    }}>
        <Typography color="text.secondary" sx={{ opacity: 0.6 }}>Лого {id}</Typography>
    </Box>
);

const PartnersCarousel = () => {
    const partners = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const duplicatedPartners = [...partners, ...partners];

    const itemWidth = 120;
    const gap = 32;

    const scrollDistance = partners.length * (itemWidth + gap);

    const containerWidth = duplicatedPartners.length * (itemWidth + gap);

    const scrollAnimation = {
        '@keyframes scroll': {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: `translateX(-${scrollDistance}px)` },
        },
    };

    return (
        <Box sx={{
            width: '100%',
            py: 2,
            overflow: 'hidden',
            ...scrollAnimation,
        }}>
            <Box sx={{
                display: 'flex',
                width: `${containerWidth}px`,
                gap: `${gap}px`,
                animation: 'scroll 40s linear infinite',
            }}>
                {duplicatedPartners.map((id, index) => (
                    <PartnerLogo key={index} id={id} itemWidth={itemWidth} />
                ))}
            </Box>
        </Box>
    );
};

export default PartnersCarousel;
