import axios from 'axios';

const API_URL = 'http://localhost:3005/api/v1/users/'

//Registrar un usuario
const register = async(userData) => {
    const response = await axios.post(API_URL,userData)
    return response.data
}

// Login de Usuario
const login = async(userData) => {
    const response = await axios.post(API_URL + 'login', userData)
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

// Logout Usuario
const logout = async () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    login,
    logout
}

export default authService