import React, { useState, useEffect, useMemo } from 'react';
import { Box, Typography, Button, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, IconButton, Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CheckIcon from '@mui/icons-material/Check';
import Card from '../components/common/Card';
import CompanyCard from '../components/companies/CompanyCard';
import { CardSkeleton, CompanyCardSkeleton } from '../components/common/Skeletons';

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
            setFormData({
                ...practice,
                company: practice.company.name // Extract name for input
            });
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
    const [viewMode, setViewMode] = useState('vacancies');
    const [loading, setLoading] = useState(true);

    // Filter States
    const [showAvailableOnly, setShowAvailableOnly] = useState(false);
    const [formatFilter, setFormatFilter] = useState(null);
    const [seasonFilter, setSeasonFilter] = useState(null);
    const [selectedCities, setSelectedCities] = useState([]); // New state for city filter
    const [sortOption, setSortOption] = useState(null); // 'seats', 'az', 'za', 'popularity'

    // Menu Anchors
    const [formatAnchor, setFormatAnchor] = useState(null);
    const [seasonAnchor, setSeasonAnchor] = useState(null);
    const [cityAnchor, setCityAnchor] = useState(null); // New anchor for city filter
    const [sortAnchor, setSortAnchor] = useState(null);

    // Dialog State
    const [dialogOpen, setDialogOpen] = useState(false);
    const [currentPractice, setCurrentPractice] = useState(null);

    const fetchPractices = async () => {
        setLoading(true);
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
        } finally {
            setLoading(false);
        }
    };

    const fetchFavorites = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            const response = await axios.get('/api/favorite/', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFavorites(response.data.map(f => f.practice_id));
        } catch (error) {
            console.error("Error fetching favorites:", error);
        }
    };

    useEffect(() => {
        fetchPractices();
        fetchFavorites();
    }, []);

    // Extract unique cities
    const uniqueCities = useMemo(() => {
        const cities = new Set();
        practices.forEach(p => cities.add(p.city));
        return Array.from(cities).sort();
    }, [practices]);

    // Apply Filters and Sorting
    useEffect(() => {
        let result = [...practices];

        if (showAvailableOnly) {
            result = result.filter(p => p.isAvailable);
        }

        if (formatFilter) {
            result = result.filter(p => p.format === formatFilter);
        }

        if (seasonFilter) {
            result = result.filter(p => p.season === seasonFilter);
        }

        // City Filter
        if (selectedCities.length > 0) {
            result = result.filter(p => selectedCities.includes(p.city));
        }

        // Sorting
        if (sortOption === 'seats') {
            result.sort((a, b) => b.total_seats - a.total_seats);
        } else if (sortOption === 'az') {
            result.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOption === 'za') {
            result.sort((a, b) => b.title.localeCompare(a.title));
        } else if (sortOption === 'popularity') {
            // Placeholder for popularity sort
            // Currently does nothing or could sort by ID or random
        }

        setFilteredPractices(result);
    }, [practices, showAvailableOnly, formatFilter, seasonFilter, selectedCities, sortOption]);

    // Group by Company
    const companies = useMemo(() => {
        const groups = {};
        filteredPractices.forEach(practice => {
            const companyName = practice.company.name;
            if (!groups[companyName]) {
                groups[companyName] = {
                    name: companyName,
                    city: practice.company.city,
                    practices: []
                };
            }
            groups[companyName].practices.push(practice);
        });
        return Object.values(groups);
    }, [filteredPractices]);

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

    const handleCityClick = (event) => setCityAnchor(event.currentTarget);
    const handleCityToggle = (city) => {
        setSelectedCities(prev => 
            prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]
        );
    };
    const handleCityClose = () => setCityAnchor(null);

    const handleSortClick = (event) => setSortAnchor(event.currentTarget);
    const handleSortClose = (option) => {
        setSortAnchor(null);
        if (option) setSortOption(option);
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
        <Box sx={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 0 80px 0' }}>
            {/* Titles */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="h1" sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: { xs: '28px', md: '36px' }, color: '#000000' }}>
                    Каталог практик
                </Typography>
                {isAdmin && (
                    <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddClick} sx={{ bgcolor: PRIMARY_BLUE }}>
                        Добавить
                    </Button>
                )}
            </Box>
            <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: { xs: '18px', md: '24px' }, color: 'rgba(0, 0, 0, 0.66)', marginBottom: '40px' }}>
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
                {/* View Mode Toggle */}
                <Box sx={{ bgcolor: '#F6F6F6', borderRadius: '40px', p: 0.5, display: 'flex' }}>
                    <Button 
                        onClick={() => setViewMode('vacancies')}
                        sx={{ 
                            borderRadius: '40px', 
                            px: 3, 
                            py: 1,
                            textTransform: 'none',
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 600,
                            bgcolor: viewMode === 'vacancies' ? '#FFFFFF' : 'transparent',
                            color: viewMode === 'vacancies' ? PRIMARY_BLUE : '#A3A8C9',
                            boxShadow: viewMode === 'vacancies' ? '0px 2px 5px rgba(0,0,0,0.1)' : 'none',
                            '&:hover': { bgcolor: viewMode === 'vacancies' ? '#FFFFFF' : 'rgba(0,0,0,0.05)' }
                        }}
                    >
                        Вакансии
                    </Button>
                    <Button 
                        onClick={() => setViewMode('companies')}
                        sx={{ 
                            borderRadius: '40px', 
                            px: 3, 
                            py: 1,
                            textTransform: 'none',
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 600,
                            bgcolor: viewMode === 'companies' ? '#FFFFFF' : 'transparent',
                            color: viewMode === 'companies' ? PRIMARY_BLUE : '#A3A8C9',
                            boxShadow: viewMode === 'companies' ? '0px 2px 5px rgba(0,0,0,0.1)' : 'none',
                            '&:hover': { bgcolor: viewMode === 'companies' ? '#FFFFFF' : 'rgba(0,0,0,0.05)' }
                        }}
                    >
                        Компании
                    </Button>
                </Box>

                <Box sx={{ width: '1px', height: '30px', bgcolor: '#E0E0E0', mx: 1, display: { xs: 'none', sm: 'block' } }} />

                <FilterButton>Подходит мне</FilterButton>
                
                {/* Format Filter */}
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

                {/* Season Filter */}
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

                {/* City Filter */}
                <FilterButton 
                    active={selectedCities.length > 0} 
                    onClick={handleCityClick}
                >
                    {selectedCities.length > 0 ? `Город (${selectedCities.length})` : 'Город'} ▾
                </FilterButton>
                <Menu
                    anchorEl={cityAnchor}
                    open={Boolean(cityAnchor)}
                    onClose={handleCityClose}
                    PaperProps={{ style: { maxHeight: 220, borderRadius: '16px', marginTop: '8px' } }}
                >
                    {uniqueCities.map((city) => {
                        const isSelected = selectedCities.includes(city);
                        return (
                            <MenuItem 
                                key={city} 
                                onClick={() => handleCityToggle(city)}
                                sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontSize: '14px',
                                    color: isSelected ? PRIMARY_BLUE : '#000',
                                    fontWeight: isSelected ? 600 : 400,
                                    py: 1.5,
                                    gap: 1.5
                                }}
                            >
                                <Box sx={{ width: 24, display: 'flex', justifyContent: 'center' }}>
                                    {isSelected && <CheckIcon sx={{ color: PRIMARY_BLUE, fontSize: 20 }} />}
                                </Box>
                                {city}
                            </MenuItem>
                        );
                    })}
                </Menu>

                {/* Sort Button */}
                <IconButton
                    onClick={handleSortClick}
                    sx={{
                        marginLeft: 'auto',
                        background: '#F6F6F6',
                        border: '1px solid #E0E0E0',
                        width: '48px',
                        height: '48px',
                        borderRadius: '15px',
                        '&:hover': {
                            background: '#E0E0E0',
                        },
                    }}
                >
                    <FilterAltIcon sx={{ color: '#A3A8C9' }} />
                </IconButton>
                <Menu
                    anchorEl={sortAnchor}
                    open={Boolean(sortAnchor)}
                    onClose={() => handleSortClose(null)}
                >
                    <MenuItem onClick={() => handleSortClose('popularity')}>По популярности</MenuItem>
                    <MenuItem onClick={() => handleSortClose('seats')}>По количеству мест</MenuItem>
                    <MenuItem onClick={() => handleSortClose('az')}>По названию (А-Я)</MenuItem>
                    <MenuItem onClick={() => handleSortClose('za')}>По названию (Я-А)</MenuItem>
                </Menu>
            </Box>

            {/* Cards Grid */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '40px',
                }}
            >
                {loading ? (
                    // Skeletons
                    [...Array(6)].map((_, i) => (
                        viewMode === 'vacancies' ? <CardSkeleton key={i} /> : <CompanyCardSkeleton key={i} />
                    ))
                ) : (
                    viewMode === 'vacancies' ? (
                        filteredPractices.map((practice) => (
                            <Card 
                                key={practice.id} 
                                data={practice} 
                                isAdmin={isAdmin}
                                onEdit={handleEditClick}
                                onDelete={handleDeleteClick}
                                isFavorite={favorites.includes(practice.id)}
                                onToggleFavorite={handleToggleFavorite}
                            />
                        ))
                    ) : (
                        companies.map((company) => (
                            <CompanyCard 
                                key={company.name} 
                                company={company} 
                            />
                        ))
                    )
                )}
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
