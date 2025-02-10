const axios = require('axios');
const jwt = require('jsonwebtoken');

const getAuth = async(req, res) => {
    const KAKAO_TOKEN_HOST = process.env.KAKAO_TOKEN_HOST
    const API_KEY = process.env.API_KEY
    const REDIRECT_URI = process.env.REDIRECT_URI
    const KAKAO_API_HOST = process.env.KAKAO_API_HOST

    const { code } = req.query;
    if(!code) return res.status(400).send("Auth code not provided");

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

    const { access_token } = tokenResponse.data;
    if(!access_token) return res.status(401).send("토큰이 만료되었거나 변조됨!");
  
    const user = await axios.get(`${KAKAO_API_HOST}/v2/user/me`, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
    
    if(!user) res.status(404).send("사용자 정보가 없습니다.");
  
    const { properties } = user.data;
    
    const jwt_token = jwt.sign(properties, process.env.SECRET_KEY,{
      expiresIn: "1m"
    });
    
    res.setHeader('Set-Cookie', `access_token=${jwt_token}; Domain=localhost; Path=/; Secure; HttpOnly;`)
    res.redirect('http://localhost:3005');
}

module.exports = {
    getAuth
}