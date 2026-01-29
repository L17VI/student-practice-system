import React from 'react';
import { Box, Skeleton, Grid, Stack } from '@mui/material';

export const CardSkeleton = () => {
    return (
        <Box
            sx={{
                background: '#FFFFFF',
                borderRadius: '40px',
                boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.05)',
                padding: '30px',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                boxSizing: 'border-box',
                position: 'relative',
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                <Skeleton variant="text" width="70%" height={40} sx={{ borderRadius: '10px' }} />
            </Box>

            {/* Tags */}
            <Box sx={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
                <Skeleton variant="rounded" width={100} height={30} sx={{ borderRadius: '40px' }} />
                <Skeleton variant="rounded" width={80} height={30} sx={{ borderRadius: '40px' }} />
            </Box>

            {/* Company Info */}
            <Box sx={{ marginBottom: 'auto' }}>
                <Skeleton variant="text" width="50%" height={24} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="40%" height={20} />
            </Box>

            {/* Status */}
            <Skeleton variant="text" width="60%" height={24} sx={{ mt: 2, mb: 2 }} />

            {/* Actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '15px' }}>
                <Skeleton variant="rounded" width="100%" height={45} sx={{ borderRadius: '40px' }} />
                <Skeleton variant="circular" width={45} height={45} />
            </Box>
        </Box>
    );
};

export const CompanyCardSkeleton = () => {
    return (
        <Box
            sx={{
                background: '#FFFFFF',
                borderRadius: '40px',
                boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.05)',
                padding: '30px',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                boxSizing: 'border-box',
            }}
        >
            {/* Header */}
            <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Skeleton variant="rounded" width={60} height={60} sx={{ borderRadius: '15px' }} />
                <Box sx={{ width: '100%' }}>
                    <Skeleton variant="text" width="80%" height={30} />
                    <Skeleton variant="text" width="50%" height={20} sx={{ mt: 0.5 }} />
                </Box>
            </Box>

            <Skeleton variant="text" width="60%" height={24} sx={{ mb: 2 }} />

            {/* List of Practices */}
            <Stack spacing={1.5} sx={{ mb: 'auto' }}>
                <Skeleton variant="rounded" width="100%" height={50} sx={{ borderRadius: '15px' }} />
                <Skeleton variant="rounded" width="100%" height={50} sx={{ borderRadius: '15px' }} />
                <Skeleton variant="rounded" width="100%" height={50} sx={{ borderRadius: '15px' }} />
            </Stack>

            {/* Footer */}
            <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #F0F0F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Skeleton variant="text" width="40%" height={20} />
                <Skeleton variant="rounded" width={50} height={50} sx={{ borderRadius: '30px' }} />
            </Box>
        </Box>
    );
};

export const PracticePageSkeleton = () => {
    return (
        <Box sx={{ maxWidth: '1147px', margin: '0 auto', padding: '40px 0 80px 0' }}>
            <Skeleton variant="text" width={200} height={30} sx={{ mb: 4 }} />

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 360px' },
                gap: '40px',
                alignItems: 'start'
            }}>
                {/* Left Column */}
                <Box sx={{
                    bgcolor: '#FFFFFF',
                    borderRadius: '40px',
                    boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.05)',
                    padding: '50px'
                }}>
                    <Skeleton variant="text" width="80%" height={60} sx={{ mb: 2 }} />
                    
                    <Box sx={{ display: 'flex', gap: '12px', mb: 5, flexWrap: 'wrap' }}>
                        <Skeleton variant="rounded" width={120} height={36} sx={{ borderRadius: '40px' }} />
                        <Skeleton variant="rounded" width={120} height={36} sx={{ borderRadius: '40px' }} />
                        <Skeleton variant="rounded" width={100} height={36} sx={{ borderRadius: '40px' }} />
                    </Box>

                    <Skeleton variant="text" width="100%" height={1} sx={{ my: 4 }} />

                    <Box sx={{ mb: 5 }}>
                        <Skeleton variant="text" width="40%" height={30} sx={{ mb: 2 }} />
                        <Skeleton variant="text" width="100%" height={20} />
                        <Skeleton variant="text" width="100%" height={20} />
                        <Skeleton variant="text" width="90%" height={20} />
                        <Skeleton variant="text" width="95%" height={20} />
                    </Box>
                </Box>

                {/* Right Column */}
                <Box sx={{
                    bgcolor: '#FFFFFF',
                    borderRadius: '40px',
                    boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.05)',
                    padding: '30px',
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, pb: 3 }}>
                        <Skeleton variant="rounded" width={50} height={50} sx={{ borderRadius: '12px' }} />
                        <Box sx={{ width: '100%' }}>
                            <Skeleton variant="text" width="70%" height={24} />
                            <Skeleton variant="text" width="50%" height={16} />
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                        <Skeleton variant="circular" width={8} height={8} />
                        <Skeleton variant="text" width="60%" height={20} />
                    </Box>

                    <Stack spacing={1.5}>
                        <Skeleton variant="rounded" width="100%" height={45} sx={{ borderRadius: '40px' }} />
                        <Skeleton variant="rounded" width="100%" height={45} sx={{ borderRadius: '40px' }} />
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
};
