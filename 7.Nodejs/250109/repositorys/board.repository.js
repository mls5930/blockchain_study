const pool = require('./db');

const findAll = async() => {
    const [result] = await pool.query('SELECT * FROM board;');
    return result;
}

const findOne = async(id) => {
    const [result] = await pool.query(`SELECT * FROM board WHERE id=?`, [id]);
    return result
}

const create = async({ user_id, writer, title, content }) => {
    const [result] = await pool.query(`
        INSERT INTO board(user_id, writer, title, content) values("${user_id}", "${writer}", "${title}", "${content}");
    `);
    return result
}

const update = async({ user_id, writer, title, content, id}) => {
    const [result] =  await pool.query(`UPDATE board SET user_id="${user_id}", writer="${writer}", title="${title}", content="${content}" WHERE id=${id};`)
    return result
}

module.exports = {
    findAll,
    findOne,
    create,
    update
}
