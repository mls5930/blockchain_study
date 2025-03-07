const express =require("express");
const app =express();
const PORT = process.env.PORT || 3005;
const {Counter ,sequelize} =require('./model');

app.use(express.urlencoded({ extended: true}))
app.use(express.json())
require("dotenv").config()
const cors = require("cors");
app.use(cors());



// "가져올값" => GET / counter
// "값을 넣을것인가" => POST /counter

app.get("/counter", async(req,res) => {
    try{
    // 전체 데이터를 불러올 떄 사용하는 메서드
    const result = await Counter.findOne({
        order: [["id", "DESC"]]
    })
    res.json(result)
    console.log("여기 찍힘?",result);
    } catch (error) {
        console.log(error);
        
    }
    
    // res.json()
})

app.post("/counter", async(req ,res) => {
    try{
        const { newValue } = req.body
        console.log(newValue);
        
        //  새로운 row 추가하여 count
        const newCounter = await Counter.create({value: newValue})
        // 성공함!
        res.json({success: true, value: newCounter.value})
    } catch(error){
        console.log(error);
        
    }
})


app.listen (PORT, async () => {
    // 데이터가 없을 때 생성

    // // 값 생성
    // await Counter.create({id: 1,value:0})

    // // 데이터 조회
    // const counter = await Counter.findOne({where: {id:1}})
    // console.log(counter);

    // id, value, createdAt
    await sequelize.sync({ force: true });

    // 기존 데이터가 있으면 가져오고, 없으면 새로 생성
    await Counter.findOne({ where: { id: 1 } }) 
    || await Counter.create({ id: 1, value: 0 });

    console.log(`server start ${PORT}`);
    
    
})