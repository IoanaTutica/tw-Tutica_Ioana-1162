const express = require('express');
const router = express.Router();
const User = require('../database/models/User');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    try {
        const { username, password, email } = req.body;

        const user = await User.create({
            username,
            password,
            email
        });
        
        res.status(201).json({ message: 'User creat', user });
    } catch (err) {
        res.status(500).json({ message: 'Eroare server', error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: 'Parola incorecta' });
        }

        const token = jwt.sign({ id: user.id }, 'cheie_secreta_proiect', { expiresIn: '1h' });
        
        res.status(200).json({ message: 'Login reusit', token });
    } catch (err) {
        res.status(500).json({ message: 'Eroare server', error: err.message });
    }
});

module.exports = router;