import React from 'react';
import { Box, Typography } from '@mui/material';

const PartnerLogo = ({ id, itemWidth }) => (
    <Box sx={{
        height: '60px',
        width: `${itemWidth}px`,
        minWidth: `${itemWidth}px`, // Prevent shrinking in flex container
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
    const duplicatedPartners = [...partners, ...partners]; // Duplicate for seamless loop

    const itemWidth = 120; // Define a clear width for each logo
    const gap = 32; // Define a clear gap between logos

    // The total distance the animation needs to travel
    // This is the width of the original set of partners including their gaps
    const scrollDistance = partners.length * (itemWidth + gap);

    // The total width of the container holding the duplicated logos
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
