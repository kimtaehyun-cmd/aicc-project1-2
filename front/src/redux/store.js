import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import modalReucer from './slices/modalSlice';
import apiReducer from './slices/apiSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReucer,
    api: apiReducer,
  },
});

export default store;
