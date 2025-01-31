// Step4 : 웹소켓 함수 선언 및 이벤트 등록
// 웹소켓 서버 설정을 위해 설치한 ws 사용
const Websocket = require('ws');

module.exports = (http) => {
  // 클라이언트들의 소켓 정보를 담을 배열
  // const => let으로 변경
  let sockets = [];
  // 웹소켓을 수신할 준비
  const server = new Websocket.Server({
    server: http
  })
  // socket: 고혜성 소켓에 대한 정보가 담김
  server.on("connection", (socket, request) => {
    // 현재 접속한 클라이언트 ip를 가져옴
    const ip = request.connection.remoteAddress;

    // 특정 클라이언트가 정상적으로 접속했을 때 발동함.
    if(socket.readyState === socket.OPEN) {
      sockets.push(socket);
      console.log(sockets.length);
      console.log(`${ip}님이 입장하셨습니다.`);
    }
    // Step7: 클라이언트가 보낸 메세지 받는 이벤트 등록
    // msg: 설 연휴 끝나서 힘들죠 ㅠ
    socket.on('message', (msg) => {
      // 메세지 작성한 클라이언트만 제외하고 모든 클라이언트한테 메세지 보냄
      for(const client of sockets) {
        if (client === socket) continue;
        client.send(`${msg}`)
      }
    })

    // 클라이언트가 접속을 끊었을 때, 발동함.
    socket.on('close', () => {
      // 클라이언트가 접속 끊었을 때, 배열(목록)에서 제거함
      // filter: 배열의 순회 메서드. 조건에 맞는 값들을 걸러서 새 배열로 만들어줌!
      // v => 주병현 소켓, 고혜성 소켓 순회가 됨.
      sockets = sockets.filter((v) => v !== socket);
      // [주병현소켓, 고혜성소켓]
      // 위 코드는, 순회해서 필터로 접속을 끊은 클라이언트를 제외하고 새롭게 담은 것.
      console.log(sockets.length); 
      console.log(`${ip} 님이 접속을 끊음.`);
    })
  })
}

/*
  server.on : 웹소켓 이벤트 등록 메소드
  chat.addEventListener('click')와 유사하게 이벤트 등록하는 것임!
  server.on("connection", (socket, request) => {

  매개변수 2가지

  socket: 클라이언트와 실제 데이터를 주고받고 이벤트를 처리하는데 사용
  request: 연결 요청 시점의 HTTP 정보를 가진 객체, 클라이언트 식별, 쿠키, 헤더 등을 확인 가능.

  socket.readyState: 현재 클라이언트의 웹소켓의 상태를 나타내는 값.
  => 어떤 클라이언트가 접속이 정상적이냐 아니냐? 연결에 따라 동적으로 바뀜.
  socket.OPEN: 연결이 성공적으로 완료되었을때의 숫자. 고정값임.

  | 상태         | 설명                                              | 상수값(숫자) |
  | ------------ | ------------------------------------------------- | ------------ |
  | `CONNECTING` | 웹소켓이 연결을 시도하는 중                       | `0`          |
  | `OPEN`       | 연결이 성공적으로 완료됨 (데이터 송수신 가능)     | `1`          |
  | `CLOSING`    | 연결을 닫는 중 (서버 또는 클라이언트가 종료 요청) | `2`          |
  | `CLOSED`     | 연결이 완전히 종료됨                              | `3`          |
*/
