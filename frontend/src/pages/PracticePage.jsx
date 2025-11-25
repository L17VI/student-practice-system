import React from 'react';
import { Box, Grid, Typography, Button, Stack, IconButton, Paper } from '@mui/material';
import { MailOutline, Telegram, Phone, FavoriteBorder } from '@mui/icons-material';

const PracticePage = () => {
    return (
        <Stack spacing={4}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={7}>
                    <Paper 
                        variant="outlined"
                        sx={{
                            p: 3,
                            borderRadius: '30px',
                            borderColor: '#5D6BC4',
                            boxShadow: '0px 4px 8px rgba(42, 50, 100, 0.1)',
                            height: '100%'
                        }}
                    >
                        <Typography variant="h4" component="h1" sx={{ fontWeight: '700', mb: 2 }}>
                            Web-разработчик
                        </Typography>
                        <Typography sx={{ fontSize: '16px', mb: 1 }}>
                            формат практики: очное/заочное
                        </Typography>
                        <Typography sx={{ fontSize: '16px', mb: 1 }}>
                            длительность практики: 14 дней
                        </Typography>
                        <Typography sx={{ fontSize: '16px', mb: 2 }}>
                            компания:
                        </Typography>
                        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                            <Button variant="contained" sx={{
                                bgcolor: '#5D6BC4',
                                borderRadius: '30px',
                                color: '#FFFFFF',
                                fontSize: '20px',
                                py: 1,
                                px: 4,
                                flexGrow: 1,
                            }}>
                                Записаться
                            </Button>
                            <IconButton sx={{
                                border: '1px solid #5D6BC4',
                                borderRadius: '30px',
                                width: '50px',
                                height: '50px',
                            }}>
                                <FavoriteBorder sx={{ color: '#FF0004' }} />
                            </IconButton>
                        </Stack>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Box sx={{ 
                        p: 3, 
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Typography sx={{ fontWeight: '500', fontSize: '64px', lineHeight: '1.2' }}>
                            МЫ
                        </Typography>
                        <Typography sx={{ fontWeight: '500', fontSize: '48px', lineHeight: '1.2' }}>
                            ЖДЁМ
                        </Typography>
                        <Typography sx={{ fontWeight: '500', fontSize: '48px', lineHeight: '1.2' }}>
                            именно тебя!
                        </Typography>
                        <Typography sx={{ fontSize: '24px', mt: 2 }}>
                            Для связи с нами
                        </Typography>
                        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                            <IconButton sx={{ bgcolor: '#5D6BC4', color: 'white', width: 50, height: 50 }}>
                                <MailOutline />
                            </IconButton>
                            <IconButton sx={{ bgcolor: '#5D6BC4', color: 'white', width: 50, height: 50 }}>
                                <Telegram />
                            </IconButton>
                            <IconButton sx={{ bgcolor: '#5D6BC4', color: 'white', width: 50, height: 50 }}>
                                <Phone />
                            </IconButton>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>

            <Box>
                <Typography variant="h5" component="h3" sx={{ fontWeight: '700', mb: 2 }}>
                    Обязанности
                </Typography>
                <Typography component="ul" sx={{ listStyle: 'none', p: 0, fontSize: '20px' }}>
                    <li>- разработка и структурирование сайтов и веб-приложений;</li>
                    <li>- настройка серверной части и корректировка работы с данными;</li>
                    <li>- вёрстка и отладка пользовательского интерфейса;</li>
                    <li>- тестирование фронтенда и бэкенда, исправление ошибок.</li>
                </Typography>
            </Box>

            <Box>
                <Typography variant="h5" component="h3" sx={{ fontWeight: '700', mb: 2 }}>
                    Условия
                </Typography>
                <Typography component="ul" sx={{ listStyle: 'none', p: 0, fontSize: '20px' }}>
                    <li>- гибкий график</li>
                    <li>- обучение на реальных задачах</li>
                    <li>- доступ к обучающим курсам компании</li>
                    <li>- работа под руководством опытных специалистов</li>
                </Typography>
            </Box>

            <Box>
                <Typography variant="h5" component="h3" sx={{ fontWeight: '400', mb: 2 }}>
                    Похожие практики
                </Typography>
                <Grid container spacing={2}>
                    {[...Array(4)].map((_, i) => (
                        <Grid item xs={12} sm={6} md={3} key={i}>
                            <Paper variant="outlined" sx={{
                                borderRadius: '30px',
                                height: '170px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                '&::after': {
                                    content: '"📷"',
                                    fontSize: '50px',
                                }
                            }} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Stack>
    );
};

export default PracticePage;
