import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchJobs = createAsyncThunk('jobs/fetchAll', async (_, { rejectWithValue }) => {
    try {
        const res = await api.get('/jobs');
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response.data.message);
    }
});

export const applyToJob = createAsyncThunk('jobs/apply', async (jobId, { rejectWithValue }) => {
    try {
        const res = await api.post(`/jobs/${jobId}/apply`);
        return { jobId, ...res.data };
    } catch (err) {
        return rejectWithValue(err.response.data.message);
    }
});
export const createJob = createAsyncThunk('jobs/create', async (data, { rejectWithValue }) => {
    try {
        const res = await api.post('/jobs', data);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response.data.message);
    }
});

export const updateJob = createAsyncThunk('jobs/update', async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await api.put(`/jobs/${id}`, data);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response.data.message);
    }
});

export const deleteJob = createAsyncThunk('jobs/delete', async (id, { rejectWithValue }) => {
    try {
        await api.delete(`/jobs/${id}`);
        return id;
    } catch (err) {
        return rejectWithValue(err.response.data.message);
    }
});

const jobsSlice = createSlice({
    name: 'jobs',
    initialState: {
        jobs: [],
        appliedJobIds: [],
        loading: false,
        applyingId: null,
        error: null,
    },
    reducers: {
        setAppliedJobIds: (state, action) => {
            state.appliedJobIds = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobs.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchJobs.fulfilled, (state, action) => { state.loading = false; state.jobs = action.payload; })
            .addCase(fetchJobs.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
            .addCase(applyToJob.pending, (state, action) => { state.applyingId = action.meta.arg; })
            .addCase(applyToJob.fulfilled, (state, action) => {
                state.applyingId = null;
                state.appliedJobIds.push(action.payload.jobId);
            })
            .addCase(applyToJob.rejected, (state) => { state.applyingId = null; })
            .addCase(createJob.fulfilled, (state, action) => {
                state.jobs.push(action.payload);
            })
            .addCase(updateJob.fulfilled, (state, action) => {
                const index = state.jobs.findIndex((j) => j._id === action.payload._id);
                if (index !== -1) state.jobs[index] = action.payload;
            })
            .addCase(deleteJob.fulfilled, (state, action) => {
                state.jobs = state.jobs.filter((j) => j._id !== action.payload);
            });

    }
});

export const { setAppliedJobIds } = jobsSlice.actions;
export default jobsSlice.reducer;