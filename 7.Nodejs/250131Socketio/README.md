# socket.io

WebSocket기반 실시간 양방향 통신 구현 라이브러리

## 기존 WebSocket 통신 특징

- 이벤트 이름이 고정(`connection`, `message` ,`open` ,`close`)
- ws:// 프로토콜로 연결

## socket.io 특징

- 커스텀 이벤트 사용(`reply`, `chat`, `game` 등등...) => 이벤트 이름
내가 지을 수 있음.
- 일반 http 프로토콜로 연결(롱폴링 지원)
- 웹소켓이 지원되지 않는 환경에서는 Long Polling 등을 사용

웹소켓이 없었다면...?

## polling

클라이언트가 일정한 주기로 서버에 요청을 보내 데이터를 받아오는 방식
웹소켓 방식이 아님!!

- 클라이언트가 주기적으로 서버에 요청
- 서버는 데이터가 있든 없든 항상 응답을 보냄
- 응답이 끝나면 연결이 즉시 종료(4-way-handshake)
- 실시간 데이터 수신에는 비효율적...

그래서 보완한게 롱 폴링방식임.

## long polling

- 클라이언트가 서버에 요청 보냄
- 서버는 즉시 응답 안함. 새로운 데이터가 생길때까지 기다림....
- 데이터가 발생하면, 서버가 응답을 보내고 연결 종료.
- 클라이언트는 응답을 받은 후, 다시 요청을 보내 연결 유지

단점의 핵심은 하나!

이것 또한 요청-응답이 반복됨. 그리고 양방향 통신이라고 불리기 어려움.

이럴거면....웹소켓 만들어줄게....그거 사용해!

하지만, 웹소켓은 코드가 너무 길어지고 사용하기 복잡해

## 웹소켓 기반 socket.io

socket.io기반 실시간 임시 채팅 구현해볼거임!

### 백엔드

```sh
npm install socket.io
```

### 프론트엔드

CDN 사용
CDN: 로컬에 모듈을 설치하지 않고, 외부 서버의 객체(기능)을 가져와서 사용

```html
<script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>
```

## 주의

흐름에 집중하셔야 합니당.

## 1. front에 server.js 및 views/index.html 수정

`server.js`

```js
// 제거
app.use(express.static("public"))
```

public 폴더 제거

`views/index.html`

```html
<!-- 제거 -->
<script src="/js/index.js"></script>
```