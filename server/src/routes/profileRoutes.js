const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getProfile, saveProfile, getTracked, addTracked, updateTracked, deleteTracked } = require('../controllers/profileController');

router.get('/profile', authMiddleware, getProfile);
router.post('/profile', authMiddleware, saveProfile);

router.get('/tracked', authMiddleware, getTracked);
router.post('/tracked', authMiddleware, addTracked);
router.put('/tracked/:id', authMiddleware, updateTracked);
router.delete('/tracked/:id', authMiddleware, deleteTracked);

module.exports = router;