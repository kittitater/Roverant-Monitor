const express = require('express');
const router = express.Router();
const pool = require('../db-connection');

// GET /users
router.get('/', (_req, res) => {
    // Logic to fetch all users from the database
    // Replace this with your own implementation
    const users = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Alice Johnson' },
        { id: 4, name: 'Bob Smith' }
    ];

    res.json(users);
});

// POST /users
router.post('/', (_req, res) => {
    // Logic to create a new user in the database
    // Replace this with your own implementation
    const newUser = {
        id: 3,
        name: 'New User',
    };

    res.status(201).json(newUser);
});

// GET /users/:id
router.get('/:id', (req, res) => {
    // Logic to fetch a specific user by ID from the database
    // Replace this with your own implementation
    const user = {
        id: req.params.id,
        name: 'John Doe',
    };

    res.json(user);
});

// PUT /users/:id
router.put('/:id', (req, res) => {
    // Logic to update a specific user by ID in the database
    // Replace this with your own implementation
    const updatedUser = {
        id: req.params.id,
        name: 'Updated User',
    };

    res.json(updatedUser);
});

// DELETE /users/:id
router.delete('/:id', (_req, res) => {
    // Logic to delete a specific user by ID from the database
    // Replace this with your own implementation

    res.sendStatus(204);
});

module.exports = router;