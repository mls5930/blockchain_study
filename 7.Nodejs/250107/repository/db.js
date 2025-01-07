// npm install mysql2
// mysql 연결풀 설정

const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "127.0.0.1",
    port: "3306",
    // user: "wnqudgus1234@localhost"
    user: "wnqudgus1234",
    // mysql -u wnqudgus1234 -p
    password: "qwerasdf1234",
    database: "Ju",
    connectionLimit: 5
}).promise();

module.exports = pool;

// 익명 함수 선언 후 바로 실행
// ()();
// (async () => {
//     // const {} = req.body
//     const [result] = await pool.query('SELECT * FROM board;');
//     return result
// })();

/*
    - createPool: MySQL connection pool 생성.
    - host, port, user, password, database: MySQL 서버 정보.
    - promise(): 비동기 쿼리 지원.

    mysql2는 Node.js 및 express서버와 MySQL을 연결하기 위해서 만들어진 라이브러리

    기존에는 mysql이라는 라이브러리가 존재.
    하지만 Node 4버전 이후에는, 호환이 잘 맞지 않고 버그가 자주 일어남.

    Sidorares라는 개발자가 mysql2라는 라이브러리를 개발.
    Node 8버전 이후와 호환이 굉장히 잘맞음.
    특히, 비동기 처리인 Promise와 async/await와 호환이 잘 맞음.
*/