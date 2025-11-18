import { useState } from 'react';
import {
    AppBar,
    Box,
    InputBase,
    IconButton,
    Typography,
    Tooltip,
    Container,
    Grid,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

// A reminder for the main layout: to prevent content from being hidden by the
// fixed header, add a top padding to the main content container.
// The header height is now dynamic.
// e.g., <main style={{ paddingTop: '100px' }}>...</main>

const tooltipTexts = {
  menu: 'Открыть меню',
  chat: 'Открыть чат',
  profile: 'Личный кабинет',
  search: 'Поиск',
};

// Helper for action icons (chat, profile)
const renderActionIconButton = (key, icon, onClick) => (
    <Tooltip title={tooltipTexts[key]} arrow>
        <IconButton
            aria-label={tooltipTexts[key]}
            onClick={onClick}
            sx={{
                width: 40,
                height: 40,
                backgroundColor: '#5d6bc4', // Blue background
                color: '#FFFFFF', // White icon
                '&:hover, &:focus-visible': {
                    opacity: 0.9,
                },
            }}
        >
            {icon}
        </IconButton>
    </Tooltip>
);


export function Header({ onSearch, onMenuClick, onChatClick, onProfileClick }) {
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
            position="fixed"
            elevation={0}
            sx={{
                backgroundColor: '#FFFFFF',
                color: '#1F2340',
                boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                zIndex: 50,
            }}
        >
            <Container maxWidth="lg" sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: { xs: 1, sm: 2 },
                py: { xs: 2, md: 3 }, // Responsive padding
            }}>
                {/* Left zone — logo placeholder */}
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
                        width: isMobile ? '40px' : '110px', // Smaller logo on mobile
                        height: '43px',
                        backgroundColor: '#5d6bc4',
                        borderRadius: '6px',
                    }} />
                </Box>

                {/* Center zone — search group */}
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
                        <IconButton aria-label={tooltipTexts.menu} onClick={onMenuClick} sx={{ width: 40, height: 40, color: '#FFFFFF' }}>
                            <MenuIcon sx={{ width: 24, height: 24 }} />
                        </IconButton>
                        <IconButton aria-label={tooltipTexts.search} onClick={handleSearchClick} sx={{ width: 40, height: 40, color: '#FFFFFF' }}>
                            <SearchIcon sx={{ width: 24, height: 24 }} />
                        </IconButton>
                    </Box>
                )}

                {/* Right zone — action icons */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: { xs: 1, sm: 1.5 },
                    flexShrink: 0,
                }}>
                    {isMobile && (
                         <IconButton aria-label={tooltipTexts.search} onClick={handleSearchClick} sx={{ width: 40, height: 40, color: '#1F2340' }}>
                            <SearchIcon sx={{ width: 24, height: 24 }} />
                        </IconButton>
                    )}
                    {renderActionIconButton('chat', <ChatBubbleOutlineIcon sx={{ width: 24, height: 24 }} />, onChatClick)}
                    {renderActionIconButton('profile', <AccountCircleIcon sx={{ width: 24, height: 24 }} />, onProfileClick)}
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
                py: { xs: 4, md: 6 }, // Responsive padding
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={{ xs: 4, md: 2 }} justifyContent="space-between">
                    {/* Logo */}
                    <Grid item xs={12} sm={4} md={3}>
                        <Box sx={{ width: '114.25px', height: '47px', backgroundColor: '#5d6bc4', borderRadius: '6px' }} />
                    </Grid>

                    {/* Columns */}
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
