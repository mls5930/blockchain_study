// config => configuration의 약자
// 설정이나 구성 => 우리 연결설정 여따 할게요

/*
    MySQL의 레포지토리 연결풀은 어떻게 했더라?
    MySql 연결 서버 설정
    {
        host: "127.0.0.1",
        port: "3306",
        user
        password
        database
    }
*/

const config = {
    // 서버 포트
    port: 3000,
    db: {
        development : {
            host: "127.0.0.1",
            // ORM 포트
            port: 3306,
            database: "Ju",
            username: "wnqudgus1234",
            password: "qwerasdf1234",
            dialect: "mysql"
        }
    }
}

module.exports = config

/*
    const config = {
        // sequelize 서버 포트
        port: "3306",
        // 주 db 연결 설정
        db: {
            // 로컬 개발 환경
            development: {}
            // 실제 개발 환경
            production: {}
        }
    }
*/