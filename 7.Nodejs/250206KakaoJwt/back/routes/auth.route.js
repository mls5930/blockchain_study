const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/kakao', authController.getAuth);

module.exports = router;