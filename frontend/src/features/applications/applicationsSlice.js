import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchAppliedJobs = createAsyncThunk('applications/fetchAll', async (_, { rejectWithValue }) => {
    try {
        const res = await api.get('/applications');
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response.data.message);
    }
});

const applicationsSlice = createSlice({
    name: 'applications',
    initialState: {
        appliedJobs: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAppliedJobs.pending, (state) => { state.loading = true; })
            .addCase(fetchAppliedJobs.fulfilled, (state, action) => {
                state.loading = false;
                state.appliedJobs = action.payload;
            })
            .addCase(fetchAppliedJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default applicationsSlice.reducer;