const express = require('express');
const router = express.Router();
const count = require('./count.route');

router.use(count);

module.exports = router;