const express = require('express');
const app = express();
require('dotenv').config();
const axios = require("axios");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// 카카오 검증 서비스 서버
const KAKAO_TOKEN_HOST = process.env.KAKAO_TOKEN_HOST
// 여러분들 API_KEY
const API_KEY = process.env.API_KEY
// 우리가 검증해줄게 또 어디로 보내면 돼?
const REDIRECT_URI = process.env.REDIRECT_URI
// 사용자 정보 조회 HOST
const KAKAO_API_HOST = process.env.KAKAO_API_HOST

// http://localhost:3000/oauth/kakao
app.get('/oauth/kakao', async (req, res) => {
  // 인가 코드 부여
  // 너네 쇼핑몰(예를 들어서) 이용하고 싶어? 그러면 인가코드 보내줄게
  // 정보 모아서 카카오 검증 서버에 다시 요청해
  const { code } = req.query;
  if(!code) return res.status(400).send("Auth code not provided");
  // 위의 인가 코드로 사용자 정보 조회할 수 있음.
  // HOST주소, API_KEY, 리다이렉트 URI
  // STEP2: 토큰 받기 POST /oauth/token
  const tokenResponse = await axios.post(`${KAKAO_TOKEN_HOST}/oauth/token`, null, {
    params: {
      grant_type: "authorization_code",
      client_id: API_KEY,
      redirect_uri: REDIRECT_URI,
      code
    },
    headers: {
      "Content-Type" : "application/x-www-form-urlencoded"
    }
  });
  // 카카오가 넘겨주는 data 정보
  // Authorization: `Bearer ${access_token}`
  // STEP3: 토큰 발급
  const { access_token } = tokenResponse.data;
  if(!access_token) return res.status(401).send("토큰이 만료되었거나 변조됨!");

  // STEP4: 발급받은 토큰으로 사용자 정보 조회
  const user = await axios.get(`${KAKAO_API_HOST}/v2/user/me`, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
  
  if(!user) res.status(404).send("사용자 정보가 없습니다.");

  const { properties } = user.data;
  // 저의 카카오 정보는 "한글"입니다
  // 쿠키 값은 반드시 URL-safe 문자열이어야 하기 때문
  
  // 지금은 그냥 닉네임을 쿠키에 넣어놨음
  // 하지만, 저 위의 user.data를 이용해서 JWT 토큰 발급하여 쿠키에 넣어줘야 함. => payload
  // 그건 여러분들이 한 번 해보세요.
  res.setHeader('Set-Cookie', `nickname=${encodeURIComponent(properties.nickname)}; Domain=localhost; Path=/; Secure; HttpOnly;`)
  res.redirect('http://localhost:3005');
})

app.listen(3000, () => {
  console.log(`백엔드 서버`);
});
