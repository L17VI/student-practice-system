import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import userService from '../services/userService';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Link,
    Alert,
} from '@mui/material';

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!formData.email || !formData.password) {
            setError('Пожалуйста, заполните все поля.');
            return;
        }
        try {
            await userService.login(formData.email, formData.password);
            onLogin();
        } catch (err) {
            setError('Не удалось войти. Проверьте правильность email и пароля.');
            console.error('Failed to login', err);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper
                elevation={0}
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '40px',
                    borderRadius: '40px',
                    boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.15)',
                    backgroundColor: '#FFFFFF'
                }}
            >
                <Typography component="h1" variant="h5" sx={{ fontWeight: '700', fontFamily: "'Montserrat', sans-serif", mb: 2 }}>
                    Вход в аккаунт
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
                    {error && (
                        <Alert severity="error" sx={{ width: '100%', mb: 2, borderRadius: '20px' }}>
                            {error}
                        </Alert>
                    )}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Электронная почта"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={formData.email}
                        onChange={handleChange}
                        sx={{
                            '& .MuiInputLabel-root': {
                                fontFamily: "'Montserrat', sans-serif",
                            }
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleChange}
                        sx={{
                            '& .MuiInputLabel-root': {
                                fontFamily: "'Montserrat', sans-serif",
                            }
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                            py: 1.5,
                            backgroundColor: '#006DB2',
                            '&:hover': { backgroundColor: '#005a9e' },
                            borderRadius: '30px',
                            fontWeight: '700',
                            fontFamily: "'Montserrat', sans-serif",
                            textTransform: 'none',
                            fontSize: '16px'
                        }}
                    >
                        Войти
                    </Button>
                    <Box textAlign="center">
                        <Link component={RouterLink} to="/register" variant="body2" sx={{ fontFamily: "'Montserrat', sans-serif", color: '#006DB2', textDecoration: 'none', fontWeight: 500 }}>
                            {"Нет аккаунта? Зарегистрироваться"}
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;
