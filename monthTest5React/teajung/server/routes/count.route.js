const express = require('express');
const router = express.Router();
const {getCount, postCount } = require('../controllers/count.cotroller');


router.get('/count', getCount);
router.post('/count', postCount);


module.exports =  router;
