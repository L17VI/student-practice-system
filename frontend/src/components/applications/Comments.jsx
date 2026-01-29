import React, { useState } from 'react';
import { Paper, Typography, Box, TextField, Button, Alert, AlertTitle } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendIcon from '@mui/icons-material/Send';

const Comments = () => {
    const [question, setQuestion] = useState("");

    const handleSend = () => {
        if (question.trim()) {
            alert(`Ваш вопрос отправлен: ${question}`);
            setQuestion("");
        }
    };

    return (
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
                <ChatBubbleOutlineIcon sx={{ color: 'text.secondary' }} />
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    Комментарий руководителя
                </Typography>
            </Box>

            <Alert severity="warning" sx={{ mb: 3, borderRadius: '20px' }}>
                <AlertTitle sx={{ fontWeight: 'bold' }}>Требуется исправить:</AlertTitle>
                Пожалуйста, приложите письмо-подтверждение и уточните период практики.
            </Alert>

            <Box sx={{ pl: 2, borderLeft: '2px solid', borderColor: 'grey.200', mb: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                    <Typography variant="body2" sx={{ color: 'text.primary', mb: 0.5 }}>
                        Добрый день! Ваша заявка принята к рассмотрению. Ожидайте ответа в течение 3 рабочих дней.
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        10.01.2026 • Руководитель практики
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="body2" sx={{ color: 'text.primary', mb: 0.5 }}>
                        Пожалуйста, приложите письмо-подтверждение и уточните период практики.
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        12.01.2026 • Руководитель практики
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ pt: 3, borderTop: '1px solid', borderColor: 'grey.100' }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: 'text.primary' }}>
                    Вопрос руководителю
                </Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="Напишите ваш вопрос..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    variant="outlined"
                    sx={{
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '20px',
                            bgcolor: 'grey.50',
                        }
                    }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        variant="contained"
                        endIcon={<SendIcon />}
                        onClick={handleSend}
                        disabled={!question.trim()}
                        sx={{
                            bgcolor: 'primary.main',
                            color: 'white',
                            fontWeight: 'bold',
                            borderRadius: '30px',
                            textTransform: 'none',
                            px: 3,
                            py: 1,
                            '&:hover': { bgcolor: 'primary.dark' },
                        }}
                    >
                        Отправить
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default Comments;