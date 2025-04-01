const express = require("express");
const app = express()
const PORT = process.env.PORT || 3005;
const {Counter,sequelize} = require("./model")
require("dotenv").config;
const cors = require("cors");
const { where } = require("sequelize");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}))

app.get("/counter", async(req,res) => {
    try{
    // 전체 데이터를 불러올 떄 사용하는 메서드
    const result = await Counter.findAll({
        order: [["id", "DESC"]]
    })
    res.json(result)
    // console.log("여기 찍힘?",result);
    } catch (error) {
        console.log(error);
        
    }
    
    // res.json()
})

app.post("/counter", async(req,res) => {
    try{
        const { newValue } = req.body
            const newCounter = await Counter.create({value: newValue})
        const result = await Counter.findOne({
            order: [["id", "DESC"]]
        })
        res.json(result)
    } catch(error){
        console.log(error);
        
    }
});



app.listen(PORT , async () => {
    console.log("server open");
    await sequelize.sync({ force: true });

    // 기존 데이터가 있으면 가져오고, 없으면 새로 생성
    await Counter.findOne({ where: { id: 1 } }) 
    || await Counter.create({ id: 1, value: 0 });
    
    console.log(`server start ${PORT}`);
})