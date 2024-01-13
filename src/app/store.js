import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import albumReducer from '../features/albums/albumSlice'

export const store = configureStore ({
    reducer: {
        auth: authReducer,
        album: albumReducer
        
    }
})