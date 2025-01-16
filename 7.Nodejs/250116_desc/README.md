## Sequelize 여러분에겐 아직 선녀가 아니다.

익숙하지 않아서 그렇다.

납득의 영역

## 무조건 기준은 sequelize

### 흐름

`아 데이터베이스 ORM으로 테이블 만들고 쉽게 써야쓰겄다.`

sequelize라는게 있네? 얘한테 정보 넘겨줘야겠죠?
뭘 넘길까?

- 데이터베이스 연결 및 서버 정보(config.js)
- 테이블과 해당 테이블의 구조(model)

아 위처럼 구분 짓기 너무 어렵다....ㅠ  
변수 하나에 연결정보와 테이블 구조 싹 다 넣어서  
걍 변수로 편하게 써야겠다  

```js
const sequelize = 데이터베이스.모든정보(연결설정, 모델정보);
```

이거를 지금 server.js에 몰빵할거에요.
함수형 프로그래밍으로

## server.js 흐름

1. Express 서버 실행.
2. Sequelize로 데이터베이스 연결.
3. Sequelize 모델(Comment)을 정의.
4. 서버 시작시, 데이터베이스와 테이블 동기화(sync).
5. 데이터베이스 테이블에 값 조작.

```sh
npm init -y
npm install express mysql2 sequelize
```

server.js파일 생성