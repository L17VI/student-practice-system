import { useState } from 'react';
import {
    AppBar,
    Box,
    InputBase,
    IconButton,
    Typography,
    Container,
    Grid,
    useMediaQuery,
    useTheme,
    Tooltip,
    Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import TextsmsIcon from '@mui/icons-material/Textsms';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';

const ActionIconButton = ({ to, title, icon, onClick }) => (
    <Tooltip title={title} arrow>
        <IconButton
            component={to ? Link : 'button'}
            to={to}
            aria-label={title}
            onClick={onClick}
            sx={{
                width: 40,
                height: 40,
                backgroundColor: '#5d6bc4',
                color: '#FFFFFF',
                transition: 'background-color 0.2s ease-in-out',
                '&:hover, &:focus-visible': {
                    backgroundColor: '#4a56a1',
                },
            }}
        >
            {icon}
        </IconButton>
    </Tooltip>
);

export function Header({ isAuthenticated, onLogout, onSearch, onMenuClick, onChatClick }) {
    const [searchValue, setSearchValue] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleSearchKeyDown = (event) => {
        if (event.key === 'Enter' && onSearch) {
            onSearch(searchValue);
        }
    };
    
    const handleSearchClick = () => {
        if (onSearch) {
            onSearch(searchValue);
        }
    }

    return (
        <AppBar
            component="header"
            position="static"
            elevation={0}
            sx={{
                backgroundColor: '#FFFFFF',
                color: '#1F2340',
                boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
            }}
        >
            <Container maxWidth="lg" sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: { xs: 1, sm: 2 },
                py: { xs: 2, md: 3 },
            }}>
                <Box
                    component={Link}
                    to="/"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexShrink: 0,
                    }}
                >
                    <Box sx={{
                        width: isMobile ? '40px' : '110px',
                        height: '43px',
                        backgroundColor: '#5d6bc4',
                        borderRadius: '6px',
                    }} />
                </Box>

                {!isMobile && (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexShrink: 1,
                            height: '46px',
                            maxWidth: '567px',
                            width: '100%',
                            borderRadius: '9999px',
                            backgroundColor: '#5d6bc4',
                            border: '1px solid transparent',
                            transition: 'box-shadow 200ms ease, border-color 200ms ease',
                            ...(isSearchFocused && {
                                borderColor: '#5862D6',
                                boxShadow: '0 0 0 3px rgba(88, 98, 214, 0.3)',
                            }),
                            pl: '9px',
                            pr: '4px',
                        }}
                    >
                        <InputBase
                            fullWidth
                            placeholder="Поиск…"
                            aria-label="Search"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onKeyDown={handleSearchKeyDown}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                            sx={{
                                height: '29px',
                                width: '100%',
                                mr: '8px',
                                pl: '20px',
                                fontSize: '14px',
                                color: '#1F2340',
                                backgroundColor: '#FFFFFF',
                                borderRadius: '9999px',
                            }}
                        />
                        <Tooltip title="Меню" arrow>
                            <IconButton aria-label="Меню" onClick={onMenuClick} sx={{ width: 40, height: 40, color: '#FFFFFF' }}>
                                <MenuIcon sx={{ width: 24, height: 24 }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Поиск" arrow>
                            <IconButton aria-label="Поиск" onClick={handleSearchClick} sx={{ width: 40, height: 40, color: '#FFFFFF' }}>
                                <SearchIcon sx={{ width: 24, height: 24 }} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: { xs: 1, sm: 1.5 },
                    flexShrink: 0,
                }}>
                    {isMobile && (
                        <Tooltip title="Поиск" arrow>
                             <IconButton aria-label="Поиск" onClick={handleSearchClick} sx={{ width: 40, height: 40, color: '#1F2340' }}>
                                <SearchIcon sx={{ width: 24, height: 24 }} />
                            </IconButton>
                        </Tooltip>
                    )}
                    <ActionIconButton title="Уведомления" icon={<TextsmsIcon sx={{ width: 24, height: 24 }} />} onClick={onChatClick} />
                    
                    {isAuthenticated ? (
                        <>
                            <ActionIconButton to="/account" title="Личный кабинет" icon={<PersonIcon sx={{ width: 28, height: 28 }} />} />
                            <ActionIconButton onClick={onLogout} title="Выйти" icon={<LogoutIcon sx={{ width: 24, height: 24 }} />} />
                        </>
                    ) : (
                        <Button
                            component={Link}
                            to="/login"
                            variant="contained"
                            sx={{
                                backgroundColor: '#5d6bc4',
                                '&:hover': { backgroundColor: '#4a56a1' },
                                borderRadius: '8px',
                                fontWeight: 'bold',
                            }}
                        >
                            Войти
                        </Button>
                    )}
                </Box>
            </Container>
        </AppBar>
    );
}

const FooterColumn = ({ title, items }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>
            {title}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {items.map((item, index) => (
                <Typography key={index} variant="body2" component={Link} to="#" sx={{ 
                    textDecoration: 'none', 
                    color: 'inherit',
                    whiteSpace: 'nowrap',
                    opacity: 0.8,
                    '&:hover': { opacity: 1 }
                }}>
                    {item}
                </Typography>
            ))}
        </Box>
    </Box>
);

export function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#2a3264',
                color: '#FFFFFF',
                width: '100%',
                py: { xs: 4, md: 6 },
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={{ xs: 4, md: 2 }} justifyContent="space-between">
                    <Grid item xs={12} sm={4} md={3}>
                        <Box sx={{ width: '114.25px', height: '47px', backgroundColor: '#5d6bc4', borderRadius: '6px' }} />
                    </Grid>

                    <Grid item xs={6} sm={4} md={2.5}>
                        <FooterColumn
                            title="Отрасли профессий"
                            items={['Классические', 'Современные', 'Творческие']}
                        />
                    </Grid>
                    <Grid item xs={6} sm={4} md={2.5}>
                        <FooterColumn
                            title="Связь с нами"
                            items={['Чат с нами', 'Почта', 'Социальные сети']}
                        />
                    </Grid>
                    <Grid item xs={6} sm={4} md={2.5}>
                        <FooterColumn
                            title="Личные данные"
                            items={['Аккаунт']}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
