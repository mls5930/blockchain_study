// Step3 : 웹소켓 서버 설정
// socket.js 생성 후 웹소켓 함수 생성 및 이벤트 등록
const express = require('express');
const webSocket = require('./socket'); // ws방식
const app = express();

app.use(express.json());

const http = app.listen(3000, () => {
  console.log('server open');
});

webSocket(http);
