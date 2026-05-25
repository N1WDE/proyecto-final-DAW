const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 1. Middleware de Autorización por API Key
const verifyApiKey = (req, res, next) => {
    const apiKey = req.headers['authorization'];
    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(403).json({ message: 'No autorizado. API Key inválida.' });
    }
    next();
};

// 2. Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error conectando a MongoDB:', err));

// 3. Modelos Mongoose (Simplificados)
const TaskSchema = new mongoose.Schema({ title: String, deadline: Date, goalId: String });
const GoalSchema = new mongoose.Schema({ title: String, deadline: Date });

const Task = mongoose.model('Task', TaskSchema);
const Goal = mongoose.model('Goal', GoalSchema);

// Aplicar middleware de auth a todas las rutas
app.use(verifyApiKey);

// 4. Endpoints

// GET
app.get('/getTasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.get('/getGoals', async (req, res) => {
    const goals = await Goal.find();
    res.json(goals);
});

// POST
app.post('/addTask', async (req, res) => {
    const newTask = new Task(req.body);
    await newTask.save();
    res.json({ message: 'Tarea agregada', task: newTask });
});

app.post('/addGoal', async (req, res) => {
    const newGoal = new Goal(req.body);
    await newGoal.save();
    res.json({ message: 'Meta agregada', goal: newGoal });
});

// DELETE
app.delete('/removeTask/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tarea eliminada' });
});

app.delete('/removeGoal/:id', async (req, res) => {
    await Goal.findByIdAndDelete(req.params.id);
    res.json({ message: 'Meta eliminada' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));