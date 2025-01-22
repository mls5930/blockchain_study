// const jwt = require('../lib/jwt');
const jwt = require('jsonwebtoken');
const userService = require('./user.service');

// GET /
const getList = (req, res) => {
    const { token } = req.cookies
    res.render('index.html', {
        token
    });
}

// GET /user/login
const getLogin = (req, res) => {
    res.render('user/login.html');
}

// POST /user/login
// 클라이언트에서 넘어온 값으로 DB에 유저가 있는지 판단
// 그리고 성공했다는 값을 응답해줄거임.
const postLogin = async(req, res) => {
    try {
        // 어떤 값이 넘어올까?
        const { user_id, user_pw } = req.body
        const user = await userService.findOne({ user_id, user_pw });
        const data = {
            userid: user_id,
            name: "Ju"
        }
        // token = eeejj.fefefefefef.efefefesfsef
        const token = jwt.sign(data,"wnqudgus1234", { expiresIn: "1m" });
        if (!user) res.status(401).json({success: false});
        // token = eeejj.fefefefefef.efefefesfsef
        res.setHeader('Set-Cookie', `token=${token}; path=/;`);
        // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiJ3bnF1ZGd1czEyMzQiLCJuYW1lIjoiSnUifQ.x4GQIndugK0UoyMzTJuOd996gdo4eYYglsZNEhOM8IE
        res.json({ success: true, redirect: "/" });
    } catch (error) {
        console.log(error);
    }
}

// POST /user/logout
const postLogout = (req, res) => {
  try {
    const access_token = req.headers["authorization"].split(" ")[1];
    jwt.verify(access_token, "wnqudgus1234");
    res.cookie('token', '', {
        expires: new Date(0),
        path: "/"
    })
    res.json({ success: true, redirect: "/" });
  } catch (error) {
    console.log(error);
    res.status(401).send("로그아웃 자격이 없습니다!");
  }
}

module.exports = {
    getList,
    getLogin,
    postLogin,
    postLogout
}


/*

// POST /user/logout
const postLogout = (req, res) => {
  try {
      // ['Bearer','eehehasdsad.fasfsafsaf.asfasfasf']
    // 'eehehasdsad.fasfsafsaf.asfasfasf'
    const access_token = req.headers["authorization"].split(" ")[1];
    // 두 번째 인자인 salt값은 노출되지 말아야 함!!
    // jsonwebtoken 라이브러리 npm install jsonwebtoken
    const flag = jwt.verify(access_token, "wnqudgus1234");
    // false 즉, 변조나 만료가 되지 않았을 때
    res.cookie('token', '', {
        // 쿠키 만료일을 과거로 설정
        expires: new Date(0),
        path: "/"
    })
    res.json({ success: true, redirect: "/" });
  } catch (error) {
    console.log(error);
    res.status(401).send("로그아웃 자격이 없습니다!");
  }
}
*/