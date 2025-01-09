const express = require('express');
const router = express.Router();
const path = require('path')

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login/login.html'));
})

router.post('/cookie/create', (req, res) => {
    const { user_id } = req.body
    res.cookie("user_id", user_id);
    res.redirect('/board/list');
})

router.get('/cookie/list', (req, res) => {
    console.log(req.cookies.token);
    res.send("쿠키를 가져올 수 있나?");
})

module.exports = router

// res.setHeader: HTTP 응답 헤더를 설정하는 Express 메서드
// Set-Cookie: 클라이언트(브라우저)에게 쿠키를 설정하라는 명령 전달.
// token=Ju;: 쿠키의 이름(token)과 값(Ju)를 설정
// Domain=127.0.0.1;: localhost에서만 쿠기가 유효합니다.

// 브라우저 너는 "token=Ju라는 이름의 쿠키를 저장해. 
// 하지만 이 쿠키는 127.0.0.1에서만 사용할 수 있어!"