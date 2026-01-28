import axios from 'axios';

const login = async (email, password) => {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);

    const response = await axios.post('/api/auth/login', formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
    }
    return response.data;
};

const register = async (fullname, email, password, role) => {
    const response = await axios.post('/api/user/', {
        fullname,
        email,
        password,
        role
    });
    return response.data;
};

const getMe = async () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    try {
        const response = await axios.get('/api/user/me', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching current user:", error);
        return null;
    }
};

const updateMe = async (data) => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const response = await axios.put('/api/user/me', data, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

const logout = () => {
    localStorage.removeItem('token');
};

export default {
    login,
    register,
    getMe,
    updateMe,
    logout
};
