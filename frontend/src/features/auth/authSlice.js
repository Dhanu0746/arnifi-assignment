import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const signupUser = createAsyncThunk('auth/signup', async (data, { rejectWithValue }) => {
    try {
        const res = await api.post('/auth/signup', data);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response.data.message);
    }
});

export const loginUser = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
    try {
        const res = await api.post('/auth/login', data);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response.data.message);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('token') || null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        const handlePending = (state) => {
            state.loading = true;
            state.error = null;
        };
        const handleFulfilled = (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
        };
        const handleRejected = (state, action) => {
            state.loading = false;
            state.error = action.payload;
        };

        builder
            .addCase(signupUser.pending, handlePending)
            .addCase(signupUser.fulfilled, handleFulfilled)
            .addCase(signupUser.rejected, handleRejected)
            .addCase(loginUser.pending, handlePending)
            .addCase(loginUser.fulfilled, handleFulfilled)
            .addCase(loginUser.rejected, handleRejected);
    }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;