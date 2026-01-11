import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid } from '@mui/material';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import Card from '../components/Card';

// --- Constants ---
const PRIMARY_BLUE = '#006DB2';

// --- Components ---

const FilterButton = ({ children, active, onClick }) => (
    <Button
        onClick={onClick}
        disableRipple
        sx={{
            background: active ? '#E0E0E0' : 'rgba(188, 188, 188, 0.47)',
            borderRadius: '40px',
            padding: '10px 24px',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 500,
            fontSize: '16px',
            color: active ? PRIMARY_BLUE : '#000000',
            textTransform: 'none',
            minWidth: 'auto',
            boxShadow: 'none',
            border: active ? `1px solid ${PRIMARY_BLUE}` : '1px solid transparent',
            '&:hover': {
                background: 'rgba(188, 188, 188, 0.7)',
                boxShadow: 'none',
            },
        }}
    >
        {children}
    </Button>
);

const AddEditDialog = ({ open, handleClose, practice, handleSave }) => {
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        city: '',
        format: '',
        season: '',
        total_seats: 10,
        filled_seats: 0,
        description: '',
        image: '',
        start_date: '',
        end_date: ''
    });

    useEffect(() => {
        if (practice) {
            setFormData(practice);
        } else {
            setFormData({
                title: '',
                company: '',
                city: '',
                format: '',
                season: '',
                total_seats: 10,
                filled_seats: 0,
                description: '',
                image: '',
                start_date: '',
                end_date: ''
            });
        }
    }, [practice, open]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = () => {
        handleSave(formData);
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>{practice ? 'Редактировать практику' : 'Добавить практику'}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                        <TextField name="title" label="Название" fullWidth value={formData.title} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField name="company" label="Компания" fullWidth value={formData.company} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField name="city" label="Город" fullWidth value={formData.city} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField name="format" label="Формат" fullWidth value={formData.format} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField name="season" label="Сезон" fullWidth value={formData.season} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField name="total_seats" label="Всего мест" type="number" fullWidth value={formData.total_seats} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField name="filled_seats" label="Занято мест" type="number" fullWidth value={formData.filled_seats} onChange={handleChange} />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Отмена</Button>
                <Button onClick={onSubmit} variant="contained" color="primary">Сохранить</Button>
            </DialogActions>
        </Dialog>
    );
};

