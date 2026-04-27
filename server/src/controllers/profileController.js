const { getUserProfile, saveUserProfile, getTrackedPlayers, addTrackedPlayer, updateTrackedPlayer, deleteTrackedPlayer } = require('../models/profileModel');

const getProfile = async (req, res) => {
    try {
        const profile = await getUserProfile(req.user.id);
        res.json(profile || {});
    } catch (err) {
        res.status(500).json({ error: 'Server error: ' + err.message });
    }
};

const saveProfile = async (req, res) => {
    try {
        const { riotGameName, riotTagLine } = req.body;
        const profile = await saveUserProfile(req.user.id, riotGameName, riotTagLine);
        res.json(profile);
    } catch (err) {
        res.status(500).json({ error: 'Server error: ' + err.message });
    }
};

const getTracked = async (req, res) => {
    try {
        const players = await getTrackedPlayers(req.user.id);
        res.json(players);
    } catch (err) {
        res.status(500).json({ error: 'Server error: ' + err.message });
    }
};

const addTracked = async (req, res) => {
    try {
        const { gameName, tagLine, nickname } = req.body;
        const player = await addTrackedPlayer(req.user.id, gameName, tagLine, nickname);
        res.status(201).json(player);
    } catch (err) {
        if (err.code === '23505') {
            return res.status(400).json({ error: 'You are already tracking this player' });
        }
        res.status(500).json({ error: 'Server error: ' + err.message });
    }
};

const updateTracked = async (req, res) => {
    try {
        const {id} = req.params;
        const {nickname} = req.body;
        const player = await updateTrackedPlayer(id, req.user.id, nickname);
        if (!player) {
            return res.status(404).json({ error: 'Player not found' });
        }
        res.json(player);
    } catch (err) {
        res.status(500).json({ error: 'Server error: ' + err.message });
    }
};

const deleteTracked = async (req, res) => {
    try {
        const {id} = req.params;
        await deleteTrackedPlayer(id, req.user.id);
        res.json({ message: 'Player removed from watchlist' });
    } catch (err) {
        res.status(500).json({ error: 'Server error: ' + err.message });
    }
};

module.exports = {getProfile, saveProfile, getTracked, addTracked, updateTracked, deleteTracked};