import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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

const Registration = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!formData.fullname || !formData.email || !formData.password) {
            setError('Пожалуйста, заполните все поля.');
            return;
        }

        if (new TextEncoder().encode(formData.password).length > 72) {
            setError('Пароль слишком длинный. Максимальная длина — 72 байта.');
            return;
        }

        try {
            await userService.register(formData.fullname, formData.email, formData.password, 'student');
            setSuccess('Регистрация прошла успешно! Теперь вы можете войти.');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            const errorMessage = err.response?.data?.detail || 'Ошибка регистрации. Попробуйте снова.';
            setError(errorMessage);
            console.error('Failed to register', err);
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
                    Регистрация
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
                    {error && (
                        <Alert severity="error" sx={{ width: '100%', mb: 2, borderRadius: '20px' }}>
                            {error}
                        </Alert>
                    )}
                    {success && (
                        <Alert severity="success" sx={{ width: '100%', mb: 2, borderRadius: '20px' }}>
                            {success}
                        </Alert>
                    )}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="fullname"
                        label="Полное имя"
                        name="fullname"
                        autoComplete="name"
                        autoFocus
                        value={formData.fullname}
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
                        id="email"
                        label="Электронная почта"
                        name="email"
                        autoComplete="email"
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
                        autoComplete="new-password"
                        value={formData.password}
                        onChange={handleChange}
                        inputProps={{
                            maxLength: 72
                        }}
                        helperText={new TextEncoder().encode(formData.password).length > 72 ? "Пароль слишком длинный" : ""}
                        error={new TextEncoder().encode(formData.password).length > 72}
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
                        Зарегистрироваться
                    </Button>
                    <Box textAlign="center">
                        <Link component={RouterLink} to="/login" variant="body2" sx={{ fontFamily: "'Montserrat', sans-serif", color: '#006DB2', textDecoration: 'none', fontWeight: 500 }}>
                            {"Уже есть аккаунт? Войти"}
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Registration;
