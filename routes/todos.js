const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

// Create a new To-Do
router.post('/', async (req, res, next) => {
    try {
        const { title, description } = req.body;
        if (!title) return res.status(400).json({ error: 'Title is required' });

        const newTodo = new Todo({ title, description });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        next(error);
    }
});

// Retrieve all To-Dos
router.get('/', async (req, res, next) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        next(error);
    }
});

// Retrieve a To-Do by ID
router.get('/:id', async (req, res, next) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ error: 'To-Do not found' });

        res.status(200).json(todo);
    } catch (error) {
        next(error);
    }
});

// Update a To-Do by ID
router.put('/:id', async (req, res, next) => {
    try {
        const { title, description, completed } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { title, description, completed },
            { new: true, runValidators: true }
        );

        if (!updatedTodo) return res.status(404).json({ error: 'To-Do not found' });
        res.status(200).json(updatedTodo);
    } catch (error) {
        next(error);
    }
});

// Delete a To-Do by ID
router.delete('/:id', async (req, res, next) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) return res.status(404).json({ error: 'To-Do not found' });

        res.status(200).json({ message: 'To-Do item deleted successfully' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;

