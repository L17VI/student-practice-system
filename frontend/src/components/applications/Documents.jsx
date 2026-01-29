import React from 'react';
import { Paper, Typography, Box, Button, Alert, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import DownloadIcon from '@mui/icons-material/Download';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const DocumentItem = ({ title, status, statusColor, icon, actionText }) => (
    <Box sx={{ border: '1px solid', borderColor: 'grey.200', borderRadius: '20px', p: 2, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { sm: 'center' }, justifyContent: 'space-between', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ p: 1, bgcolor: 'grey.50', borderRadius: '12px', display: 'flex' }}>
                <DescriptionIcon sx={{ color: 'text.secondary' }} />
            </Box>
            <Box>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'text.primary' }}>{title}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: statusColor, fontSize: '12px' }}>
                    {icon}
                    <span>{status}</span>
                </Box>
            </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
            <IconButton size="small">
                <DownloadIcon fontSize="small" sx={{ color: 'text.secondary' }} />
            </IconButton>
            <Button variant="contained" size="small" sx={{ borderRadius: '30px', bgcolor: 'grey.100', color: 'text.primary', textTransform: 'none', boxShadow: 'none', '&:hover': { bgcolor: 'grey.200', boxShadow: 'none' } }}>
                {actionText}
            </Button>
        </Box>
    </Box>
);

const Documents = () => {
    return (
        <>
            {/* Секция: Мои документы */}
            <Paper 
                elevation={0} 
                sx={{ 
                    p: 4, 
                    mb: 3, 
                    borderRadius: '40px', 
                    boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.15)' 
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <DescriptionIcon sx={{ color: 'text.secondary' }} />
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                        Мои документы по заявке
                    </Typography>
                </Box>

                <Alert severity="warning" icon={<ErrorOutlineIcon fontSize="inherit" />} sx={{ mb: 3, borderRadius: '20px' }}>
                    Добавьте недостающие документы и нажмите «Исправить и отправить».
                </Alert>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <DocumentItem
                        title="Резюме.pdf"
                        status="Загружено"
                        statusColor="success.main"
                        icon={<CheckCircleOutlineIcon sx={{ fontSize: 14 }} />}
                        actionText="Заменить"
                    />
                    <DocumentItem
                        title="Портфолио.pdf"
                        status="Загружено"
                        statusColor="success.main"
                        icon={<CheckCircleOutlineIcon sx={{ fontSize: 14 }} />}
                        actionText="Заменить"
                    />

                    {/* Письмо (Проблема) */}
                    <Box sx={{ border: '1px solid', borderColor: 'warning.light', bgcolor: 'warning.50', borderRadius: '20px', p: 2, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { sm: 'center' }, justifyContent: 'space-between', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{ p: 1, bgcolor: 'warning.100', borderRadius: '12px', display: 'flex' }}>
                                <DescriptionIcon sx={{ color: 'warning.main' }} />
                            </Box>
                            <Box>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'text.primary' }}>Письмо-подтверждение.pdf</Typography>
                                <Typography variant="caption" sx={{ color: 'warning.main', fontWeight: 'bold' }}>Не загружено</Typography>
                            </Box>
                        </Box>
                        <Button
                            variant="contained"
                            startIcon={<DownloadIcon />}
                            size="small"
                            sx={{
                                bgcolor: 'primary.main',
                                color: 'white',
                                fontWeight: 'bold',
                                borderRadius: '30px',
                                textTransform: 'none',
                                '&:hover': { bgcolor: 'primary.dark' },
                            }}
                        >
                            Загрузить
                        </Button>
                    </Box>

                    {/* GitHub */}
                    <Box sx={{ border: '1px solid', borderColor: 'grey.200', borderRadius: '20px', p: 2, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { sm: 'center' }, justifyContent: 'space-between', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{ p: 1, bgcolor: 'grey.50', borderRadius: '12px', display: 'flex' }}>
                                <DescriptionIcon sx={{ color: 'text.secondary' }} />
                            </Box>
                            <Box>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'text.primary' }}>GitHub</Typography>
                                <Typography variant="caption" sx={{ color: 'primary.main', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>Ссылка</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                            <IconButton size="small">
                                <OpenInNewIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                            </IconButton>
                            <Button variant="contained" size="small" sx={{ borderRadius: '30px', bgcolor: 'grey.100', color: 'text.primary', textTransform: 'none', boxShadow: 'none', '&:hover': { bgcolor: 'grey.200', boxShadow: 'none' } }}>
                                Изменить
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Paper>

            {/* Секция: Документы практики */}
            <Paper 
                elevation={0} 
                sx={{ 
                    p: 4, 
                    mb: 3, 
                    borderRadius: '40px', 
                    boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.15)' 
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <DownloadIcon sx={{ color: 'text.secondary' }} />
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                            Документы практики
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<DownloadIcon sx={{ fontSize: 16 }} />}
                        size="small"
                        sx={{
                            borderRadius: '30px',
                            bgcolor: 'grey.100',
                            color: 'text.primary',
                            textTransform: 'none',
                            boxShadow: 'none',
                            '&:hover': { bgcolor: 'grey.200', boxShadow: 'none' },
                        }}
                    >
                        Скачать всё
                    </Button>
                </Box>

                <Box sx={{ bgcolor: 'grey.50', borderRadius: '20px', p: 1 }}>
                    <List disablePadding>
                        {['Договор (шаблон).docx', 'Направление на практику.pdf', 'Дневник практики (шаблон).docx', 'Отчёт по практике (шаблон).docx'].map((doc, i) => (
                            <ListItem
                                key={i}
                                button
                                sx={{
                                    borderRadius: '12px',
                                    '&:hover': { bgcolor: 'white', boxShadow: 1 },
                                    transition: 'all 0.2s',
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 36 }}>
                                    <DescriptionIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                                </ListItemIcon>
                                <ListItemText primary={doc} primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }} />
                                <DownloadIcon fontSize="small" sx={{ color: 'text.disabled' }} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Typography variant="caption" sx={{ color: 'text.disabled', mt: 2, display: 'block' }}>
                    Шаблоны можно скачать заранее. Подписание ЭЦП появится позже.
                </Typography>
            </Paper>
        </>
    );
};

export default Documents;