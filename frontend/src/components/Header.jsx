import React from 'react';
import {
    Box,
    Typography,
    Link as MuiLink,
    Stack,
    Paper
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

// --- Constants ---
const PRIMARY_BLUE = '#006DB2';
const TEXT_GREY = '#A3A8C9';
const BG_GREY = '#F6F6F6';

// --- Logo Component ---
const Logo = ({ theme = 'light' }) => {
    const isDark = theme === 'dark';
    
    // Colors based on theme
    const iconBg = isDark ? '#FFFFFF' : PRIMARY_BLUE;
    const iconColor = isDark ? PRIMARY_BLUE : '#FFFFFF';
    const textColor = isDark ? '#FFFFFF' : PRIMARY_BLUE;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }} component={Link} to="/">
            {/* Icon */}
            <Box
                sx={{
                    width: '40px',
                    height: '38px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: iconBg,
                    color: iconColor,
                    fontFamily: "'Kreon', serif",
                    fontWeight: 500,
                    fontSize: '20px',
                }}
            >
                П
            </Box>
            
            {/* Text */}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                    component="span"
                    sx={{
                        fontFamily: "'Kreon', serif",
                        fontWeight: 500,
                        fontSize: '14px',
                        lineHeight: '18px',
                        textTransform: 'uppercase',
                        color: textColor,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <span>Профи</span>
                    <span>Практик</span>
                </Typography>
                <Typography
                    component="span"
                    sx={{
                        fontFamily: "'Kreon', serif",
                        fontSize: '6px',
                        marginTop: '2px',
                        color: textColor,
                    }}
                >
                    profprac.ru
                </Typography>
            </Box>
        </Box>
    );
};

// --- Header Component ---
export function Header({ isAuthenticated }) {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <Box component="header" sx={{ width: '100%', display: 'flex', justifyContent: 'center', pt: '20px', px: 2 }}>
            <Paper
                elevation={0}
                sx={{
                    width: '100%',
                    maxWidth: '1147px',
                    height: '107px',
                    bgcolor: '#FFFFFF',
                    borderRadius: '40px',
                    boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.25)',
                    padding: '0 48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                {/* Left: Logo */}
                <Logo theme="light" />

                {/* Right: Nav */}
                <Stack component="nav" direction="row" spacing={'40px'} alignItems="center">
                    <MuiLink
                        component={Link}
                        to="/"
                        underline="none"
                        sx={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontSize: '16px',
                            color: PRIMARY_BLUE,
                            fontWeight: isActive('/') ? 700 : 400,
                            position: 'relative',
                            '&::after': isActive('/') ? {
                                content: '""',
                                position: 'absolute',
                                width: '100%',
                                height: '2px',
                                background: PRIMARY_BLUE,
                                bottom: '-4px',
                                left: 0,
                            } : {},
                        }}
                    >
                        Каталог
                    </MuiLink>
                    <MuiLink
                        component={Link}
                        to={isAuthenticated ? "/account" : "/login"}
                        underline="none"
                        sx={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontSize: '16px',
                            color: PRIMARY_BLUE,
                            fontWeight: isActive('/account') ? 700 : 400,
                            position: 'relative',
                            '&::after': isActive('/account') ? {
                                content: '""',
                                position: 'absolute',
                                width: '100%',
                                height: '2px',
                                background: PRIMARY_BLUE,
                                bottom: '-4px',
                                left: 0,
                            } : {},
                        }}
                    >
                        Личный кабинет
                    </MuiLink>
                </Stack>
            </Paper>
        </Box>
    );
}

// --- Footer Component ---
export function Footer() {
    return (
        <Box component="footer" sx={{ width: '100%', display: 'flex', justifyContent: 'center', px: 2, pb: '40px', mt: 'auto' }}>
            <Box
                sx={{
                    width: '100%',
                    maxWidth: '1147px',
                    bgcolor: PRIMARY_BLUE,
                    borderRadius: '40px',
                    padding: '40px 60px 25px 60px', // Updated padding
                    minHeight: '237px', // Updated min-height
                    color: '#FFFFFF',
                    display: 'flex',
                    flexDirection: 'column', // Flex column layout
                    justifyContent: 'space-between',
                }}
            >
                {/* 1. Top Floor: Logo + Menu */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', mb: '30px' }}>
                    
                    {/* Column 1: Logo */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '150px' }}>
                        <Logo theme="dark" />
                    </Box>

                    {/* Column 2: Industries */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontSize: '16px', fontWeight: 400, mb: '8px', color: '#FFFFFF' }}>
                            Отрасли профессий
                        </Typography>
                        {['Классические и фундаментальные', 'Современные и цифровые', 'Творческие и социальные'].map(text => (
                            <MuiLink key={text} href="#" underline="none" sx={{ fontFamily: "'Montserrat', sans-serif", fontSize: '12px', color: TEXT_GREY, transition: 'color 0.2s', lineHeight: 1.4, '&:hover': { color: '#FFFFFF' } }}>
                                {text}
                            </MuiLink>
                        ))}
                    </Box>

                    {/* Column 3: Contact */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontSize: '16px', fontWeight: 400, mb: '8px', color: '#FFFFFF' }}>
                            Связь с нами
                        </Typography>
                        {['Чат поддержки', 'Почта', 'Социальные сети'].map(text => (
                            <MuiLink key={text} href="#" underline="none" sx={{ fontFamily: "'Montserrat', sans-serif", fontSize: '12px', color: TEXT_GREY, transition: 'color 0.2s', lineHeight: 1.4, '&:hover': { color: '#FFFFFF' } }}>
                                {text}
                            </MuiLink>
                        ))}
                    </Box>

                    {/* Column 4: Personal Data */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontSize: '16px', fontWeight: 400, mb: '8px', color: '#FFFFFF' }}>
                            Личные данные
                        </Typography>
                        <MuiLink href="#" underline="none" sx={{ fontFamily: "'Montserrat', sans-serif", fontSize: '12px', color: TEXT_GREY, transition: 'color 0.2s', lineHeight: 1.4, '&:hover': { color: '#FFFFFF' } }}>
                            Аккаунт
                        </MuiLink>
                    </Box>
                </Box>

                {/* 2. Middle Floor: Divider */}
                <Box sx={{
                    width: '100%',
                    height: '1px',
                    background: 'rgba(255, 255, 255, 0.3)',
                    marginBottom: '20px',
                }} />

                {/* 3. Bottom Floor: Copyright */}
                <Typography sx={{ fontFamily: "'Kreon', serif", fontSize: '10px', color: '#5D6BC4' }}>
                    profprac.ru
                </Typography>
            </Box>
        </Box>
    );
}
