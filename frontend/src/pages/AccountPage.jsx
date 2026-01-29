import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import userService from '../services/userService';
import { useNavigate, useLocation } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import Card from '../components/common/Card';
import axios from 'axios';

// --- Icons ---
const Icons = {
    User: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
    List: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>,
    Heart: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>,
    LogOut: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>,
    Edit: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
};

// --- Components ---

const SidebarItem = ({ icon, label, active, onClick, color }) => (
    <Box
        onClick={onClick}
        sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 20px',
            borderRadius: '20px',
            textDecoration: 'none',
            color: color || (active ? '#006DB2' : '#000'),
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '14px',
            fontWeight: active ? 700 : 500,
            cursor: 'pointer',
            transition: 'all 0.2s',
            backgroundColor: active ? 'rgba(0, 109, 178, 0.1)' : 'transparent',
            '&:hover': {
                backgroundColor: active ? 'rgba(0, 109, 178, 0.1)' : '#F6F6F6',
                color: color || '#006DB2',
            },
        }}
    >
        <Box sx={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {icon}
        </Box>
        {label}
    </Box>
);

const TabButton = ({ label, active, onClick }) => (
    <Button
        onClick={onClick}
        disableRipple
        sx={{
            background: 'none',
            border: 'none',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '16px',
            fontWeight: active ? 700 : 500,
            color: active ? '#006DB2' : '#A3A8C9',
            cursor: 'pointer',
            paddingBottom: '10px',
            position: 'relative',
            textTransform: 'none',
            minWidth: 'auto',
            '&:hover': {
                background: 'none',
                color: '#006DB2',
            },
            '&::after': active ? {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '2px',
                background: '#006DB2',
            } : {},
        }}
    >
        {label}
    </Button>
);

const EditableField = ({ label, value, onSave, readOnly = false, type = "text" }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempValue, setTempValue] = useState(value);

    useEffect(() => { setTempValue(value); }, [value]);

    const handleSave = () => {
        onSave(tempValue);
        setIsEditing(false);
    };

    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '180px 1fr' }, alignItems: 'center', gap: { xs: 1, sm: 0 } }}>
            <Typography sx={{ fontSize: '14px', color: '#A3A8C9', fontWeight: 500, fontFamily: "'Montserrat', sans-serif" }}>
                {label}:
            </Typography>
            <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Box
                    component="input"
                    type={type}
                    value={isEditing ? tempValue : (value || '')}
                    onChange={(e) => setTempValue(e.target.value)}
                    readOnly={!isEditing}
                    sx={{
                        background: '#F6F6F6',
                        border: isEditing ? '1px solid #006DB2' : 'none',
                        borderRadius: '10px',
                        padding: '10px 15px',
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: '14px',
                        width: '100%',
                        maxWidth: '300px',
                        outline: 'none',
                        color: '#000',
                    }}
                />
                {!readOnly && (
                    isEditing ? (
                        <IconButton onClick={handleSave} sx={{ background: '#006DB2', borderRadius: '10px', width: '36px', height: '36px', '&:hover': { background: '#005a9e' } }}>
                            <CheckIcon sx={{ color: 'white', fontSize: '20px' }} />
                        </IconButton>
                    ) : (
                        <IconButton onClick={() => setIsEditing(true)} sx={{ background: '#006DB2', borderRadius: '10px', width: '36px', height: '36px', '&:hover': { background: '#005a9e' } }}>
                            <Icons.Edit />
                        </IconButton>
                    )
                )}
            </Box>
        </Box>
    );
};

