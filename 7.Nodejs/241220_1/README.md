package-lock.json
패키지 매니저가 패키지를 설치할 때 각 패키지의 정확한 버전과 의존성을 설명해주는 역할.
TODO require, import
require() => CommonJS

## localhost

현재 컴퓨터를 가리키는 도메인 이름(127.0.0.1).
우리 폴더에서 server.js에서 서버를 연 포트는 3000번
localhost:3000 => 서버가 실행 중인 포트번호는 3000번이다
=> (Express 서버가 3000번 포트를 사용하도록 설정한 경우)

localhost:3000
localhost:3000/

## /

서버의 주소 뒤에 나오는 /은 URL 경로의 최상위(루트) 경로
클라이언트(요청을 보내는 주체)가 브라우저에서 localhost:3000에 접속하면,
Express는 get("/")라우트를 찾습니다.

## 라우팅이란?

클라이언트(요청을 보내는 주체)가 특정 URL 경로로 요청을 보내면 서버가 요청을 받아서
알맞은 응답을 돌려주는 과정 => 라우트는 그에 맞는 주소(도메인 뒤에 나오는 특정 주소)

## 서버가 열렸다고 가정하고, 브라우저에서 최초로 localhost:3000로 접속하면?

```js
// req = request 객체, res = response 객체
app.get('/', (req, res) => {
    res.send('<h1>Welcome to my server!</h1>');
});
```

1. 최초로 클라이언트(요청을 보내는 주체 => 사용자)가 브라우저 URL에 따라 요청을 보냄
=> http://localhost:3000
2. 그럼 브라우저에서 localhost:3000번대 주소를 찾음
3. app.get('/')라우트를 찾음. 그리고 해당 라우트 스코프 안에 코드를 실행시킴
4. 브라우저는 응답을 받음

## req? res?

주의! 매개변수로 받은 req, res는 매개변수이기 때문에, 이름을 아무렇게나 지어도 되긴합니다.

req와 res는 Express.js에서 제공하는 요청(request)과 응답(response) 객체입니다.

### req

클라이언트가 서버에 보낸 요청 정보를 담고 있는 객체

- HTTP 메서드(GET, POST, PUT 등)
- 요청 URL
- 쿼리 파라미터
- 요청 본문
- 헤더 정보

#### 주요 프로퍼티

req.query => URL의 쿼리스트링 파라미터('?userId=wnqudgus' <= 이건예시입니다.)
req.method => 요청의 HTTP 메소드(GET, POST)
req.params => URL 경로 파라미터
req.url => 요청 URL

#### res

서버가 클라이언트에게 보낼 응답 정보를 담는 객체

#### 주요 내용

- HTTP 응답 상태 코드(예: 200, 404, 500). => 응답이 성공에 대한 번호와 실패에 대한 번호가 존재함.
- 응답 데이터(HTML, JSON, 파일)
- 응답 헤더 설정

#### 주요 메소드(객체 안의 함수)

res.send() => 텍스트, HTML, 또는 데이터를 클라이언트에게 응답.
res.json() => JSON 데이터로 응답하겠다.
res.status() => 응답 상태 코드 설정
res.redirect() => 클라이언트를 다른 URL로 리디렉션