// 필요한 설정 및 모듈 가져오기
const express = require('express');
const app = express();
const { Comment, sequelize } = require('./model');
const nunjucks = require('nunjucks');
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app
})

app.use(express.urlencoded({ extended: true}));
app.get('/comment', async(req, res) => {
    const comments = await Comment.findAll();
    res.render('comment/list.html', {
        comments
    })        
})

app.get('/comment/:id', async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const comment = await Comment.findOne({
            where: {
                id: id
            }
        })
        res.render('comment/view.html', {
            comment
        })
    } catch (error) {
        console.log(error);
        res.send("데이터가 없어용 ㅠ")
    }
})

app.get('/comment/update/:id', async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await Comment.findOne({
            where: {
                id: id
            }
        })
        res.render('comment/update.html', {
            comment: result.dataValues
        })
    } catch (error) {
        console.log(error);
        res.send("데이터가 없어용 ㅠ")
    }
})

app.post('/comment/update/:id', async(req, res) => {
   try {
    const id = parseInt(req.params.id);
    const { user_id, content } = req.body
    const [result] = await Comment.update(
        {
            user_id : user_id, content: content
        },
        {
            where : { id: id }
        }
    )
    if(result !== 1) throw new Error("글 작성 실패")
    res.redirect(`/comment/${id}`);
   } catch (error) {
        console.log(error);
        res.send(error)
   }
})

// 3. 시퀄라이즈 메서드 문법 사용(조회, 생성, 수정, 삭제)
app.listen(3000, async() => {
    await sequelize.sync({ force : true });
    // 시퀄라이즈 메서드 사용할거임

    // CREATE
    await Comment.create({user_id: "wnqudgus1234", content: "코딩 역시 재밌다"});
    await Comment.create({user_id: "rhgPtjd2232", content: "코딩...힘들다"});
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