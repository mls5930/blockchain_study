// Step2 : WebSocket 인스턴스 생성 및 서버에 연결하기
const socket = new WebSocket('ws://localhost:3000');

const chat = document.querySelector('#chat');
const frm = document.querySelector('#frm');

// Step6 : 메세지 수신/발신 기능 작성

// 2. 수신: 특정 클라이언트가 서버에 보낸 메세지를 받아서 동적으로 화면에 뿌려줌
socket.addEventListener('message', (e) => {
  // e.data: 설 연휴 끝나서 힘들죠 ㅠ
  console.log(`서버에서 받은 메세지 : ${e.data}`);
  const li = document.createElement('li');
  li.innerHTML = e.data;
  chat.append(li);
})

// 1. 발신: 특정 클라이언트(나!)가 작성한 메세지를 웹소켓 서버에 보냄!
frm.addEventListener('submit', (e) => {
  e.preventDefault();
  const { message } = e.target;
  // 서버한테 내가 작성한 메세지 보냄!
  // 설 연휴 끝나서 힘들죠 ㅠ
  socket.send(message.value);

  // 내가 작성한 메세지를 화면에 출력함
  const li = document.createElement('li');
  li.classList.add('right');
  li.innerHTML = message.value;
  chat.append(li);

  // 메세지 보냈으니, input 초기화
  e.target.reset();
  message.focus();
})

/*
  new WebSocket('ws://localhost:3000');

  위 코드는 클라이언트(Web 브라우저)가 웹소켓 서버에 연결을 시도하는 코드.
  이 때, ws:// 프로토콜 사용하여 웹소켓 서버와의 연결을 열고 유지.

  즉, 웹소켓 핸드셰이크 요청. 
  즉, 웹소켓 연결하고 싶은데 지원하나요?의 의미
*/