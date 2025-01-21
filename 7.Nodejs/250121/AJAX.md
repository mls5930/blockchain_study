## 요청 객체와 응답 객체

서버와 클라이언트 요청간에 이전 요청 및 응답의 값을 기억하지 않는다 => 비연결성
매번 소통할 수 있는 `정보` 가 필요했음.

- request
    - header
    - body
- response
    - header
    - body

### 요청 객체의 구성

- Request Header: 요청의 정보를 담고 있음

    - 어떤 요청일까? (GET, POST, DELETE, PUT) => HTTP 메서드(행동) => 어떤 행동에 대한 요청일까?
    - 어떤 데이터 형식인지? (JSON, HTML 등)
    - Content-Type: 요청 데이터의 형식(application/json => JSON형태 구조)

- Request Body: 주로 POST요청에서 서버로 보내는 요청 값 입니다.

    { 
        "user_id" : "wnqudgus1234"
    }

    - req.body, req.params, req.query

### 응답 객체의 구성

- Response Header: 서버의 응답 정보를 담고 있습니다.

    - 요청이 성공했는지? (상태코드: 200, 404, 302 등)
    - 어떤 데이터 형식인지? (JSON, HTML 등) => text/html
    - Content-Type: 응답 데이터의 형식

- Response Body: 실제 응답 데이터.

    - res.send("데이터")
    - res.sendFile(__dirname + "/views/index.html")
    - res.json(data)
    - res.render("inde.html"{ boardList })

위의 ()안에있는 내용들을 Content라고 부름
그에 대한 컨텐츠의 타입을 `Content-Type`

### Content-Type이란?

클라이언트와 서버가 서로 주고받는 데이터의 형식을 알려주는 중요한 정보.  
예를 들면,  

"서버야 나 GET /user/:id 요청할건데 JSON 형식으로 데이터를 보낼거야  
본문 내용은 다음과 같아"

```json
{
    "id" : 1
}
```

```HTML
<div>얘도 알겠지</div>
```

### 왜???? Content-Type이 왜 있어야 하는데?

다루는 데이터 형식이 너무나도 다양함
주로 사용하는 Content-Type 종류는 다음과 같음

- `text/plain`: 일반 텍스트(문서처럼 단순한 내용)
- `text/html`: 웹 페이지 HTML 데이터
- `application/json`: JSON 데이터 (예 => { "name": "John" })
- `application/x-www-form-urlencoded`: 폼(폼 태그)데이터를 전송할 때 사용
- `multipart/form-data`: 파일 업로드시 사용 => enctype="multipart/form-data"

### 아니 왜?? 문법만 보면 알잖아?

`클라이언트와 서버가 데이터를 올바르게 해석하고 주고받자`

## 먼저, 웹의 초기 역사

HTML 출현

웹의 초창기에는 HTML이 기본적인 데이터 형식이었습니다.  
서버는 주로 HTML 문서를 생성해서 클라이언트에 전달했습니다.  
서버가 데이터뿐만 아니라 HTML 렌더링까지 담당하다 보니 부하가 증가하는 문제가 있었습니다.

### 문제 발생

HTML을 서버에서 `만들`고 클라이언트에게 보내주다 보니까, 부하가 발생할 수 있다.  
=> HTML 파일 자체가 용량이 거대할 때, res.render, res.sendFile HTML 파일만 찾아서 띡 내보내주는게 아님.

1. 서버가 HTML 파일을 읽고,
2. 해당 파일을 해석하여 내용을 채우고,
3. 클라이언트에 응답으로 전송.

이 과정에서 HTML 파일이 클수록 서버 처리 시간과 전송 시간이 늘어났습니다.  
특히, 동적 콘텐츠가 많을수록 서버의 부하가 심각해졌습니다.

### 해결점

server는 데이터만 응답해주고, client는 응답받은 데이터로 화면을 출력해주자
=> 역할과 책임 분리

- 서버: 데이터만 제공 (application/json)
- 클라이언트: 데이터를 받아 화면을 렌더링 (text/html은 클라이언트가 처리)

## AJAX(Asynchronous JavaScript and XML)

그래서, 클라이언트가 서버에게 데이터를 요청할 수 있게끔 제공하는 기술이
AJAX입니다.

### XMLHttpRequest란?

`서버와의 비동기 통신에 필요한 객체`

쉽게말하면

`브라우저가 서버랑 대화할 수 있게 도와주는 도구`

우리가 웹 페이지를 보다가 데이터를 새로 받아오고 싶을 때, 페이지를 다시 `새로고침`하지 않고도 서버에 요청을 보낼 수 있다.

## 디렉토리 구조

├─ user
│  ├─ user.controller.js
│  ├─ user.repository.js
│  ├─ user.route.js
│  └─ user.service.js

## 구현 순서

1. route
2. controller
3. serivce
4. repository

## 현재 디렉토리 구조

```
250121
├─ .env
├─ AJAX.md
├─ config.js
├─ model
│  ├─ index.js
│  └─ user.model.js
├─ package-lock.json
├─ package.json
├─ README.md
├─ reqres.md
├─ server.js
├─ user
│  ├─ user.controller.js
│  ├─ user.repository.js
│  ├─ user.route.js
│  └─ user.service.js
└─ views
   ├─ index.html
   └─ user
      └─ login.html
```

## 로그인

로그인 이전에 클라이언트가 책임질 검사

- 빈 값
- 특수문자, 대문자, 한 문자씩 들어가야 합니다.

### 기존 방식

로그인을 예로 듦

1. 로그인 페이지에 들어옴
2. 유저 아이디, 유저 비번 입력 후 폼 제출(사용자가 폼 태그 안의 submit 버튼을 땅 때렸을 때)
3. 서버 처리 후 응답
4. 클라이언트는 응답 받고 페이지 리다이렉션 /

### AJAX 방식

1. 로그인 페이지에 들어옴
2. 유저 아이디, 유저 비번 입력 후 폼 제출(사용자가 폼 태그 안의 submit 버튼을 땅 때렸을 때)
3. 필요한 유효성 검사 후 XMLHttpRequest()객체로 form 값 다시 작성 후 서버에 요청 
4. 서버는 요청 값 확인 후 필요한 `데이터`를 응답 
5. 클라이언트는 데이터에 따라 화면 출력

### 여기서 알 수 있는거?

서버에서 응답이 돌아오더라도, 클라이언트는 해당 응답을 단순히 데이터로 취급

- 서버: 데이터 응답
- 클라이언트: 화면 출력

역할과 책임 분리

## 다음에는 뭐할까?

- 프론트엔드
- 백엔드

폴더별 서버 분리