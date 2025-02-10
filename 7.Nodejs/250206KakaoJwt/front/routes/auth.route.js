const express = require('express');
const router = express.Router();

router.get('/kakao', async(req, res) => {  
    const HOST = 'https://kauth.kakao.com';
    const REDIRECT_URI = "http://localhost:3000/oauth/kakao";
    const redirectURL = `${HOST}/oauth/authorize?client_id=${process.env.REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    res.redirect(redirectURL);
});

module.exports = router;