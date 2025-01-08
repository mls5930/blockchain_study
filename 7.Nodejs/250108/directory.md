## 역할과 책임

### 개요

오늘 수업은 디렉토리 구조 분리입니다.  
그 이전에, 우리가 데이터 베이스 이전에 어떻게 폴더를 분리했고,  
이 다음에는 또 어떤식으로 디렉토리 구조를 설계할지 먼저 설명하는 단계입니다.

### 역할과 책임을 나누는 기준

`요청` 과 `응답` 을 기준으로 역할과 책임 분리 

### 데이터 베이스 배우기 전에 디렉토리 구조가 어떻게 됐더라?

```js
const express = require("express");
const app = express();

app.listen(3000, ()=> {
    console.log("server start")
})
```

### 간단한 예시

```js
app.get('/comment/list', (req, res) => {
    res.render('comment/list.html', {
        commentList
    })
})
```

바로 위의 코드를 역할과 책임 분리 해보자(디렉토리 기준)  

### routes 폴더

역할: 클라이언트가 요청한 URL에 따라서 알맞은 콜백 함수 찾아줌

- routes/comment.route.js

```js
app.get('/comment/list', getList);
```

### data 폴더

역할: 유저가 작성한 댓글의 데이터

- data/comment.data.js

```js
const comment = [
    {
        id: 1,
        user_id: "wnqudgus1234",
        content: "내용",
        created_at: "2025-01-08"
    }
]

module.exports = comment;
```

### controllers 폴더

- controllers/comment.controller.js

클라이언트에서 보낸 요청 값 확인 후 실제 로직 처리 그리고 응답

```js
const boardList = require('../data/board.data')

const getList = (req, res) => {
    res.render('board/list.html', {
        boardList
    })
}
```

### 사실...위의 controllers는 역할과 책임이 2개 입니다.

- 실제 로직 처리
- 요청 값 확인, 클라이언트에게 응답

### 그렇다면....분리를 해보자 이거야.

참고로 아래 코드는 댓글 생성 기능을 기준으로 controllers의 역할을 분리해보자 이겁니다.  
왜냐면, getList로는 요청과 응답, 실제 코드 작성. 이 두 가지를 분리하기 힘들어서임.  
아! DB도 포함된 예제 코드임!

### controllers 폴더

- controllers/comment.controller.js

클라이언트에서 보낸 요청 값 확인 후 그리고 응답

```js
const boardList = require('../data/board.data.js');
const commentService = require('../services/comment.service.js')
// 댓글 생성 기능
const postCommentWrite = async(req, res) => {
    const { user_id, content } = req.body
    await commentService.create(user_id, content);
    res.redirect('/comment/list');
}
```

### services 폴더

역할: 실제 로직 처리

repository 폴더에 있는 SQL문으로 작성된 함수에 필요한 인자 전달도 합니다.

- services/comment.service.js

```js
const comment = require('./repository/comment.repository.js')

const create = async(user_id, content) => {
    // 댓글 작성 외에 기타 등등 필요한 기능도 있을 수 있음
    // 예를 들어 날짜를 가공한 함수를 호출하여 반환값을 받음
    // 2025-01-08
    const date = getDate();
    /* 
        {
            id:1,
            user_id: "wnqudgus1234",
            content: "여러분들! 흐름에 집중!",
            created_at: "Tue Jan 07 2025 10:35:09 GMT+0900 (Korean Standard Time)"
        }
        위의 코드는 아래 result 변수의 예상값임.
    */
    const [result] = await comment.create(user_id, content);
    const value = {
        id: result.id,
        user_id: result.user.id,
        content: result.content,
        created_at: date
    }
    return value
}

module.exports = {
    create
}
```

### repositorys

- repositorys/comment.repository.js

역할: 데이터베이스 연결 및 코드(SQL문 작성)

데이터베이스에 관련된 역할만.

```js
// pool은 DB와 연결을 했다 가정하고 가져옴.
const pool = require('./db');
const create = async(user_id, content) => {
    return await pool.query(`
        INSERT INTO comment(user_id, content) values("${user_id}", "${content}");
    `)
}
```

## 제가 개인적으로 추천하는 구현 순위

1. routes
2. controllers
3. services
4. repositorys

여러분들이 지금 구현하기에 편한 순서는 다음과 같을거임(위의 역순)

1. repositorys: 데이터베이스 쿼리문 작성
2. services: 실질적인 기능 로직 작성 및 레포지토리에 인자값 전달
3. controllers: 요청과 응답 처리
4. routes: 클라이언트 요청 URL에 따라서 응답 처리

## DELETE 구현