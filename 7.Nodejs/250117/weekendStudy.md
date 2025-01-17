# 주말 실습: sequelize & multer을 활용한 BookCovery 최대한 구현하기.

- 이미지 등록
- 데이터 베이스에 이미지 path 저장 및 파일 이름 저장

DELETE 구현 제외

## 로직

1. 최초로 `/` 로 이동.
2. index.html 화면이 브라우저에 렌더링 됨.
3. index.html 화면에서 파일 업로드 폼이랑 여태 저장한 이미지 파일들이 보여야 함.
4. index.html에서 파일을 업로드 함.
5. index.html로 다시 redirect하여 이미지가 추가되어야 함.
6. index.html에서 이미지 리스트 이미지를 누르면 view.html로 이동함.
7. 이미지가 보이고 오른쪽에는 책의 제목이 나와야 함.

## 팁

- 데이터베이스에는 `이미지 경로` 를 저장
- view 페이지로 이동할 때, `이미지 경로` 를 꺼내서 html에 뿌려줍니다.

즉,

uploads => 이미지 자체 파일
데이터베이스 => 이미지 경로 저장

## 필요한 모듈 설치

- express
- multer
- nunjucks
- sequelize
- mysql2
- dotenv

## 상단 외부 모듈 끌어오는 코드

```js
// 시퀄라이즈 설정
const { Book, sequelize } = require('./model');
// multer 설정
const multerUpload = require('./file.middleware')
```

## model/file.model.js

```js
const CommentModel = (sequelize, DataTypes) => {}
module.exports = CommentModel
```

## model/index.js

```js
const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config')
const CommentModel = require('./comment.model')
const db = config.db.development;
// 시퀄라이즈 연결 인스턴스 객체 생성
```

# 서버구현

## 루트 페이지 라우트

```js
app.get('/', async (req, res) => {
    // 데이터 베이스에서 전체 목록 가져오기
    // index.html 페이지 응답 내보내고 전체 목록 값 같이 보내기
});
```

## 업로드 페이지 라우트

```js
app.get('/uploads/:filename', (req, res) => {
    // view.html 응답 보내세요.
});
```

## 파일 업로드 요청 라우트

```js
app.post('/upload', multerUpload.single('file'), async (req, res) => {
    // req.file로 filename, path 꺼냄.
    // 파일 정보를 데이터베이스에 저장.
    // 루트로 리다이텍트
});
```

## 화면 페이지 구현

- index.html
- view.html

## 서버 시작

```js
// 서버 시작
app.listen(PORT, async () => {
    await sequelize.sync();
    console.log(`Server running on http://localhost:${PORT}`);
});
```

## 폴더 디렉토리 구조

```sh
250117_weekend_study
├─ .env
├─ config.js
├─ feedback.md
├─ file.middleware.js
├─ model
│  ├─ file.model.js
│  └─ index.js
├─ package-lock.json
├─ package.json
├─ README.md
├─ server.js
├─ uploads
│  ├─ ....jpg
│  ├─ ....jpg
│  └─ ....png
└─ views
   ├─ index.html
   └─ view.html
```

## 다 작성하면

- 250117_weekend_study 레포지토리 생성 후 push