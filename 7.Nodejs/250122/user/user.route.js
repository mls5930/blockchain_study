const express = require('express');
const router = express.Router();
const userController = require('./user.controller');

// router.get('/', (req, res) => {});
router.get('/', userController.getList);
router.get('/user/login', userController.getLogin);
router.post('/user/login', userController.postLogin);
router.post('/user/logout', userController.postLogout);

module.exports = router