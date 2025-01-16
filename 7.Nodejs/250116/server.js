const express = require("express");
const app = express();
const { sequelize } = require('./models');

// 아까, config.js에 서버 포트 적어줌
// 수업 끝
app.listen(3000, async() => {
    console.log("server start");
    // 이제 여기서 시퀄라이즈 메서드 사용 => CRUD 해보자
    
    await sequelize.sync({ force: true});

    const Comment = sequelize.models.Comment;

    // Create
    // INSERT INTO comments(user_id, content) values("wnqudgus1234", "내용입니다.")
    await Comment.create({user_id: "wnqudgus1234", content: "첫 번째 내용입니다."});
    await Comment.create({user_id: "rhgPtjd2232", content: "두 번째 내용입니다."});

    // READ
    // select * from comments;
    const commentList = await Comment.findAll();

    // UPDATE
    // UPDATE commnets set user_id="sangah323", content="수정이다" WHERE id=2
    const update = await Comment.update(
        {
            user_id: "sangah323", content: "수정이다"
        },
        {
            where: { id: 2 }
        }
    )
    /*
        update(
            {
                {}
            },
            {
                {}
            }
        )
    */
    
    console.log("업데이트 잘됌?", update);
    const commentList2 = await Comment.findAll();
    console.log("목록이 나오나요?", commentList2);

    // DELETE
    // DELETE FROM comments WHERE id=2 AND user_id="sangah323"
    await Comment.destroy({where : { id: 2, user_id: "sangah323" }});
    const commentList3 = await Comment.findAll();
    console.log("목록이 나오나요?", commentList3);

    const [query] =await sequelize.query("SELECT * FROM Comment;");
    console.log("쿼리문으로 Comment 전체 조회", query);
    console.log("server start");
})

/*
    데이터베이스 테이블을 Sequelize 모델과 동기화
    await sequelize.sync({ force: true});

    force: true: 기존 테이블을 삭제하고 매번 새로 만듭니다.
*/