const AccountPage = ({ onLogout }) => {
    const [userData, setUserData] = useState({
        fullname: '',
        email: '',
        role: '',
        phone: '',
        birth_date: '',
        image: '',
    });
    const [activeTab, setActiveTab] = useState('general');
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const fileInputRef = useRef(null);

    const isFavoritesPage = location.pathname === '/favorites';
    const isRop = userData.role === 'rop';

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await userService.getMe();
                if (user) {
                    setUserData(user);
                } else {
                    navigate('/login');
                }
            } catch (error) {
                console.error('Failed to fetch user data', error);
            }
        };

        fetchUserData();
    }, [navigate]);

    useEffect(() => {
        if (isFavoritesPage && !isRop) {
            const fetchFavorites = async () => {
                const token = localStorage.getItem('token');
                if (!token) return;
                try {
                    const response = await axios.get('/api/favorite/', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    // response.data is list of FavoriteSchema which includes practice
                    setFavorites(response.data.map(f => f.practice));
                } catch (error) {
                    console.error("Error fetching favorites:", error);
                }
            };
            fetchFavorites();
        }
    }, [isFavoritesPage, isRop]);

    const handleUpdate = async (field, value) => {
        try {
            const updatedUser = await userService.updateMe({ [field]: value });
            setUserData(updatedUser);
        } catch (error) {
            console.error(`Failed to update ${field}`, error);
            alert("Ошибка при обновлении данных");
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            alert("Файл должен быть меньше 5 МБ");
            return;
        }

        if (file.type !== 'image/jpeg') {
            alert("Файл должен быть в формате JPG");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64Image = reader.result;
            setUserData(prev => ({ ...prev, image: base64Image }));
            handleUpdate('image', base64Image);
        };
        reader.readAsDataURL(file);
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const handleRemoveFavorite = async (practiceId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`/api/favorite/${practiceId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFavorites(prev => prev.filter(p => p.id !== practiceId));
        } catch (error) {
            console.error("Error removing favorite:", error);
        }
    };

    return (
        <Box sx={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 0 80px 0' }}>
            <Typography variant="h1" sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: '36px', margin: '0 0 10px 0', color: '#000000' }}>
                Личный кабинет
            </Typography>
            <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: '24px', color: 'rgba(0, 0, 0, 0.66)', marginBottom: '40px' }}>
                {userData.fullname || 'Загрузка...'}
            </Typography>

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '280px 1fr' },
                gap: '40px',
                alignItems: 'start',
            }}>
                {/* Sidebar */}
                <Box sx={{
                    background: '#FFFFFF',
                    borderRadius: '40px',
                    boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.15)',
                    padding: '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                }}>
                    <SidebarItem 
                        icon={<Icons.User />} 
                        label="Профиль" 
                        active={location.pathname === '/account'} 
                        onClick={() => navigate('/account')} 
                    />
                    {/* Hide Favorites for ROP */}
                    {!isRop && (
                        <SidebarItem 
                            icon={<Icons.Heart />} 
                            label="Избранное" 
                            active={location.pathname === '/favorites'} 
                            onClick={() => navigate('/favorites')} 
                        />
                    )}
                    <Box sx={{ height: '1px', background: '#EEE', margin: '10px 0' }} />
                    <SidebarItem icon={<Icons.LogOut />} label="Выйти" color="#F43E41" onClick={onLogout} />
                </Box>

                {/* Content */}
                <Box sx={{
                    background: '#FFFFFF',
                    borderRadius: '40px',
                    boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.15)',
                    padding: '40px',
                }}>
                    {isFavoritesPage && !isRop ? (
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, fontFamily: "'Montserrat', sans-serif" }}>
                                Избранные практики
                            </Typography>
                            {favorites.length === 0 ? (
                                <Typography sx={{ fontFamily: "'Montserrat', sans-serif", color: '#A3A8C9' }}>
                                    Список избранного пуст
                                </Typography>
                            ) : (
                                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
                                    {favorites.map(practice => (
                                        <Card 
                                            key={practice.id} 
                                            data={{
                                                ...practice,
                                                seatsText: (practice.total_seats - practice.filled_seats) > 0 
                                                    ? `Осталось мест: ${practice.total_seats - practice.filled_seats} из ${practice.total_seats}` 
                                                    : 'Мест нет',
                                                isAvailable: (practice.total_seats - practice.filled_seats) > 0
                                            }}
                                            isFavorite={true}
                                            onToggleFavorite={handleRemoveFavorite}
                                        />
                                    ))}
                                </Box>
                            )}
                        </Box>
                    ) : (
                        <>
                            <Box sx={{ display: 'flex', gap: '30px', marginBottom: '30px', borderBottom: '1px solid #E0E0E0' }}>
                                <TabButton label="Общая информация" active={activeTab === 'general'} onClick={() => setActiveTab('general')} />
                                {/* Hide Portfolio for ROP */}
                                {!isRop && (
                                    <TabButton label="Портфолио" active={activeTab === 'portfolio'} onClick={() => setActiveTab('portfolio')} />
                                )}
                            </Box>

                            <Box sx={{
                                display: 'grid',
                                gridTemplateColumns: { xs: '1fr', sm: '200px 1fr' },
                                gap: '40px',
                            }}>
                                {/* Photo Uploader */}
                                <Box display="flex" flexDirection="column" alignItems="center">
                                    <input 
                                        type="file" 
                                        ref={fileInputRef} 
                                        style={{ display: 'none' }} 
                                        accept="image/jpeg"
                                        onChange={handleFileChange}
                                    />
                                    <Box 
                                        onClick={!userData.image ? triggerFileInput : undefined}
                                        sx={{
                                            width: '100%',
                                            aspectRatio: '1',
                                            border: userData.image ? 'none' : '2px dashed #A3A8C9',
                                            borderRadius: '20px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#A3A8C9',
                                            cursor: userData.image ? 'default' : 'pointer',
                                            transition: 'border-color 0.2s',
                                            textAlign: 'center',
                                            padding: '10px',
                                            backgroundImage: userData.image ? `url(${userData.image})` : 'none',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            '&:hover': {
                                                borderColor: !userData.image ? '#006DB2' : 'transparent',
                                                color: !userData.image ? '#006DB2' : 'inherit',
                                            },
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        {!userData.image && (
                                            <>
                                                <span style={{ fontSize: '24px' }}>+</span>
                                                <span style={{ fontSize: '12px', marginTop: '10px', fontFamily: "'Montserrat', sans-serif" }}>Загрузить фотографию</span>
                                            </>
                                        )}
                                    </Box>
                                    
                                    {!userData.image && (
                                        <Typography sx={{ fontSize: '10px', color: '#A3A8C9', mt: 1, textAlign: 'center', fontFamily: "'Montserrat', sans-serif" }}>
                                            JPG до 5 МБ
                                        </Typography>
                                    )}

                                    {userData.image && (
                                        <Button 
                                            variant="text" 
                                            size="small" 
                                            onClick={triggerFileInput}
                                            sx={{ 
                                                mt: 1, 
                                                textTransform: 'none', 
                                                color: '#006DB2', 
                                                fontFamily: "'Montserrat', sans-serif",
                                                fontWeight: 500 
                                            }}
                                        >
                                            Изменить фото
                                        </Button>
                                    )}
                                </Box>

                                {/* Fields */}
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '180px 1fr' }, alignItems: 'center', gap: { xs: 1, sm: 0 } }}>
                                        <Typography sx={{ fontSize: '14px', color: '#A3A8C9', fontWeight: 500, fontFamily: "'Montserrat', sans-serif" }}>
                                            Логин:
                                        </Typography>
                                        <Typography sx={{ fontSize: '16px', color: '#000', fontWeight: 500, fontFamily: "'Montserrat', sans-serif" }}>
                                            {userData.email ? userData.email.split('@')[0] : ''}
                                        </Typography>
                                    </Box>

                                    <EditableField 
                                        label="Почта" 
                                        value={userData.email} 
                                        readOnly={true} 
                                    />

                                    <EditableField 
                                        label="Телефон" 
                                        value={userData.phone} 
                                        onSave={(val) => handleUpdate('phone', val)} 
                                    />

                                    <EditableField 
                                        label="Дата рождения" 
                                        value={userData.birth_date} 
                                        type="date"
                                        readOnly={true}
                                    />
                                    
                                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '180px 1fr' }, alignItems: 'center', gap: { xs: 1, sm: 0 } }}>
                                        <Typography sx={{ fontSize: '14px', color: '#A3A8C9', fontWeight: 500, fontFamily: "'Montserrat', sans-serif" }}>
                                            Роль:
                                        </Typography>
                                        <Typography sx={{ fontSize: '16px', color: '#000', fontWeight: 500, fontFamily: "'Montserrat', sans-serif" }}>
                                            {userData.role === 'admin' ? 'Администратор' : (userData.role === 'rop' ? 'Руководитель практики' : 'Студент')}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default AccountPage;
