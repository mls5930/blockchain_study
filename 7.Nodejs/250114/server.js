const express = require("express");
// const { checkCookie } = require('./cookie.middleware')
const cookieParser = require('cookie-parser');
const app = express();
// 모든 라우트에다가 쿠키파서를 사용하겠다.
app.use(cookieParser());

app.get('/createCookie', (req, res) => {
    // res.setHeader('name', "imName");
    res.setHeader('Set-Cookie', "user_id=wnqudgus1234; Domain=localhost; Path=/;");
    // 7.Nodejs/250114/views/index.html
    res.sendFile(__dirname + '/views/index.html');
})

// 쿠키를 항상 미들웨어 만들어서 이렇게 사용해야하나요?
// 아닙니다. => cookie-parser
app.get('/getCookie', (req, res) => {
    // req.headers.cookie
    const cookie = req.cookies;
    console.log(cookie);
    res.send("쿠키 잘 나옴?")
})

// 게시판 리스트 라우트를 작성했다고 치고, 쿠키가 여기서도 가져와지는지 확인
// 코드가 중복되므로, 이걸 미들웨어에서 계속 체크해서 넣어주면 되겠다!
app.get('/board/list', (req, res) => {
    // req.headers.cookie
    const cookie = req.cookies;
    console.log(cookie);
    res.sendFile(__dirname + '/views/list.html');
})

app.listen(3000, () => {
    console.log("서버 열림");
})

/*
    쿠키를 만드는 방법 두 가지

    1. 브라우저에서 쿠키 만들기 => document.cookie = 'username=Ju'
    2. 서버에서 브라우저에게 쿠키를 저장하라고 하기 => res.setHeader()

    결국은, 쿠키는 클라이언트(브라우저)에서 저장한다.

    Set-Cookie: 클라이언트(브라우저)에게 쿠키를 설정하라는 명령 전달.
    token=Ju;: 쿠키의 이름(token)과 값(Ju)를 설정
    Domain=localhost;: localhost에서만 쿠키가 유효합니다.

    "브라우저 너는 token=Ju라는 이름의 쿠키를 저장해. 
    하지만 이 쿠키는 localhost에서만 사용할 수 있어!"

    // user_id=wnqudgus1234
    // const cookieArray = req.headers.cookie.split("=");
    // ["user_id", "wnqudgus1234"] 
    // console.log(cookieArray[1]);
    // 배열로서 처리한다는 건, 인덱스로 특정해서 사용한다는건데
    // 이는 다소 좀 좋지 않음. => 유연성 부족, 확장성 부족
    // 객체로 만들어 => 데이터 타입 구조를 변경 배열에서 객체로
*/