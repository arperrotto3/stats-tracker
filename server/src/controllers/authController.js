const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { createUser, findUserByEmail, createVerificationToken, findVerificationToken, verifyUser } = require('../models/userModel');
const { sendVerificationEmail } = require('../config/emailService');
const { create } = require('domain');

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser(username, email, hashedPassword);

        const token = crypto.randomBytes(32).toString('hex');

        await createVerificationToken(user.id, token);

        await sendVerificationEmail(email, token);

        res.status(201).json({ message: 'Registration successful! Please check your email to verify your account.' });

    }   catch (err) {
        res.status(500).json({ error: 'Server Error: ' + err.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        if (!user.verified) {
            return res.status(400).json({ error: 'Please verify your email before logging in. Check your inbox.' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({ token, user: { id: user.id, username: user.username, email: user.email } });

    } catch (err) {
        res.status(500).json({ error: 'Server Error: ' + err.message });
    }
};

const verify = async (req, res) => {
    try {
        const { token } = req.query;

        const verificationToken = await findVerificationToken(token);

        if (!verificationToken) {
            return res.status(400).json({ error: 'Invalid or expired verification link.' });
        }

        await verifyUser(verificationToken.user_id);

        res.json({ message: 'Email verified successfully! You can now log in.' });

    } catch (err) {
        res.status(500).json({ error: 'Server error: ' + err.message });
    }
};

module.exports = { register, login, verify };