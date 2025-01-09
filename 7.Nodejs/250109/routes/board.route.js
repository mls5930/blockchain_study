const express = require('express');
const router = express.Router();
const {
    getBoardList,
    getBoardWrite,
    getBoardView,
    postBoardWrite,
    getBoardUpdate,
    postBoardUpdate
} = require('../controllers/board.controller');
const { validateBoardData } = require('../middleware/board.middleware')
const { authCheck } = require('../middleware/auth.middleware')

router.get('/board/list', getBoardList);
router.get('/board/write', authCheck, getBoardWrite);
router.get('/board/view/:id', getBoardView);
router.post('/board/write', validateBoardData, postBoardWrite);
router.get('/board/update/:id', getBoardUpdate);
router.post('/board/update/:id', validateBoardData, postBoardUpdate);

module.exports = router