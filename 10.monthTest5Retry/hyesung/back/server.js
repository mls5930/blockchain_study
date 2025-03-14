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

app.get("/counter", async (req, res) => {
    try {
        const result = await Counter.findAll({
            order: [["id", "DESC"]]
        });
        
        const latestCount = result.length > 0 ? result[0].value : 0;
        const timeArray = result.map((value) => value.createdAt)
        
        res.json({ count: latestCount, time: timeArray });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/counter", async(req,res) => {
    try{
        const { newValue } = req.body
        await Counter.create({value: newValue})
        res.json({sucess:true})
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