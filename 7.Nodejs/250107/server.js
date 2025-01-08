const express = require("express");
const nunjucks = require("nunjucks");
const boardService = require("./repository/board.repository");
const app = express();
const PORT = process.env.SERVER_PORT ? process.env.SERVER_PORT : 3000;

app.set('view engine', 'html');
nunjucks.configure("views", {
    express: app
})
app.use(express.urlencoded({extended: true}));

app.get('/board/list', async(req, res) => {
    const boardList = await boardService.findAll();
    res.render('board/list.html', {
        boardList
    })
});

app.get('/board/write', (req, res) => {
    res.render('board/write.html');
})

app.get('/board/view/:id', async(req, res) => {
    try {
        const id = parseInt(req.params.id)
        const result = await boardService.findOne(id);
        const board = result[0];
        res.render('board/view.html', {
            board
        })
    } catch (error) {
        console.log(error);
        res.status(404).send("상세 페이지 조회에 실패하였습니다.")
    }
})

app.post('/board/write', async(req, res) => {
    try {
        const { insertId } = await boardService.create(req.body);
        res.redirect(`/board/view/${insertId}`);
    } catch (error) {
        console.log(error);
        res.status(404).send("글 작성에 실패하였습니다.")
    }
})

app.listen(PORT, () => {
    console.log("서버가 잘 열렸는지 확인하는 용도");
});