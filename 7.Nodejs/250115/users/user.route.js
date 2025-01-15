const express = require('express');
const router = express.Router()

/*
    첫 번째 단계 설계

    1. 홈 화면 페이지 => GET /
    2. 로그인 화면 페이지 => GET /user/login
    3. 로그인 폼 제출 => POST /user/login
*/

router.get('/', userController.getList);
router.get('/user/login', userController.loginPage);
router.post('/user/login', userController.loginConnect);

module.exports = router