// --- Main Page Component ---
const Home = ({ isAdmin }) => {
    const [practices, setPractices] = useState([]);
    const [filteredPractices, setFilteredPractices] = useState([]);
    const [favorites, setFavorites] = useState([]);

    // Filter States
    const [showAvailableOnly, setShowAvailableOnly] = useState(false);
    const [formatFilter, setFormatFilter] = useState(null);
    const [seasonFilter, setSeasonFilter] = useState(null);

    // Menu Anchors
    const [formatAnchor, setFormatAnchor] = useState(null);
    const [seasonAnchor, setSeasonAnchor] = useState(null);

    // Dialog State
    const [dialogOpen, setDialogOpen] = useState(false);
    const [currentPractice, setCurrentPractice] = useState(null);

    const fetchPractices = async () => {
        try {
            const response = await axios.get('/api/practice/');
            const data = response.data.map(p => {
                const available = p.total_seats - p.filled_seats;
                const isAvailable = available > 0;
                let seatsText = '';
                if (!isAvailable) {
                    seatsText = 'Мест нет';
                } else {
                    seatsText = `Осталось мест: ${available} из ${p.total_seats}`;
                }
                
                return {
                    ...p,
                    seatsText,
                    isAvailable
                };
            });
            setPractices(data);
            setFilteredPractices(data);
        } catch (error) {
            console.error("Error fetching practices:", error);
        }
    };

    const fetchFavorites = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            const response = await axios.get('/api/favorite/', {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Fixed: use practice_id (snake_case) as returned by backend
            setFavorites(response.data.map(f => f.practice_id));
        } catch (error) {
            console.error("Error fetching favorites:", error);
        }
    };

    useEffect(() => {
        fetchPractices();
        fetchFavorites();
    }, []);

    // Apply Filters
    useEffect(() => {
        let result = practices;

        if (showAvailableOnly) {
            result = result.filter(p => p.isAvailable);
        }

        if (formatFilter) {
            result = result.filter(p => p.format === formatFilter);
        }

        if (seasonFilter) {
            result = result.filter(p => p.season === seasonFilter);
        }

        setFilteredPractices(result);
    }, [practices, showAvailableOnly, formatFilter, seasonFilter]);

    // Handlers
    const handleFormatClick = (event) => setFormatAnchor(event.currentTarget);
    const handleFormatClose = (format) => {
        setFormatAnchor(null);
        if (format) setFormatFilter(format === 'Все' ? null : format);
    };

    const handleSeasonClick = (event) => setSeasonAnchor(event.currentTarget);
    const handleSeasonClose = (season) => {
        setSeasonAnchor(null);
        if (season) setSeasonFilter(season === 'Все' ? null : season);
    };

    // Admin Handlers
    const handleAddClick = () => {
        setCurrentPractice(null);
        setDialogOpen(true);
    };

    const handleEditClick = (practice) => {
        setCurrentPractice(practice);
        setDialogOpen(true);
    };

    const handleDeleteClick = async (id) => {
        if (window.confirm('Вы уверены, что хотите удалить эту практику?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`/api/practice/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchPractices();
            } catch (error) {
                console.error("Error deleting practice:", error);
                alert("Ошибка при удалении");
            }
        }
    };

    const handleSave = async (data) => {
        try {
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };
            
            const payload = {
                ...data,
                total_seats: parseInt(data.total_seats),
                filled_seats: parseInt(data.filled_seats),
                description: data.description || '',
                image: data.image || '',
                start_date: data.start_date || '',
                end_date: data.end_date || ''
            };

            if (currentPractice) {
                await axios.put(`/api/practice/${currentPractice.id}`, payload, { headers });
            } else {
                await axios.post('/api/practice/', payload, { headers });
            }
            setDialogOpen(false);
            fetchPractices();
        } catch (error) {
            console.error("Error saving practice:", error);
            alert("Ошибка при сохранении");
        }
    };

    const handleToggleFavorite = async (practiceId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Пожалуйста, войдите в систему");
            return;
        }

        const isFavorite = favorites.includes(practiceId);
        const headers = { Authorization: `Bearer ${token}` };

        try {
            if (isFavorite) {
                await axios.delete(`/api/favorite/${practiceId}`, { headers });
                setFavorites(prev => prev.filter(id => id !== practiceId));
            } else {
                await axios.post('/api/favorite/', { practice_id: practiceId }, { headers });
                setFavorites(prev => [...prev, practiceId]);
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    };

    return (
        <Box sx={{ maxWidth: '1147px', margin: '0 auto', padding: '40px 0 80px 0' }}>
            {/* Titles */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="h1" sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: '36px', color: '#000000' }}>
                    Каталог практик
                </Typography>
                {isAdmin && (
                    <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddClick} sx={{ bgcolor: PRIMARY_BLUE }}>
                        Добавить
                    </Button>
                )}
            </Box>
            <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: '24px', color: 'rgba(0, 0, 0, 0.66)', marginBottom: '40px' }}>
                Выберите практику и подайте заявку
            </Typography>

            {/* Filters Bar */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    marginBottom: '60px',
                    background: '#FFFFFF',
                    padding: '20px 30px',
                    borderRadius: '30px',
                    boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.05)',
                    flexWrap: 'wrap',
                }}
            >
                <FilterButton>Подходит мне</FilterButton>
                
                <FilterButton 
                    active={showAvailableOnly} 
                    onClick={() => setShowAvailableOnly(!showAvailableOnly)}
                >
                    Свободные
                </FilterButton>

                <FilterButton 
                    active={!!formatFilter} 
                    onClick={handleFormatClick}
                >
                    {formatFilter || 'Формат'} ▾
                </FilterButton>
                <Menu
                    anchorEl={formatAnchor}
                    open={Boolean(formatAnchor)}
                    onClose={() => handleFormatClose(null)}
                >
                    <MenuItem onClick={() => handleFormatClose('Все')}>Все</MenuItem>
                    <MenuItem onClick={() => handleFormatClose('Удалённо')}>Удалённо</MenuItem>
                    <MenuItem onClick={() => handleFormatClose('Очно')}>Очно</MenuItem>
                    <MenuItem onClick={() => handleFormatClose('Гибрид')}>Гибрид</MenuItem>
                </Menu>

                <FilterButton 
                    active={!!seasonFilter} 
                    onClick={handleSeasonClick}
                >
                    {seasonFilter || 'Период'} ▾
                </FilterButton>
                <Menu
                    anchorEl={seasonAnchor}
                    open={Boolean(seasonAnchor)}
                    onClose={() => handleSeasonClose(null)}
                >
                    <MenuItem onClick={() => handleSeasonClose('Все')}>Все</MenuItem>
                    <MenuItem onClick={() => handleSeasonClose('Весна')}>Весна</MenuItem>
                    <MenuItem onClick={() => handleSeasonClose('Лето')}>Лето</MenuItem>
                </Menu>

                <FilterButton>Оплата ▾</FilterButton>

                {/* Settings Button */}
                <Box
                    component="button"
                    sx={{
                        marginLeft: 'auto',
                        background: 'transparent',
                        border: '2px solid #000',
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        padding: 0,
                        '&:hover': {
                            background: 'rgba(0,0,0,0.05)',
                        },
                    }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 21V14" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4 10V3" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 21V12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 8V3" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M20 21V16" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M20 12V3" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1 14H7" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9 8H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M17 16H23" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Box>
            </Box>

            {/* Cards Grid */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '40px',
                }}
            >
                {filteredPractices.map((practice) => (
                    <Card 
                        key={practice.id} 
                        data={practice} 
                        isAdmin={isAdmin}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteClick}
                        isFavorite={favorites.includes(practice.id)}
                        onToggleFavorite={handleToggleFavorite}
                    />
                ))}
            </Box>

            <AddEditDialog 
                open={dialogOpen} 
                handleClose={() => setDialogOpen(false)} 
                practice={currentPractice} 
                handleSave={handleSave} 
            />
        </Box>
    );
};

export default Home;
