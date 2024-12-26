const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
const path = __dirname + '/views/board';

app.set('view engine', 'html');

nunjucks.configure('views', {
    express: app,
})

app.use(express.urlencoded({ extended: true }));

// CRUD => Create
const boardList = [
    {
        id: 1,
        user_id: "wnqudgus5565",
        writer: "주병현",
        title: "오늘 수업은 HTTP 통신 프로토콜",
        content: "학생들이 정말 재밌어해요 하하ㅏ",
        hit: 0 // 조회수
    },
    {
        id: 2,
        user_id: "rhgPtjd2232",
        writer: "고혜성",
        title: "교수님이 즐거웠으면 그걸로 됐어...(혼자 재밌어하고 말이야...)",
        content: "증말로...(아 힘들다...)",
        hit: 0 // 조회수
    },
]
// get => 페이지를 주세요 => 페이지 조회
// post => 데이터를 수정해주세요 => 데이터 수정

app.get('/list', (req, res) => {
    res.render('./board/list.html', {
        boardList
    })
});

// create 페이지를 주세요
app.get('/create', (req, res) => {
    res.sendFile(path + "/create.html");
})
// 템플릿 엔진
app.get('/view', (req, res) => {
    const { id } = req.query;
    const board = boardList.find((value) => value.id === parseInt(id));
    res.render('./board/view.html', {
        board
    });
})

app.post('/create', (req, res) => {
    const { writer, title, content } = req.body

    boardList.push({
        id: boardList.length + 1,
        user_id: "wnqudgus5565",
        writer: writer,
        title: title,
        content: content,
        hit: 0
    })
    // view페이지로 넘길겁니다. => 상세 페이지 왜? 내가 글을 정상적으로 썼느지, 그리고
    // 리스트 페이지에서 글을 클릭했을 때에도 상세 페이지가 필요함.
    res.redirect(`/view?id=${boardList.length}`);
})

app.listen(3000, () => {
    console.log("server start");
});

/*
    res.redirect

    클라이언트(브라우저)에게 다른 URL로 이동하라는 명령을 전달하는 응답 => 302번

    app.get('/view', (req, res) => {
    const { id } = req.query;
    // let board;
    // for(let i = 0; i < boardList.length; i++){
    //     if(boardList[i].id === parseInt(id)){
    //         board = boardList[i];
    //     }
    // }
    // 아래의 코드는 위의 코드와 같다.
    const board = boardList.find((value) => value.id === parseInt(id));
    console.log(board);
    })

    nunjucks

    템플릿 엔진 외부 모듈 라이브러리

    HTML 파일 내에 동적인 데이터를 삽입할 수 있도록 도와주는 라이브러리
    자바스크립트 기반 템플릿 엔진입니다.
    Node.js환경에서 주로 사용합니다.

--------------------------------------------------------------
    지금 이러한 CRUD 형태를 SSR 렌더링이라고 합니다
    => 서버에서 HTML을 생성해서 클라이언트(브라우저)에게 응답.
    => res.send("<h1>안녕하세요!</h1>")
    => html 코드를 여기서 생성해서 클라이언트에게 응답.
    
    Q. 교수님! 그럼 res.render(/view.html)의 코드만 봤을 때
    이미 view.html은 views/boards에 "만들어"져 있잖아요? 
    근데 서버에서 또 다시 만든다는게....??? 납득이 안돼네요?

    A. res.render()는 HTML 파일 자체를 "만드는" 게 아니라, 
    기존에 존재하는 템플릿 파일(예: view.html)을 읽고, 
    그 템플릿에 데이터를 삽입해서 완성된 HTML을 생성합니다.

    그리고 브라우저에 응답을 보내주는거에요.

*/