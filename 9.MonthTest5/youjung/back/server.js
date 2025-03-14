const express = require('express');
const app = express();
const PORT = process.env.PORT || 3005;
const {Counter,sequelize} = require("./madel")

app.use(express.urlencoded({extended: true}));
app.use(express.json());

require('dotenv').config();
const cors = require('cors');
app.use(cors());

app.get("/counter", async(req,res) => {
   try{
     // 전체 데이터를 불러올떄 사용하는 메서드
    // const result=await Counter.findAll();
     const result = await Counter.findOne({
      order: [["id", "DESC"]]
     })
     res.json({value: result})
   } catch (error) {
    console.log(error);
    
   }
})

app.post("/counter", async(req,res) => {
   try {
        const { newValue } = req.body
        // 새로운 row 추가하여 count
        const newCounter = await Counter.create({value: newValue});
        // 성공함
        res.json({success: true, value: newCounter.value});
   } catch(error) {
        console.log(error);
   }
})

app.listen(PORT, async() => {
    await sequelize.sync({force: true});

    await Counter.findOne({ where: {id: 1}})
    || await Counter.create({ id: 1, value: 0});

    console.log(`server open ${PORT}`);
    
});