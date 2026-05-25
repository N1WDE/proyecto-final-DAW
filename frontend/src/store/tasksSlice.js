// src/store/tasksSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000';
const axiosConfig = {
    headers: { 'Authorization': 'tu_clave_secreta_aqui' } // En prod usa variables de entorno
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const response = await axios.get(`${API_URL}/getTasks`, axiosConfig);
    return response.data;
});

export const addTask = createAsyncThunk('tasks/addTask', async (taskData) => {
    const response = await axios.post(`${API_URL}/addTask`, taskData, axiosConfig);
    return response.data.task;
});

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: { list: [], status: 'idle' },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state.list = action.payload;
        });
        builder.addCase(addTask.fulfilled, (state, action) => {
            state.list.push(action.payload);
        });
    }
});

export default tasksSlice.reducer;