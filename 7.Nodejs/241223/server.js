// 라이브서버를 사용하지 않습니다 왜? 우리가 서버를 만들 수 있으니까.
const express = require("express");
const app = express();
const PORT = process.env.SERVER_PORT ? process.env.SERVER_PORT : 3000

const userList = [
    {
        userId: "wnqudgus5565",
        userPw: 1234
    }
]

// 바디 파서
// req.body가 undefined로 나오는 이유는 express.js에서 요청 본문(body)를 파싱하기 위한
// 것이 설정되어 있지 않았기 때문에
// 기본적으로 express는 요청 본문(request body)로 온 값들은 자동으로 파싱하지 않음.

// express.urlencoded 미들웨어
app.use(express.urlencoded({ extended : true }))

app.get('/', (req, res) => {
    res.send("<h1>안녕하세요!</h1>")
})

// http://localhost:3000/create
// 최초의 create.html 화면을 출력할 필요가 있을때
app.get('/create', (req, res) => {
    res.sendFile(__dirname + '/create.html');
})

// 사용자가 userId와 userPw를 입력하고 버튼을 "땅" 때렸고 /create에 요청했을 때,
app.post('/create',(req, res)=> {
    const { userId, userPw } = req.body;
    // 중복 검사
    const userExists = userList.some((user)=> user.userId === userId);

    // 중복된 경우 409 상태 코드를 보내고 error/409.html 에러 파일을 내보냄
    if(userExists) {
        return res.status(409).sendFile(__dirname + "/error/409.html")
    }

    userList.push({userId, userPw});

    res.status(201).json({
        message: "너 재능있어 성공했어"
    })
})

app.listen(PORT, () => {
    console.log("나는 최상단 루트에 server.js");
})