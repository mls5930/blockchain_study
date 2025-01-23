const express = require('express');
const app = express();
require('dotenv').config();
const nunjucks = require('nunjucks');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.static('public'));
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
});

// 카카오 로그인 페이지와 통신하기 위해 사용되는 기본주소
const HOST = 'https://kauth.kakao.com';

app.get('/', (req, res) => {
  // URL-safe 문자열을 원래 형태로 디코딩
  const nickname = req.cookies.nickname ? decodeURIComponent(req.cookies.nickname) : null;

  res.render('index.html', {
    nickname: nickname,
  });
});

// 0. 사용자가 카카오 로그인 페이지 요청함.
app.get('/login/page', async(req, res) => {
  // 1. GET /oauth/authorize
  // HOST + /oauth/authorize + ?cilent_id, redirect_uri, response_type
  const REDIRECT_URI = "http://localhost:3000/oauth/kakao";
  const redirectURL = `${HOST}/oauth/authorize?client_id=${process.env.REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  res.redirect(redirectURL);
});

app.listen(3005, () => {
  console.log('클라이언트 서버');
});
