const express = require('express');
const router = express.Router();
// controllers파일안에 각 함수들을 모듈로서 내보낼거임
const {
    getBoardList,
    getBoardWrite,
    getBoardView,
    postBoardWrite,
    getBoardUpdate,
    postBoardUpdate
} = require('../controllers/board.controller');

router.get('/board/list', getBoardList);
router.get('/board/write', getBoardWrite);
router.get('/board/view/:id', getBoardView);
router.post('/board/write', postBoardWrite);
router.get('/board/update/:id', getBoardUpdate);
router.post('/board/update/:id', postBoardUpdate);
// GET /board/update/:id
// POST /board/update/:id

module.exports = router