const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


// Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err.message);
    } else {
        console.log('Connected to MySQL database.');
    }
});

// Middleware for JWT Authentication



const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        console.log('Authorization header missing.');
        return res.status(401).send('Access denied.');
    }

    const tokenParts = token.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        console.log('Token format incorrect:', token);
        return res.status(400).send('Invalid token format.');
    }

    try {
        const verified = jwt.verify(tokenParts[1], process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        console.log('Token verification error:', err.message);
        res.status(400).send('Invalid token.');
    }
};


// Routes

// Register User or Admin
app.post('/users/register', (req, res) => {
    const { name, email, mobile_number, password, passcode } = req.body;
    let role;

    if (passcode === process.env.ADMIN_PASSCODE) {
        role = 'admin';
    } else if (passcode === process.env.USER_PASSCODE) {
        role = 'user';
    } else {
        return res.status(400).send('Invalid passcode.');
    }

    const query = 'INSERT INTO users (name, email, mobile_number, password, passcode, role) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [name, email, mobile_number, password, passcode, role], (err, result) => {
        if (err) res.status(500).send(err.message);
        else res.send('User registered successfully.');
    });
});

// Fallback for GET requests to /users/register
app.get('/users/register', (req, res) => {
    res.status(405).send('Method Not Allowed. Please use POST for this endpoint.');
});

// Login User or Admin
app.post('/users/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) res.status(500).send(err.message);
        else if (results.length === 0) res.status(401).send('Invalid credentials.');
        else {
            const token = jwt.sign({ id: results[0].id, role: results[0].role }, process.env.JWT_SECRET, {
                expiresIn: '1d',
            });
            res.send({ token, role: results[0].role });
        }
    });
});










// Fetch Tasks - Admin or User
app.get('/tasks', authenticateUser, (req, res) => {
    // Role-based task fetching
    const query = req.user.role === 'admin' 
        ? 'SELECT * FROM tasks' 
        : 'SELECT * FROM tasks WHERE user_id = ?';

    const params = req.user.role === 'admin' ? [] : [req.user.id];

    // Execute the query
    db.query(query, params, (err, results) => {
        if (err) {
            console.error('Error fetching tasks:', err.message);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(results); // Send tasks as JSON
        }
    });
});


// Create Task - User Only
app.post('/tasks', authenticateUser, (req, res) => {
    if (req.user.role !== 'user') return res.status(403).send('Only users can create tasks.',);

    const { title, description, priority, due_date, status } = req.body;

    const query = 'INSERT INTO tasks (title, description, priority, due_date, status, user_id) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [title, description, priority, due_date, status, req.user.id], (err, result) => {
        if (err) {
            console.error('Error creating task:', err.message);
            res.status(500).send('Internal Server Error');
        } else {
            res.send('Task created successfully.');
        }
    });
});

// Update Task - User Only






app.put('/tasks/:id', authenticateUser, (req, res) => {
    const { id } = req.params;
    const { title, description, priority, due_date, status } = req.body;

    // Ensure only the task owner can update their task
    const query = 'UPDATE tasks SET title = ?, description = ?, priority = ?, due_date = ?, status = ? WHERE id = ? AND user_id = ?';
    db.query(query, [title, description, priority, due_date, status, id, req.user.id], (err, result) => {
        if (err) {
            console.error('Error updating task:', err.message);
            res.status(500).send('Internal Server Error');
        } else if (result.affectedRows === 0) {
            res.status(403).send('Unauthorized to update this task.');
            
        } else {
            res.send('Task updated successfully.');
        }
    });
});

// Delete Task - User or Admin
app.delete('/tasks/:id', authenticateUser, (req, res) => {
    const { id } = req.params;

    // Admins can delete any task; users can delete only their own tasks
    const query = req.user.role === 'admin' 
        ? 'DELETE FROM tasks WHERE id = ?' 
        : 'DELETE FROM tasks WHERE id = ? AND user_id = ?';

    const params = req.user.role === 'admin' ? [id] : [id, req.user.id];

    db.query(query, params, (err, result) => {
        if (err) {
            console.error('Error deleting task:', err.message);
            res.status(500).send('Internal Server Error');
        } else if (result.affectedRows === 0) {
            res.status(403).send('Unauthorized to delete this task.');
        } else {
            res.send('Task deleted successfully.');
        }
    });
});












// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));






