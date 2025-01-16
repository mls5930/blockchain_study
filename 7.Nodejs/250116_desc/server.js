// 필요한 설정 및 모듈 가져오기
const express = require('express');
const app = express();
// 지금은 디렉토리별로 나누어놨음. 디렉토리 안나누고 하는 방식은 아래 주석 참고
const { sequelize, Comment } = require('./model')

// 3. 시퀄라이즈 메서드 문법 사용(조회, 생성, 수정, 삭제)
app.listen(3000, async() => {
    await sequelize.sync({force : true});
    // 시퀄라이즈 메서드 사용할거임

    // CREATE
    await Comment.create({user_id: "wnqudgus1234", content: "코딩 역시 재밌다"});
    await Comment.create({user_id: "rhgPtjd2232", content: "코딩...힘들다"});

    // READ
    const commentList = await Comment.findAll();
    
    console.log("댓글 목록 잘 나오나요?", commentList);
})

/*
const { Sequelize, DataTypes } = require('sequelize');

// 1. Sequelize 초기화: 데이터베이스 연결 정보 제공
const sequelize = new Sequelize("Ju", "wnqudgus1234", "qwerasdf1234", {
    host: "127.0.0.1",
    dialect: "mysql",
    port: 3306
})

// 2. 테이블 구조 정의
const Comment = sequelize.define("comment", {
    user_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    // 복수형 할게!
    freezeTableName: false,
})

*/