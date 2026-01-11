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

// --- Logo Component ---
const Logo = ({ theme = 'light', role }) => {
    const isDark = theme === 'dark';
    
    const iconBg = isDark ? '#FFFFFF' : PRIMARY_BLUE;
    const iconColor = isDark ? PRIMARY_BLUE : '#FFFFFF';
    const textColor = isDark ? '#FFFFFF' : PRIMARY_BLUE;

    // Determine home link based on role
    const homeLink = role === 'rop' ? '/rop/applications' : '/';

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', cursor: 'pointer' }} component={Link} to={homeLink}>
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
                    flexShrink: 0
                }}
            >
                П
            </Box>
            
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'column' }}>
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
export function Header({ isAuthenticated, role }) {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    // Ссылки для студента (по умолчанию)
    let navLinks = [
        { label: 'Каталог', path: '/' },
        { label: 'Мои заявки', path: '/applications' },
    ];

    // Ссылки для руководителя (ROP)
    if (role === 'rop') {
        navLinks = [
            { label: 'Входящие заявки', path: '/rop/applications' },
            { label: 'Список студентов', path: '/rop/students' },
        ];
    }
    
    // Ссылки для админа (видит всё)
    if (role === 'admin') {
        navLinks = [
            { label: 'Каталог', path: '/' },
            { label: 'Мои заявки', path: '/applications' },
            { label: 'Входящие заявки', path: '/rop/applications' },
            { label: 'Список студентов', path: '/rop/students' },
        ];
    }

    return (
        <Box component="header" sx={{ width: '100%', display: 'flex', justifyContent: 'center', pt: '20px', px: { xs: 2, md: 0 } }}>
            <Paper
                elevation={0}
                sx={{
                    width: '100%',
                    maxWidth: '1200px',
                    height: '107px',
                    bgcolor: '#FFFFFF',
                    borderRadius: '40px',
                    boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.25)',
                    padding: { xs: '0 20px', md: '0 48px' },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <Logo theme="light" role={role} />

                <Stack component="nav" direction="row" spacing={{ xs: 2, md: '40px' }} alignItems="center" sx={{ overflowX: 'auto', maxWidth: '100%', scrollbarWidth: 'none' }}>
                    {navLinks.map((link) => (
                        <MuiLink
                            key={link.path}
                            component={Link}
                            to={link.path}
                            underline="none"
                            sx={{
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: { xs: '14px', md: '16px' },
                                color: PRIMARY_BLUE,
                                fontWeight: isActive(link.path) ? 700 : 400,
                                position: 'relative',
                                whiteSpace: 'nowrap',
                                '&::after': isActive(link.path) ? {
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
                            {link.label}
                        </MuiLink>
                    ))}
                    
                    <MuiLink
                        component={Link}
                        to={isAuthenticated ? "/account" : "/login"}
                        underline="none"
                        sx={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontSize: { xs: '14px', md: '16px' },
                            color: PRIMARY_BLUE,
                            fontWeight: isActive('/account') || isActive('/login') ? 700 : 400,
                            position: 'relative',
                            whiteSpace: 'nowrap',
                            '&::after': isActive('/account') || isActive('/login') ? {
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
                        {isAuthenticated ? "Личный кабинет" : "Войти"}
                    </MuiLink>
                </Stack>
            </Paper>
        </Box>
    );
}

// --- Footer Component ---
export function Footer({ role }) {
    const isManager = role === 'rop' || role === 'admin';

    return (
        <Box component="footer" sx={{ width: '100%', display: 'flex', justifyContent: 'center', px: { xs: 2, md: 0 }, pb: '40px', mt: 'auto' }}>
            <Box
                sx={{
                    width: '100%',
                    maxWidth: '1200px',
                    bgcolor: PRIMARY_BLUE,
                    borderRadius: '40px',
                    padding: { xs: '30px', md: '40px 60px 25px 60px' },
                    minHeight: '237px',
                    color: '#FFFFFF',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                {/* 1. Top Floor */}
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', mb: '30px', gap: { xs: 4, md: 0 } }}>
                    
                    {/* Column 1: Logo */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '150px' }}>
                        <Logo theme="dark" />
                    </Box>

                    {/* Dynamic Columns based on Role */}
                    {isManager ? (
                        // MANAGER FOOTER COLUMNS
                        <>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontSize: '16px', fontWeight: 400, mb: '8px', color: '#FFFFFF' }}>
                                    Документация
                                </Typography>
                                {['Договоры', 'Отчеты', 'Нормативные акты'].map(text => (
                                    <MuiLink key={text} href="#" underline="none" sx={{ fontFamily: "'Montserrat', sans-serif", fontSize: '12px', color: TEXT_GREY, transition: 'color 0.2s', lineHeight: 1.4, '&:hover': { color: '#FFFFFF' } }}>
                                        {text}
                                    </MuiLink>
                                ))}
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontSize: '16px', fontWeight: 400, mb: '8px', color: '#FFFFFF' }}>
                                    Поддержка
                                </Typography>
                                {['Чат с куратором', 'Тех. поддержка'].map(text => (
                                    <MuiLink key={text} href="#" underline="none" sx={{ fontFamily: "'Montserrat', sans-serif", fontSize: '12px', color: TEXT_GREY, transition: 'color 0.2s', lineHeight: 1.4, '&:hover': { color: '#FFFFFF' } }}>
                                        {text}
                                    </MuiLink>
                                ))}
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontSize: '16px', fontWeight: 400, mb: '8px', color: '#FFFFFF' }}>
                                    Аккаунт
                                </Typography>
                                {['Настройки', 'Выход'].map(text => (
                                    <MuiLink key={text} href="#" underline="none" sx={{ fontFamily: "'Montserrat', sans-serif", fontSize: '12px', color: TEXT_GREY, transition: 'color 0.2s', lineHeight: 1.4, '&:hover': { color: '#FFFFFF' } }}>
                                        {text}
                                    </MuiLink>
                                ))}
                            </Box>
                        </>
                    ) : (
                        // STUDENT FOOTER COLUMNS
                        <>
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

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontSize: '16px', fontWeight: 400, mb: '8px', color: '#FFFFFF' }}>
                                    Личные данные
                                </Typography>
                                <MuiLink href="#" underline="none" sx={{ fontFamily: "'Montserrat', sans-serif", fontSize: '12px', color: TEXT_GREY, transition: 'color 0.2s', lineHeight: 1.4, '&:hover': { color: '#FFFFFF' } }}>
                                    Аккаунт
                                </MuiLink>
                            </Box>
                        </>
                    )}
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
