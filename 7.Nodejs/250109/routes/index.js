const express = require('express');
const router = express.Router();

const board = require('./board.route');
const cookie = require('./cookie.route');

router.use(board);
router.use(cookie);

module.exports = router;