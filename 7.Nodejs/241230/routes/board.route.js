const express = require('express');
const router = express.Router();
const { 
    getBoardList, 
    getBoardWrite, 
    postBoardWrite,
    getBoardView,
    getBoardModify,
    postBoardModify,
    postBoardDelete
} = require('../controllers/board.controller');

// GET /board/list
// GET /board/write
// POST /board/write

router.get('/board/list', getBoardList);
router.get('/board/write', getBoardWrite);
router.post('/board/write', postBoardWrite);

// GET /board/view/:id
// GET /board/modify
// POST /board/modify/:id
// POST /board/delete/:id

router.get('/board/view/:id', getBoardView);
router.get('/board/modify/:id', getBoardModify);
router.post('/board/modify/:id', postBoardModify);
router.post('/board/delete/:id', postBoardDelete);

module.exports = router;