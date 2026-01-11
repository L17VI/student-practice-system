import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack, Paper, Grid, IconButton } from '@mui/material';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import userService from '../services/userService';

const DataRow = ({ label, value }) => (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={6}>
            <Typography variant="body1">
                {label}
            </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
            <Typography variant="body1" sx={{ fontWeight: '500' }}>
                {value || 'Не указано'}
            </Typography>
        </Grid>
    </Grid>
);

const FavoritePracticeCard = () => (
    <Box sx={{ p: 1 }}>
        <Paper
            sx={{
                width: '197px',
                height: '157px',
                background: '#FFFFFF',
                border: '1px solid #5D6BC4',
                borderRadius: '30px',
                mx: 'auto'
            }}
        />
    </Box>
);

const NextArrow = (props) => {
    const { onClick } = props;
    return (
        <IconButton
            onClick={onClick}
            sx={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'white',
                '&:hover': { bgcolor: 'white' }
            }}
        >
            <ChevronRight />
        </IconButton>
    );
}

const PrevArrow = (props) => {
    const { onClick } = props;
    return (
        <IconButton
            onClick={onClick}
            sx={{
                position: 'absolute',
                left: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 1,
                bgcolor: 'white',
                '&:hover': { bgcolor: 'white' }
            }}
        >
            <ChevronLeft />
        </IconButton>
    );
}

const AccountPage = () => {
    const [userData, setUserData] = useState({
        fullname: '',
        email: '',
        group: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await userService.getCurrentUser();
                setUserData(user);
            } catch (error) {
                console.error('Failed to fetch user data', error);
            }
        };

        fetchUserData();
    }, []);

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        swipe: false,
        draggable: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <Stack spacing={4}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: '700' }}>
                Личный кабинет
            </Typography>

            <Paper
                variant="outlined"
                sx={{
                    width: '100%',
                    p: { xs: 3, md: 4 },
                    borderRadius: '30px',
                    borderColor: '#5D6BC4',
                    boxShadow: '0px 4px 8px rgba(42, 50, 100, 0.1)',
                }}
            >
                <Stack spacing={4}>
                    <Typography variant="h5" component="p" sx={{ fontWeight: 'bold' }}>
                        {userData.fullname}
                    </Typography>

                    <Stack spacing={2}>
                        <DataRow label="Электронная почта:" value={userData.email} />
                        <DataRow label="Группа обучения:" value={userData.group} />
                    </Stack>
                </Stack>
            </Paper>

            <Box>
                <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Избранное
                </Typography>
                <Box sx={{
                    p: 3,
                    background: '#5D6BC4',
                    borderRadius: '30px',
                    boxShadow: '0px 1px 2px #FFFFFF, 0px 2px 6px 2px #2A3264',
                    position: 'relative'
                }}>
                    <Slider {...sliderSettings}>
                        <FavoritePracticeCard />
                        <FavoritePracticeCard />
                        <FavoritePracticeCard />
                        <FavoritePracticeCard />
                        <FavoritePracticeCard />
                    </Slider>
                </Box>
            </Box>
        </Stack>
    );
};

export default AccountPage;
