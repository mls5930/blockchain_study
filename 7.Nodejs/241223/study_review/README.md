이 실습은 Express.js를 사용하여 서버와 클라이언트 간의 요청 및 응답의 기본 개념을 이해하고,  
CRUD와 유사한 기능을 구현하는 데 중점을 둡니다.  
데이터베이스를 다루기 전에, 서버에서 데이터를 어떻게 처리하고,  
클라이언트에게 어떻게 응답을 전달하는지에 대한 이해를 돕기 위한 실습입니다.  

### 유저 목록

```js
const userList = [
    {
        userId: "wnqudgus1234",
        name: "wnqudgus"
    }
]
```

### 실습 목표

1. Express.js 서버 환경을 구축하고 기본적인 CRUD API를 작성합니다.
2. 서버와 클라이언트 간의 요청 및 응답의 흐름을 이해합니다.
3. 데이터베이스를 사용하기 전, 서버에서 데이터를 다루는 방식에 대해 실습합니다.

### study 폴더 생성

### 사전 설치

1. npm init - 프로젝트 초기화
2. 필요한 외부 모듈 설치 - 필요한 외부 모듈을 설치합니다.

### 실습 목차

3. 유저 목록 조회 - GET 요청을 사용해 유저 목록을 조회하는 API 작성
4. 유저 목록 수정 - 특정 유저 정보를 수정하는 API 작성
5. 특정 유저 생성 - 새로운 유저를 추가하는 API 작성
6. 특정 유저 삭제 - 특정 유저를 삭제하는 API 작성

### API 작성

1. 유저 목록 조회 (GET /list) 유저의 전체 리스트를 보여주세요

```js
app.get('/list', (req,res) => {});
```

2. 유저 목록 수정 (GET /modify) 수정된 유저를 브라우저 화면에 출력해주세요

```js
app.get('/modify', (req, res) => {
    const { userId, modifyId, name } = req.query;
});
```

3. 특정 유저 생성 (GET /create) 등록된 유저를 브라우저 화면에 출력해주세요

```js
app.get('/create', (req, res) => {
    const { userId, name } = req.query;
});
```

4. 특정 유저 삭제 (GET /delete) 삭제된 유저를 브라우저 화면에 출력해주세요

```js
app.get('/delete', (req, res) => {
    const { userId } = req.query;
});
```

위의 API를 이용해서 간단하게 브라우저 화면에 출력해주세요
다 됐으면 각 API별로 모듈 폴더 만들어서 관리해주세요.

user/list.service
user/modify.service
user/create.service
user/delete.service

그리고, server.js의 API 선언 부분에 콜백 함수로 넣습니다.  
다 되면 가지고 나오세요.  