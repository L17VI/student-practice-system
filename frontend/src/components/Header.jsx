import { useState } from 'react';
import {
    AppBar,
    Box,
    InputBase,
    IconButton,
    Typography,
    Tooltip,
    Container,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

// A reminder for the main layout: to prevent content from being hidden by the
// fixed header, add a top padding to the main content container.
// The header height is now dynamic, but around 126px.
// e.g., <main style={{ paddingTop: '126px' }}>...</main>

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
            <Box sx={{
                maxWidth: '1280px',
                mx: 'auto',
                px: '24px',
                width: '100%',
                display: 'flex',
                alignItems: 'center', // Vertically center content
                justifyContent: 'space-between',
                gap: { xs: 1, sm: 2 },
                py: '40px', // 40px padding top and bottom
            }}>
                {/* Left zone — logo placeholder */}
                <Box
                    component={Link}
                    to="/"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexShrink: 0,
                        height: '43px', // Match placeholder height
                    }}
                >
                    <Box sx={{
                        width: '110px',
                        height: '43px',
                        backgroundColor: '#5d6bc4',
                        borderRadius: '6px', // Optional: for a softer look
                    }} />
                </Box>

                {/* Center zone — search group */}
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
                    {/* White InputBase inside the blue block */}
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
                            width: '464px',
                            flexShrink: 1,
                            mr: '8px', // Gap between input and buttons
                            pl: '20px',
                            fontSize: '14px',
                            color: '#1F2340',
                            backgroundColor: '#FFFFFF',
                            borderRadius: '9999px',
                            '& .MuiInputBase-input::placeholder': {
                                color: '#59607A',
                                opacity: 1,
                            },
                        }}
                    />
                    
                    <IconButton
                        aria-label={tooltipTexts.menu}
                        onClick={onMenuClick}
                        sx={{
                            width: 40,
                            height: 40,
                            color: '#FFFFFF',
                            '&:hover, &:focus-visible': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                        }}
                    >
                        <MenuIcon sx={{ width: 24, height: 24 }} />
                    </IconButton>

                    <IconButton
                        aria-label={tooltipTexts.search}
                        onClick={handleSearchClick}
                        sx={{
                            width: 40,
                            height: 40,
                            color: '#FFFFFF',
                            '&:hover, &:focus-visible': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                        }}
                    >
                        <SearchIcon sx={{ width: 24, height: 24 }} />
                    </IconButton>
                </Box>

                {/* Right zone — action icons */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: { xs: 0, sm: '12px' },
                    flexShrink: 0,
                    height: '46px',
                }}>
                    {renderActionIconButton('chat', <ChatBubbleOutlineIcon sx={{ width: 24, height: 24 }} />, onChatClick)}
                    {renderActionIconButton('profile', <AccountCircleIcon sx={{ width: 24, height: 24 }} />, onProfileClick)}
                </Box>
            </Box>
        </AppBar>
    );
}

const FooterColumn = ({ title, items, sx }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, ...sx }}>
        <Typography variant="subtitle1" sx={{ 
            fontWeight: 'bold',
            fontSize: '18px',
            whiteSpace: 'nowrap',
        }}>
            {title}
        </Typography>
        {items.map((item, index) => (
            <Typography key={index} variant="body2" component={Link} to="#" sx={{ 
                textDecoration: 'none', 
                color: 'inherit',
                fontSize: '14px',
                whiteSpace: 'nowrap',
            }}>
                {item}
            </Typography>
        ))}
    </Box>
);

export function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                height: '265px',
                backgroundColor: '#2a3264', // This Box provides the full-width background
                color: '#FFFFFF',
                mt: 'auto',
                width: '100%',
            }}
        >
            {/* This inner Box centers the content */}
            <Box sx={{
                maxWidth: '1280px',
                height: '100%',
                position: 'relative',
                mx: 'auto', // Center the container
                px: '24px', // Add padding to align with header content
            }}>
                {/* Logo Placeholder */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '46px',
                        left: '63px',
                        width: '114.25px',
                        height: '47px',
                        backgroundColor: '#5d6bc4',
                        borderRadius: '6px',
                    }}
                />

                {/* Columns */}
                <FooterColumn
                    title="Отрасли профессий"
                    items={['Классические и фундаментальные', 'Современные и цифровые', 'Творческие и социальные']}
                    sx={{
                        position: 'absolute',
                        top: '40px',
                        left: '333px',
                        width: '156px',
                        height: '103px',
                    }}
                />
                <FooterColumn
                    title="Связь с нами"
                    items={['Чат с нами', 'Почта', 'Социальные сети']}
                    sx={{
                        position: 'absolute',
                        top: '40px',
                        left: '649px',
                        width: '108px',
                        height: '103px',
                    }}
                />
                <FooterColumn
                    title="Личные данные"
                    items={['Аккаунт']}
                    sx={{
                        position: 'absolute',
                        top: '40px',
                        left: '917px',
                        width: '127px',
                        height: '55px',
                    }}
                />
            </Box>
        </Box>
    );
}
