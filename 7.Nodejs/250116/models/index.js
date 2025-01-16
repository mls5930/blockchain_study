/*
    순서

    1. 시퀄라이즈 외부 모듈 가져옴(Class 정의할 수 있는 class 객체)
    2. 시퀄라이즈 연결 정보(config.js) 가져옴
    3. new Sequelize로 연결하고 반환받음
    4. 반환 받은 sequelize에 인자값 넣어줌
    5. 모듈로 내보냄
*/

/*
    이건 시퀄라이즈가 어떻게 생겨먹었나 대략적인 예상구조임.
    const Sequelize = {
        class Sequelize {
            (...)
        }
    }
    module.exports = Sequelize
*/
// 1번
const { Sequelize } = require('sequelize');
// 2번
const config = require('../config');
const db = config.db.development;
// 3번
const sequelize = new Sequelize(db.database, db.username, db.password, db);
// 4번
const comments = require('./comment.model');
/*
    sequelize: 연결 정보가 담긴 인스턴스 객체(붕어빵)
    Sequelize: Sequelize 기본 클래스, 데이터 타입 정의 및 모델 상속
*/
comments(sequelize, Sequelize);

module.exports = {
    sequelize,
    comments
}