const pool = require('../config/db');

const createUser = async (username, email, password) => {
    const result = await pool.query(
        'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, password]
    );
    return result.rows[0];
};

const findUserByEmail = async (email) => {
    const result = await pool.query(
        'SELECT * FROM users WHERE email = $1', [email]
    );
    return result.rows[0];
};

const createVerificationToken = async (userId, token) => {
    await pool.query(
        'INSERT INTO verification_tokens (user_id, token) VALUES ($1, $2)',
        [userId, token]
    );
};

const findVerificationToken = async (token) => {
    const result = await pool.query(
        'SELECT * FROM verification_tokens WHERE token = $1 AND expires_at > NOW()',
        [token]
    );
    return result.rows[0];
};

const verifyUser = async (userId) => {
    await pool.query(
        'UPDATE users SET verified = TRUE WHERE id = $1',
        [userId]
    );
    await pool.query(
        'DELETE FROM verification_tokens WHERE user_id = $1',
        [userId]
    );
};

module.exports = { createUser, findUserByEmail, createVerificationToken, findVerificationToken, verifyUser };