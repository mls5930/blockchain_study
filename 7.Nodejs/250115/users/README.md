## 디렉토리 분리할거임

- repositorys: DB관련
- controllors: 실제로직 처리, 요청 응답
- routes: 요청 URL 경로 처리

## service는 왜 뺐나요?

너무 디렉토리가 많음. 복잡하다고 해서.

## 구현 순서

1. routes
2. controller
3. repository

## 파전(5분)

1. 손질하는 사람(1분)
2. 반죽하는 사람(1분)
3. 굽는 사람(1분) => 6분
4. 테이스팅 하는 사람(1분)
5. 서빙하는 사람(1분) => 6분

## 한 명이 책임과 역할을 다 할 수 있다.

`틀린게 아님.`

server.js로 예를 들면, 다 때려밖을 수 있겠죠?

근데, 역할과 책임을 분리해서 관리하는 개념에 접근해봤을 때,

1. 왜 분리했는지
2. 어떻게 분리하는지
3. 무슨 이점이 있는지

잘 파악해서 필요할 때 잘 줄이자 이거지.
파악을 하는거야.

`아 내가 봤을 때, 파전을 굽는데 한 사람이 책임져도 5분밖에 안걸리니`
`한 사람이 다 해도 되겠다!`

## 분리 감소

1. 손질(1분) 반죽(1분) 굽는(1분) 테이스팅(1분) 서빙(1분) 모두 한 사람

만약에 이 사람이 아파서 못나왔어 => 파전을 못만듦. => 파전을 만드는 방법 배우겠지(30분 ~ 1시간)

이에 대한 시간 비용이 많이든다.

12분 VS 30분

- 강요가 아니다.(틀린게 아니다)
- 다만, 잘 알고 디렉토리(역할과 책임)를 줄이자