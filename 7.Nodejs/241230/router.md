# server.js

## 게시판 CRUD의 라우트

GET /board/list
GET /board/write
POST /board/write
GET /board/view/:id
GET /board/modify/:id
POST /board/modify/:id
POST /board/delete/:id

## 이미지 갤러리 CURD의 라우트(유저 프사 관리)

GET /gallary/list
GET /gallary/write
POST /gallary/write
GET /gallary/view/:id
GET /gallary/modify/:id
POST /gallary/modify/:id
POST /gallary/delete/:id

## 라우터를 활용한 계층 분리

그 이전에, 코드의 의미 파악과 관리가 효율적으로 되어있는지 명확히 파악하셔야 합니다
    
- 각 역할을 분리하여 책임을 명확히 합니다.
- 파일과 폴더별로 역할을 나누어 관리합니다.

게시판 구현 기준으로 CREATE와 READ를 이전처럼 먼저 구현해보도록 할게요.  
=> 라우터 계층 분리 작업

- 서버를 만들 수 있게 도와주는 외부 모듈
- 템플릿 엔진 외부 모듈

## 게시판 CRUD 요청과 응답을 기준으로 계층을 분리해보자

계층적 구조를 통해 각 역할을 분리

- controller

핵심 코드(로직)을 처리하고 데이터를 가공.
=> 게시글 CRUD의 실질적인 작업의 구현, 결과를 클라이언트에 응답.

- router

요청 URL(ex => `/list`)과 메서드(`get, post`)에 따라 위의 컨트롤러로 연결.

```sh
241230/
  ├── controllers/
  │      └── board.controller.js => 실질적인 코드
  ├── routers/
  │      └── board.routes.js => URL, 메서드        
  ├── data/
  │      └── board.data.js => 우리의 변수(데이터베이스 가정)
  ├── server.js => 서버를 열기위한 모듈과 템플릿 엔진 설정                     
```

## Router란?

### 현실세계에서의 비유

우체국의 우편물 분류기

- 우체국에서는 편지나 택배가 도착하면, 목적지에 따라 각 지역의 담당자(controller)에게 전달.
- Express의 router도 이와 비슷하게 클라이언트의 요청(URL, HTTP메서드)을 받아서,  
각 기능에 맞는 처리 담당자(핸들러 함수 => controller)로 전달하는 역할

GET /board/list 요청이 오면 => 게시판 관련 컨트롤러로 전달
GET /gallary/list 요청이 오면 => 이미지 갤러리 관련 컨트롤러로 전달

### 왜? 라우터를 사용?

1. 역할과 책임 분리 => 기능별로 분리
2. 코드의 가독성 증가 => 필요한 코드만 쉽게 찾을 수 있음.
3. 유지보수 용이