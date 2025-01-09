## Cookie

- localStorage
- sessionStorage
- cookie

## 공통점

브라우저에 key-value로 값을 저장한다.

왜?

HTTP 통신한다라고 했을 때, HTTP는 비연결성 프로토콜입니다.
즉, 서버는 클라이언트(요청을 보내는 주체)가 이전에 어떤 요청을 보냈는지 기억하지 못함.

예시

사용자가 입력값을 입력한 후, 서버에 요청 값을 보냄(user_id 등등)

```js
app.post('/board/write', (req, res) => {
    const { user_id, writer, title, content } = req.body
    (대충 코드 로직...)
    res.redirect('/board/list');
})
```

그 이후에 list 페이지로 갔다고 쳐요

```js
app.get('/board/list', (req, res) => {
    const { user_id, writer, title, content } = req.body => // 전부 다 undefined
    console.log(user_id);
    res.render('board/list.html', {
        boardList
    })
})
```

비연결성의 한계를 해결하기 위해서 **쿠키** 를 활용합니다.

- header
    - cookie
- body

## 지금 뭐 때문에 cookie 만드는 예제를 진행함?

`나` 라는 사람의 인증

### 게시판으로 보자면

- 게시글 작성
- 특정 게시물 수정

쿠키를 이용하여 간단한 나를 인증하는 코드를 작성해보자

## 순서

1. npm install cookie-parser => 쿠키 사용 허용
2. routes/cookie.route.js 생성
3. 로그인 로직 구현 => cookie만듦
4. middleware에 간단한 인증/인가 구현(로그인 했는지 안했는지)

middlewares/cookie.middleware.js 생성

5. 게시글 작성 라우트에 인증/인가 미들웨어 적용
