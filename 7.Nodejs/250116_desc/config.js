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
