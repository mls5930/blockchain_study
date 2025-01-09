// 서버 만들기 및 템플릿 엔진 모듈 불러오기
const express = require("express");
const nunjucks = require("nunjucks");
const router = require('./routes')
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.SERVER_PORT ? process.env.SERVER_PORT : 3000;
// 템플릿 엔진 설정
app.set('view engine', 'html');
nunjucks.configure("views", {
    express: app
})
// 정적 파일 허용 => 정적 파일의 경로 설정
app.use(express.static('public'));

// 미들웨어 사용
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

app.use(router);
// 서버 유지
app.listen(PORT, () => {
    console.log("서버가 잘 열렸는지 확인하는 용도");
});

