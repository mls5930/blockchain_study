const express = require("express");
const app = express();

app.use(express.urlencoded({extended: true}));

app.get('/user/login', (req, res) => {
    res.sendFile(__dirname + "/views/user/login.html");
})

/*
    로그인 로직 구현 순서

    1. 요청 본문 확인
    2. 데이터베이스 뒤지겠죠? 값이 있는지 없는지
    3. 있다면? 쿠키 저장
    4. 페이지 리다이렉션
*/
app.post('/user/login', (req, res) => {
    const {user_id, user_pw } = req.body
    // 요청 Content-Type은? application/x-www-form-urlencoded
    // 응답 Content-Type은? text/html
    res.send("어떤 컨텐츠 타입이 올까?")
})

app.listen(3000, () => {
    console.log("서버가 잘 열림");
})

// form 화면, form 태그