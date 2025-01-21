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
        res.setHeader('Set-Cookie', `token=${user.userid}; path=/;`);
        // res.redirect("/")
        res.json({ success: true, redirect: "/" });
    } catch (error) {
        console.log(error);
    }
}

// POST /user/logout
const postLogout = (req, res) => {
    res.cookie('token', '', {
        // 쿠키 만료일을 과거로 설정
        expires: new Date(0),
        path: "/"
    })
    res.json({ redirect: "/" });
}

module.exports = {
    getList,
    getLogin,
    postLogin,
    postLogout
}