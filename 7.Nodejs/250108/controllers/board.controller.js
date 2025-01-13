const boardServices = require('../services/board.service');

const getBoardList = async(req, res) => {
    const boardList = await boardServices.findAll();
    res.render('board/list.html', {
        boardList
    });
}

const getBoardWrite = (req, res) => {
    res.render('board/write.html');
}

const getBoardView = async(req, res) => {
    try {
        const id = parseInt(req.params.id)
        const board = await boardServices.findOne(id);
        res.render('board/view.html', {
            board
        })
    } catch (error) {
        console.log(error);
        res.status(404).send("상세 페이지 조회에 실패하였습니다.")
    }
}
const postBoardWrite = async(req, res) => {
    try {
        const { insertId } = await boardServices.create(req.body);
        res.redirect(`/board/view/${insertId}`);
    } catch (error) {
        console.log(error);
        res.status(404).send("글 작성에 실패하였습니다.")
    }
}

const getBoardUpdate = async(req, res) => {
    try {
        const id = parseInt(req.params.id)
        const board = await boardServices.findOne(id);
        res.render('board/update.html', {
            board
        })
    } catch (error) {
        console.log(error);
        res.status(404).send("상세 보기 페이지를 불러오지 못했습니다.")
    }
}

const postBoardUpdate = async(req, res) => {
    try {
        const data = {
            id: parseInt(req.params.id),
            ...req.body
        }
        await boardServices.update(data);
        res.redirect(`/board/view/${id}`);
    } catch(error) {
        console.log(error);
        res.status(404).send("글 수정에 실패하였습니다.");
    }
}

module.exports = {
    getBoardList,
    getBoardWrite,
    getBoardView,
    postBoardWrite,
    getBoardUpdate,
    postBoardUpdate
}