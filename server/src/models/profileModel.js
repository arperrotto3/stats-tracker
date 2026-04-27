const pool = require('../config/db');

const getUserProfile = async (userId) => {
    const result = await pool.query(
        'SELECT * FROM user_profiles WHERE user_id = $1',
        [userId]
    );
    return result.rows[0];
};

const saveUserProfile = async (userId, riotGameName, riotTagLine) => {
    const result = await pool.query(
        `INSERT INTO user_profiles (user_id, riot_game_name, riot_tag_line)
        VALUES ($1, $2, $3)
        ON CONFLICT (user_id)
        DO UPDATE SET riot_game_name = $2, riot_tag_line = $3, updated_at = NOW()
        RETURNING *`,
        [userId, riotGameName, riotTagLine]
    );
    return result.rows[0];
};

const getTrackedPlayers = async (userId) => {
    const result = await pool.query(
        'SELECT * FROM tracked_players WHERE user_id = $1 ORDER BY created_at DESC',
        [userId]
    );
    return result.rows;
};

const addTrackedPlayer = async (userId, gameName, tagLine, nickname) => {
    const result = await pool.query(
        `INSERT INTO tracked_players (user_id, game_name, tag_line, nickname)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [userId, gameName, tagLine, nickname || null]
    );
    return result.rows[0];
};

const updateTrackedPlayer = async (id, userId, nickname) => {
    const result = await pool.query(
        `UPDATE tracked_players SET nickname = $1
        WHERE id = $2 AND user_id = $3
        RETURNING *`,
        [nickname, id, userId]
    );
    return result.rows[0];
};

const deleteTrackedPlayer = async (id, userId) => {
    await pool.query(
        'DELETE FROM tracked_players WHERE id = $1 AND user_id = $2',
        [id, userId]
    );
};

module.exports = { getUserProfile, saveUserProfile, getTrackedPlayers, addTrackedPlayer, updateTrackedPlayer, deleteTrackedPlayer };