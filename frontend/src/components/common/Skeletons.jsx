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

export const ApplicationListSkeleton = () => {
    return (
        <Box sx={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 0' }}>
            <Skeleton variant="text" width={250} height={50} sx={{ mb: 1 }} />
            <Skeleton variant="text" width={400} height={24} sx={{ mb: 4 }} />

            {/* Stats */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
                {[...Array(5)].map((_, i) => (
                    <Grid item xs={12} sm={6} md={2.4} key={i}>
                        <Skeleton variant="rounded" height={80} sx={{ borderRadius: '16px' }} />
                    </Grid>
                ))}
            </Grid>

            {/* Filters */}
            <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} variant="rounded" width={100} height={36} sx={{ borderRadius: '20px' }} />
                ))}
            </Box>

            {/* Search */}
            <Skeleton variant="rounded" height={56} sx={{ borderRadius: '16px', mb: 4 }} />

            {/* List */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} variant="rounded" height={140} sx={{ borderRadius: '24px' }} />
                ))}
            </Box>
        </Box>
    );
};

export const ApplicationDetailSkeleton = () => {
    return (
        <Box sx={{ maxWidth: '900px', margin: '0 auto', padding: '40px 0' }}>
            <Skeleton variant="text" width={150} height={24} sx={{ mb: 3 }} />
            
            <Skeleton variant="text" width={200} height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" width={300} height={40} sx={{ mb: 1 }} />
            <Skeleton variant="text" width={400} height={24} sx={{ mb: 4 }} />

            {/* Main Card */}
            <Skeleton variant="rounded" height={200} sx={{ borderRadius: '16px', mb: 3 }} />

            {/* Info Card */}
            <Skeleton variant="rounded" height={300} sx={{ borderRadius: '16px', mb: 3 }} />
        </Box>
    );
};
