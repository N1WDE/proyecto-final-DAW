import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 1. Mandamos llamar nuestras variables de entorno (Vite)
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

// 2. Configuramos los headers dinámicamente con la clave secreta
const axiosConfig = { 
    headers: { 'Authorization': API_KEY } 
};

// Thunks para Metas (Goals)
export const fetchGoals = createAsyncThunk('data/fetchGoals', async () => {
    const res = await axios.get(`${API_URL}/getGoals`, axiosConfig);
    return res.data;
});
export const addGoal = createAsyncThunk('data/addGoal', async (goalData) => {
    const res = await axios.post(`${API_URL}/addGoal`, goalData, axiosConfig);
    return res.data.goal;
});
export const removeGoal = createAsyncThunk('data/removeGoal', async (id) => {
    await axios.delete(`${API_URL}/removeGoal/${id}`, axiosConfig);
    return id;
});

// Thunks para Tareas (Tasks)
export const fetchTasks = createAsyncThunk('data/fetchTasks', async () => {
    const res = await axios.get(`${API_URL}/getTasks`, axiosConfig);
    return res.data;
});
export const addTask = createAsyncThunk('data/addTask', async (taskData) => {
    const res = await axios.post(`${API_URL}/addTask`, taskData, axiosConfig);
    return res.data.task;
});
export const removeTask = createAsyncThunk('data/removeTask', async (id) => {
    await axios.delete(`${API_URL}/removeTask/${id}`, axiosConfig);
    return id;
});

const dataSlice = createSlice({
    name: 'data',
    initialState: { goals: [], tasks: [], status: 'idle' },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Metas
            .addCase(fetchGoals.fulfilled, (state, action) => { state.goals = action.payload; })
            .addCase(addGoal.fulfilled, (state, action) => { state.goals.push(action.payload); })
            .addCase(removeGoal.fulfilled, (state, action) => { 
                state.goals = state.goals.filter(g => g._id !== action.payload); 
            })
            // Tareas
            .addCase(fetchTasks.fulfilled, (state, action) => { state.tasks = action.payload; })
            .addCase(addTask.fulfilled, (state, action) => { state.tasks.push(action.payload); })
            .addCase(removeTask.fulfilled, (state, action) => { 
                state.tasks = state.tasks.filter(t => t._id !== action.payload); 
            });
    }
});

export default dataSlice.reducer;