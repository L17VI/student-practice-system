import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ApplicationCard from '../components/applications/ApplicationCard';
import NextStep from '../components/applications/NextStep';
import Comments from '../components/applications/Comments';
import Documents from '../components/applications/Documents';
import ApplicationInfo from '../components/applications/ApplicationInfo';
import StatusHistory from '../components/applications/StatusHistory';
import { ApplicationDetailSkeleton } from '../components/common/Skeletons';

const ApplicationDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplication = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get(`/api/applications/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setApplication(response.data);
            } catch (error) {
                console.error("Error fetching application:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchApplication();
    }, [id, navigate]);

    if (loading) {
        return <ApplicationDetailSkeleton />;
    }

    if (!application) {
        return <Typography sx={{ textAlign: 'center', mt: 4 }}>Заявка не найдена</Typography>;
    }

    return (
        <Box sx={{ maxWidth: '900px', margin: '0 auto', padding: '40px 0', fontFamily: "'Montserrat', sans-serif" }}>
            <ApplicationCard application={application} />
            {/* Пока скрываем компоненты, для которых нет данных на бэкенде */}
            {/* <NextStep /> */}
            {/* <Comments /> */}
            {/* <Documents /> */}
            <ApplicationInfo application={application} />
            {/* <StatusHistory /> */}
        </Box>
    );
};

export default ApplicationDetailPage;