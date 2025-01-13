// repository
// DB 연결 및 쿼리 관리.

const pool = require('./db');

const findAll = async() => {
    const [result] = await pool.query('SELECT * FROM board;');
    return result;
}

const findOne = async(id) => {
    const [result] = await pool.query(`SELECT * FROM board WHERE id=?`, [id]);
    return result
}
// INSERT INTO board(user_id, writer, title, content) values("wnqudgus1234", "주병현", "세 번째 제목입니다", "세 번째 내용입니다.");
// { user_id, writer, title, content } = req.body
const create = async({ user_id, writer, title, content }) => {
    const [result] = await pool.query(`
        INSERT INTO board(user_id, writer, title, content) values("${user_id}", "${writer}", "${title}", "${content}");
    `);
    return result
}

// UPDATE board SET user_id="wnqudgus1234", writer="주병현", title="제목입니다", content="첫 번째 내용입니다." WHERE id=6;
const update = async({ user_id, writer, title, content, id }) => {
    pool.query(`UPDATE board SET user_id="${user_id}", writer="${writer}", title="${title}", content="${content}" WHERE id=${id};`)
}

// 모듈로 내보냄
module.exports = {
    findAll,
    findOne,
    create,
    update
}
