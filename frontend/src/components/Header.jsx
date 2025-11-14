import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export function Header({ isAuthenticated }) {
    return (
        <AppBar position="static">
            <Toolbar>
                {/* Заголовок/Логотип слева */}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Платформа Стажировок
                    </Link>
                </Typography>
                {/* Навигационные ссылки справа */}
                <Box>
                    <Button color="inherit" component={Link} to="/">
                        Главная
                    </Button>
                    <Button color="inherit" component={Link} to="/vacancies">
                        Вакансии
                    </Button>
                    {isAuthenticated ? (
                        <Button color="inherit" component={Link} to="/profile" startIcon={<AccountCircleIcon />}>
                            Профиль
                        </Button>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} to="/login">
                                Вход
                            </Button>
                            <Button color="inherit" component={Link} to="/register">
                                Регистрация
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
            }}
        >
            <Container maxWidth="lg">
                <Typography variant="body2" color="text.secondary" align="center">
                    {'© '}
                    Платформа Стажировок {new Date().getFullYear()}
                </Typography>
            </Container>
        </Box>
    );
}