const { boardList } = require('../data/board.data');
const path = require('path');


const getBoardList = (req, res) => {
        
    res.render('board/list.html', {
        boardList
    })
}
const getBoardWrite = (req, res) => {
    const writePath = path.join(__dirname, "../views/board/write.html");
    res.sendFile(writePath)
}

const postBoardWrite = (req, res) => {
    const { writer, title, content } = req.body
    const id = boardList[boardList.length - 1].id + 1
    boardList.push({
        id,
        writer,
        title,
        content,
        hit: 0,
        created_at: new Date()
    })

    res.redirect(`/board/view/${id}`);
}

// GET /board/view/:id
const getBoardView = (req, res) => {
    const id = parseInt(req.params.id);
    const board = boardList.find((value) => value.id === id);

    res.render('board/view.html', {
        board
    })
}

// GET /board/modify/:id
const getBoardModify = (req, res) => {
    const id = parseInt(req.params.id);
    const board = boardList.find((value) => value.id === id);

    res.render('board/modify.html', {
        board
    })
}

// POST /board/modify/:id
const postBoardModify = (req, res) => {
    const { writer, title, content } = req.body
    const id = parseInt(req.params.id);

    const index = boardList.findIndex((value) => value.id === id);
    
    if(index === -1){
        res.status(404).send("유저가 없습니다.");
    }

    boardList[index].writer = writer;
    boardList[index].title = title;
    boardList[index].content = content;

    res.redirect(`/board/view/${id}`);
}
// POST /board/delete/:id
const postBoardDelete = (req, res) => {
    const id = parseInt(req.params.id);

    const index = boardList.findIndex((value) => value.id === id);

    if(index === -1) {
        res.status(404).send("아아디를 찾지 못했습니다")
    }

    boardList.splice(index, 1);

    res.redirect('/board/list');
}

module.exports = {
    getBoardList,
    getBoardWrite,
    postBoardWrite,
    getBoardView,
    getBoardModify,
    postBoardModify,
    postBoardDelete
}