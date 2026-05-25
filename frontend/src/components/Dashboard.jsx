import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, Form, Button, ListGroup, Badge } from 'react-bootstrap';
import { fetchGoals, addGoal, removeGoal, fetchTasks, addTask, removeTask } from '../store/dataSlice';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { goals, tasks } = useSelector(state => state.data);

    // Estados locales para los formularios
    const [goalTitle, setGoalTitle] = useState('');
    const [goalDeadline, setGoalDeadline] = useState('');
    
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDeadline, setTaskDeadline] = useState('');
    const [selectedGoal, setSelectedGoal] = useState('');

    useEffect(() => {
        dispatch(fetchGoals());
        dispatch(fetchTasks());
    }, [dispatch]);

    // Manejadores de envío
    const handleAddGoal = (e) => {
        e.preventDefault();
        if(goalTitle && goalDeadline) {
            dispatch(addGoal({ title: goalTitle, deadline: goalDeadline }));
            setGoalTitle(''); setGoalDeadline('');
        }
    };

    const handleAddTask = (e) => {
        e.preventDefault();
        if(taskTitle && taskDeadline && selectedGoal) {
            dispatch(addTask({ title: taskTitle, deadline: taskDeadline, goalId: selectedGoal }));
            setTaskTitle(''); setTaskDeadline(''); setSelectedGoal('');
        }
    };

    return (
        <Container className="mt-5 dashboard-container">
            <h1 className="text-center text-primary mb-5 fw-bold">Sistema de Metas y Tareas</h1>
            <Row>
                {/* COLUMNA DE METAS */}
                <Col md={6}>
                    <Card className="custom-card shadow-sm mb-4">
                        <Card.Body>
                            <Card.Title className="fs-4 border-bottom pb-2">🎯 Mis Metas</Card.Title>
                            <Form onSubmit={handleAddGoal} className="mb-4">
                                <Form.Group className="mb-2">
                                    <Form.Control type="text" placeholder="Nueva meta..." value={goalTitle} onChange={e => setGoalTitle(e.target.value)} required />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Control type="date" value={goalDeadline} onChange={e => setGoalDeadline(e.target.value)} required />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100">Agregar Meta</Button>
                            </Form>

                            <ListGroup>
                                {goals.map(goal => (
                                    <ListGroup.Item key={goal._id} className="d-flex justify-content-between align-items-start">
                                        <div>
                                            <div className="fw-bold">{goal.title}</div>
                                            <small className="text-muted">Límite: {new Date(goal.deadline).toLocaleDateString()}</small>
                                        </div>
                                        <Button variant="danger" size="sm" onClick={() => dispatch(removeGoal(goal._id))}>X</Button>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>

                {/* COLUMNA DE TAREAS */}
                <Col md={6}>
                    <Card className="custom-card shadow-sm mb-4">
                        <Card.Body>
                            <Card.Title className="fs-4 border-bottom pb-2">✅ Mis Tareas</Card.Title>
                            <Form onSubmit={handleAddTask} className="mb-4">
                                <Form.Group className="mb-2">
                                    <Form.Control type="text" placeholder="Nueva tarea..." value={taskTitle} onChange={e => setTaskTitle(e.target.value)} required />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Control type="date" value={taskDeadline} onChange={e => setTaskDeadline(e.target.value)} required />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Select value={selectedGoal} onChange={e => setSelectedGoal(e.target.value)} required>
                                        <option value="">Asignar a una meta...</option>
                                        {goals.map(g => (
                                            <option key={g._id} value={g._id}>{g.title}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Button variant="success" type="submit" className="w-100">Agregar Tarea</Button>
                            </Form>

                            <ListGroup>
                                {tasks.map(task => {
                                    const linkedGoal = goals.find(g => g._id === task.goalId);
                                    return (
                                        <ListGroup.Item key={task._id} className="d-flex justify-content-between align-items-start">
                                            <div>
                                                <div className="fw-bold">{task.title}</div>
                                                <small className="text-muted d-block">Límite: {new Date(task.deadline).toLocaleDateString()}</small>
                                                {linkedGoal && <Badge bg="info" className="mt-1">Meta: {linkedGoal.title}</Badge>}
                                            </div>
                                            <Button variant="outline-danger" size="sm" onClick={() => dispatch(removeTask(task._id))}>X</Button>
                                        </ListGroup.Item>
                                    );
                                })}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;