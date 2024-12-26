const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
const path = __dirname + '/views/board';

app.set('view engine', 'html');

nunjucks.configure('views', {
    express: app,
})

// express.urlencoded는 내부적으로 next()함수가 실행되어 있습니다.
// 그래서 없어도 미들웨어가 실행되고 다음으로 넘어갑니다.
app.use(express.urlencoded({ extended: true }));
// 글로벌 미들웨어
// app.use => 미들웨어를 등록하거나 사용하는 함수
app.use((req, res, next) => {
    console.log(req.query);
    console.log("누구누구 사용자가 이때 접속했어요!", req.url ,new Date().toISOString());
    next();
})

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
        hit: 0 
    },
]

app.get('/list', (req, res) => {
    console.log("나는 라우트 미들웨어 이전에찍힐까? 아니면 이후에 찍힐까?");
    res.render('./board/list.html', {
        boardList
    })
});

app.get('/create', (req, res) => {
    res.sendFile(path + "/create.html");
})

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

    res.redirect(`/view?id=${boardList.length}`);
})

app.post('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = boardList.findIndex((value) => value.id === id)
    if(index === -1) {
        res.status(404).send("해당 아이디를 찾지 못하였습니다.");
    }
    boardList.splice(index, 1);
    res.redirect('/list');
})

app.get('/modify/:id', (req, res) => {
    
    const { id } = req.params;
    const board = boardList.find((value) => value.id === parseInt(id));
    res.render('board/modify.html', {
        board
    });
});

app.post('/modify/:id', (req, res) => {
    const { id } = req.params;
    const { writer, title, content} = req.body;
    // 수정
    const index = boardList.findIndex((value) => value.id === parseInt(id));
    if(index === -1) {
        res.status(404).send('해당 아이디를 찾지 못했습니다.')
    }
    boardList[index].writer = writer;
    boardList[index].title = title;
    boardList[index].content = content;
    res.redirect(`/view?id=${id}`);
})

app.listen(3000, () => {
    console.log("server start");
});
