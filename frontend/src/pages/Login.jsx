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
                elevation={3}
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 4,
                    borderRadius: '16px',
                }}
            >
                <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
                    Вход в аккаунт
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    {error && (
                        <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
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
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                            py: 1.5,
                            backgroundColor: '#5D6BC4',
                            '&:hover': { backgroundColor: '#4a56a1' },
                            borderRadius: '8px',
                            fontWeight: 'bold',
                        }}
                    >
                        Войти
                    </Button>
                    <Box textAlign="center">
                        <Link component={RouterLink} to="/register" variant="body2">
                            {"Нет аккаунта? Зарегистрироваться"}
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;
