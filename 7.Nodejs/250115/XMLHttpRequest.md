## XMLHttpRequest

### 요청 객체와 응답 객체

서버와 클라이언트 요청간에 이전 요청 및 응답의 값을 기억하지 않는다 => 비연결성
매번 소통할 수 있는 `정보` 가 필요했음.

- request
    - header
    - body
- response
    - header
    - body

### 요청의 구성

- Request Header: 요청의 정보를 담고 있음

    - 어떤 요청일까? (GET, POST, DELETE, PUT) => HTTP 메서드(행동) => 어떤 행동에 대한 요청일까?
    - 어떤 데이터 형식인지? (JSON, HTML 등)
    - Content-Type: 요청 데이터의 형식(application/json => JSON형태 구조)

- Request Body: 주로 POST요청에서 서버로 보내는 실제 데이터입니다.

    { 
        "user_id" : "wnqudgus1234"
    }

    - req.body, req.params, req.query

### 응답의 구성

- Response Header: 서버의 응답 정보를 담고 있습니다.

    - 요청이 성공했는지? (상태코드: 200, 404, 302 등)
    - 어떤 데이터 형식인지? (JSON, HTML 등) => text/html
    - Content-Type: 응답 데이터의 형식

- Response Body: 실제 응답 데이터.

    - res.send("데이터")
    - res.sendFile(__dirname + "/views/index.html")
    - res.json(data)

위의 ()안에있는 내용들을 Content라고 부름
그에 대한 컨텐츠의 타입을 `Content-Type`

### Content-Type이란?

클라이언트와 서버가 서로 주고받는 데이터의 형식을 알려주는 중요한 정보.  
예를 들면, "서버야 나 GET /user/:id 요청할건데 JSON 형식으로 데이터를 보낼거야 본문 내용은 다음과 같아"

```json
{
    "id" : 1
}
```

```HTML
<div>얘도 알겠지</div>
```

### 왜???? Content-Type이 있는데?

다루는 데이터 형식이 너무나도 다양함
주로 사용하는 Content-Type 종류는 다음과 같음

- `text/plain`: 일반 텍스트(문서 같은 내용)
- `text/html`: 웹 페이지 HTML 데이터
- `application/json`: JSON 데이터 (예 => { "name": "John" })
- `application/x-www-form-urlencoded`: 폼(폼태그)데이터를 전송할 때 사용
- `multipart/form-data`: 파일 업로드시 사용

### 아니 왜?? 문법만 보면 알잖아?

`클라이언트와 서버가 데이터를 올바르게 해석하고 주고받자`

### 먼저, 웹의 초기 역사

HTML 출현

웹이 처음 등장했을 때, HTML은 기본적인 문서 형식
즉, 사용자들은 웹 페이지를 요청할 때, HTML페이지가 나타나겠지?라고  
기본적으로 기대함.

문제 발생

HTML을 서버에서 담당하고 뿌려주다보니까, 부하가 발생할 수 있다.  
=> HTML 파일이 클 때 res.render, res.sendFile HTML 파일만 찾는게 아님. 

1. 이걸 먼저 읽어요.
2. 그리고 해석합니다.
3. 그리고 응답으로 보내주는거에요. 

위의 2번과 3번 사이가 HTML 파일이 크면 화면 출력이 너무 오래 걸림

해결점

server는 데이터만 응답해주고, client는 응답받은 데이터로 화면을 출력해주자

=> 역할과 책임 분리
=> text/html에서 application/json의 등장























### XMLHttpRequest란?

form태그로만 데이터 요청 타입을 지정하여 보내는건 한계가 있음.  
웹 페이지에서 새로고침 없이 데이터를 불러올 때 사용됩니다.  

### 새로고침?

여기서, 먼저 새로고침이 포함된 기존(우리가 했던 수업방식)의 요청-응답 방식을 이해해야함.

기존 방식

1. 글 작성 폼 입력
2. 폼 제출(폼태그 안에서 submit 버튼 땅 때렸을 때)
3. 서버 처리 후 응답
4. 페이지 리다이렉션