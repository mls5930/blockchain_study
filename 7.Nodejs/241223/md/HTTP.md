아까 설명드렸던 OSI 7계층 => TCP/IP 4계층에서 응용 계층에서 우리가 서버를 만들고  
요청과 응답처리가 이루어진다고 했죠?  

웹 서버를 만들고, 요청과 응답 처리 => TCP/IP 4계층  
여기서 우리는 Express(외부 모듈)을 사용하여 서버를 만들고, HTTP 요청과 응답처리

## HTTP란?

HyperText Transfer Protocol의 약자.  
웹 브라우저와 웹 서버간에 데이터를 주고 받기 위해서 사용하는 프로토콜(규칙)입니다.  

## 프로토콜?

네트워크에서 데이터를 주고받는 규칙이나 절차  
네트워크 상에서 장치들이 서로 통신하기 위해서 따라야 하는 일종의 "규칙"  

우리가 대화할 때, 문법을 따라야 서로 이해할 수 있는 것처럼,  
컴퓨터와 네트워크 장치들도 프로토콜을 따라야 올바르게 통신할 수 있음.  

### 정상적일때

웹 브라우저 => 안녕하세요 ㅎㅎ 해당 페이지 보여주세요 http://localhost:3000/list 코드 요청
웹 서버 => 안녕하세요 ㅎㅎ 네 보여드릴게요 => http://localhost:3000/list 라우팅 코드 응답(200상태 코드 또는 202상태 코드...)

### 정상적이지 못하다고 할 때

웹 브라우저 => 안녕하세요 ㅎㅎ 해당 페이지 보여주세요 http://localhost:3000/lists 코드 요청
웹 서버 => 안녕...어라? 저희는 `list` 가 있지 `lists` 는 없는데요? 없어요 ㅠ(404상태 코드)
웹 브라우저 => 404코드와 다양한 메세지를 받음 그리고 '아이구...잘못 보냈구나...아 오타가 있었네?'

### 요청 메세지(request message) => 헤더와 바디

#### 아래는 헤더 메세지 값임

메타데이터를 포함하여 요청이나 응답의 정보에 대한 설명을 제공

```sh
GET / HTTP/1.1
Host: localhost:3000
Connection: keep-alive
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
Accept-Encoding: gzip, deflate, br
Accept-Language: en-US,en;q=0.9
```

- Host: 요청 대상 서버의 호스트 이름 => localhost:3000
- User-Agent: 클라이언트의 정보(브라우저, OS 등) => chrome, window
- Accept: 클라이언트가 수신 가능한 데이터 형식
- Content-Type: 요청 본문의 데이터 형식
- Authorization: 인증 정보

### body는 언제 나와요?

요청 바디에는 클라이언트가 서버로 전송되는 실제 데이터가 포함.  
GET이 아닌 주로 POST요청에서 사용됨.