import React from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';

const PRIMARY_BLUE = '#006DB2';

const Card = ({ data, isAdmin, onEdit, onDelete, isFavorite, onToggleFavorite }) => {
    const navigate = useNavigate();

    const handleDetailsClick = () => {
        navigate(`/practice/${data.id}`);
    };

    return (
        <Box
            sx={{
                background: '#FFFFFF',
                borderRadius: '40px',
                boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.15)',
                padding: '30px',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                boxSizing: 'border-box',
                position: 'relative',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'translateY(-5px)',
                }
            }}
            onClick={handleDetailsClick}
        >
            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Typography
                    sx={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 700,
                        fontSize: '24px',
                        margin: '0 0 16px 0',
                        lineHeight: 1.2,
                        color: '#000',
                    }}
                >
                    {data.title}
                </Typography>
                {isAdmin && (
                    <Box onClick={(e) => e.stopPropagation()}>
                        <IconButton size="small" onClick={() => onEdit(data)}><EditIcon /></IconButton>
                        <IconButton size="small" onClick={() => onDelete(data.id)} color="error"><DeleteIcon /></IconButton>
                    </Box>
                )}
            </Box>

            {/* Tags */}
            <Box sx={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
                <Box sx={{ background: '#D9D9D9', borderRadius: '40px', padding: '4px 16px', fontSize: '14px', fontFamily: "'Montserrat', sans-serif" }}>
                    {data.format}
                </Box>
                <Box sx={{ background: '#D9D9D9', borderRadius: '40px', padding: '4px 16px', fontSize: '14px', fontFamily: "'Montserrat', sans-serif" }}>
                    {data.season}
                </Box>
            </Box>

            {/* Company Info */}
            <Box sx={{ marginBottom: 'auto' }}>
                <Typography sx={{ fontSize: '16px', marginBottom: '6px', fontFamily: "'Montserrat', sans-serif", color: '#000' }}>
                    {/* Fix: Access company.name instead of company object */}
                    {data.company.name}
                </Typography>
                <Typography sx={{ fontSize: '15px', color: '#000', fontFamily: "'Montserrat', sans-serif" }}>
                    {data.city}
                </Typography>
            </Box>

            {/* Status */}
            <Typography
                sx={{
                    fontSize: '15px',
                    marginTop: '20px',
                    marginBottom: '15px',
                    fontWeight: 500,
                    fontFamily: "'Montserrat', sans-serif",
                    color: data.isAvailable ? '#08A600' : '#F43E41',
                }}
            >
                {data.seatsText}
            </Typography>

            {/* Actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '15px' }} onClick={(e) => e.stopPropagation()}>
                <Button
                    disableRipple
                    onClick={handleDetailsClick}
                    sx={{
                        flexGrow: 1,
                        height: '45px',
                        borderRadius: '40px',
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 700,
                        fontSize: '15px',
                        textTransform: 'none',
                        boxShadow: 'none',
                        background: data.isAvailable ? PRIMARY_BLUE : 'transparent',
                        color: data.isAvailable ? '#FFFFFF' : '#F43E41',
                        border: data.isAvailable ? 'none' : '1px solid #F43E41',
                        cursor: 'pointer',
                        '&:hover': {
                            background: data.isAvailable ? '#005a9e' : 'rgba(244, 62, 65, 0.05)',
                            boxShadow: 'none',
                        },
                    }}
                >
                    {data.isAvailable ? 'Записаться' : 'Подробнее'}
                </Button>

                <IconButton
                    disableRipple
                    onClick={() => onToggleFavorite && onToggleFavorite(data.id)}
                    sx={{
                        width: '45px',
                        height: '45px',
                        borderRadius: '50%',
                        border: '2px solid #F43E41',
                        background: 'transparent',
                        color: '#F43E41',
                        padding: 0,
                        '&:hover': {
                            background: 'rgba(244, 62, 65, 0.04)',
                        },
                    }}
                >
                    {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
            </Box>
        </Box>
    );
};

export default Card;
