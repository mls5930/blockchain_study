const express = require('express');
const router = express.Router();
const authRouter = require('./auth.route');
const authMiddleware = require('../middlewares/auth.middleware')

router.get('/', authMiddleware.authMe, (req, res) => {
    res.render('index.html', {
      userInfo: req.user || {} // req.user가 없을 경우 기본값 설정
    });
});

router.use('/auth', authRouter)

module.exports = router