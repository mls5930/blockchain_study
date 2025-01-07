// repository
// DB 연결 및 쿼리 관리.

const pool = require('./db');

const findAll = async() => {
    // []
    const [result] = await pool.query('SELECT * FROM board;');
    return result;
}

const findOne = async(id) => {
    const [result] = await pool.query(`SELECT * FROM board WHERE id=${id}`);
    return result
}

// { user_id, writer, title, content } = req.body
const create = async({ user_id, writer, title, content }) => {
    const [result] = await pool.query(`
        INSERT INTO board(user_id, writer, title, content) values("${user_id}", "${writer}", "${title}", "${content}");
    `);
    return result
}

// 모듈로 내보냄
module.exports = {
    findAll,
    findOne,
    create
}

// INSERT INTO board(user_id, writer, title, content) values("wnqudgus1234", "주병현", "세 번째 제목입니다", "세 번째 내용입니다.");