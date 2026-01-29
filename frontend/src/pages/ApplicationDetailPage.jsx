import React from 'react';
import { Box } from '@mui/material';
import ApplicationCard from '../components/applications/ApplicationCard';
import NextStep from '../components/applications/NextStep';
import Comments from '../components/applications/Comments';
import Documents from '../components/applications/Documents';
import ApplicationInfo from '../components/applications/ApplicationInfo';
import StatusHistory from '../components/applications/StatusHistory';

const ApplicationDetailPage = () => {
    return (
        <Box sx={{ maxWidth: '900px', margin: '0 auto', padding: '40px 0', fontFamily: "'Montserrat', sans-serif" }}>
            <ApplicationCard />
            <NextStep />
            <Comments />
            <Documents />
            <ApplicationInfo />
            <StatusHistory />
        </Box>
    );
};

export default ApplicationDetailPage;