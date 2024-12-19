const express = require("express");
const app = express();

app.get('/', ()=> {
    console.log("정말 이게 나올까요?");
})

// ?userId=wnqudgus&name=Ju
app.get('/login', (request, response)=> {
    const { userId } = request.query
    response.send(userId);
    console.log("나는 서버를 먼저 킨다음에 콘솔 로그를 작성한 아이야");
})

// 서버 시작점
app.listen(3000, () => {
    console.log('express server open');
})

// express 외부 모듈을 사용해서 서버를 하나 생성했다.