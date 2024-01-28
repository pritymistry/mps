import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../redux/auth/authSlice'
import musicReducer from '../redux/MusicCds/MusicCdsSlice';

export const store=configureStore({
    reducer:{
        user:authReducer,
        musicCd:musicReducer
    }
});
