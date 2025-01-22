const express = require('express');
const router = express.Router();
const userController = require('./user.controller');
const userAuth = require('./user.middleware');

// router.get('/', (req, res) => {});
router.get('/', userController.getList);
router.get('/user/login', userController.getLogin);
router.post('/user/login', userController.postLogin);
router.post('/user/logout', userAuth.authMe, userController.postLogout);

module.exports = router