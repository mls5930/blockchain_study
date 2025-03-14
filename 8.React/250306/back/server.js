const express = require("express");
const app = express();
const PORT = process.env.PORT || 3005;
const {Counter, sequelize} = require('./model');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('dotenv').config();
const cors = require('cors');
app.use(cors());
/*
    DB와 서버 => API 통신을 이용한 카운터 구현

    1. 언제? 카운터의 숫자를 "가져와서" 상태에 넣을것인가?
    2. 언제? 카운터의 + 또는 -버튼을 눌렀을 때 서버에 통신하여 DB에 "값을 넣을것인가"?

    "가져와서" => GET /counter
    "값을 넣을것인가" => POST /counter
*/

app.get("/counter", async(req, res) => {
    try {
        // 전체 데이터를 불러올 때 사용하는 메서드
        // 테이블에서 가장 최근(id가 가장 큰) 데이터를 가져오는 코드
        const result = await Counter.findOne({
            order: [["id", "DESC"]]
        })
        res.json({value: result})
    } catch (error) {
        console.log(error);
    }
})

app.post("/counter", async(req, res) => {
    try {
        const { newValue } = req.body
        console.log(newValue);
        
        // 새로운 row 추가하여 count
        const newCounter = await Counter.create({value: newValue});
        // 성공함!
        res.json({success: true, value: newCounter.value});
    } catch (error) {
        console.log(error);
    }
})

app.listen(PORT, async () => {
    // id, value, createdAt
    await sequelize.sync({ force: true });

    // 기존 데이터가 있으면 가져오고, 없으면 새로 생성
    await Counter.findOne({ where: { id: 1 } }) 
    || await Counter.create({ id: 1, value: 0 });

    console.log(`server start ${PORT}`);
});
