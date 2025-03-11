const express = require("express");
const app = express();
const PORT = process.env.PORT || 3005;
require('dotenv').config();
const cors = require('cors');
const { Counter, sequelize} = require("./model");

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cors());


app.get('/counter', async(req,res) => {
  try {
    // const result = await Counter.findALl();
    const data = await Counter.findAll({
      order: [['id', 'DESC']]
    });
    res.json(data)
  } catch (error) {
    res.json({error})
      console.log(error)
  }
});

app.post('/counter', async(req,res) => {
  try {
    const { newValue } = req.body;
    await Counter.create({value: newValue});
    res.json({success: true});
  } catch (error) {
    console.log(error);
  }
})

app.listen(PORT , async () => {
  console.log("server open");
  await sequelize.sync({ force: true });

  // 기존 데이터가 있으면 가져오고, 없으면 새로 생성
  await Counter.findOne({ where: { id: 1 } }) 
  || await Counter.create({ id: 1, value: 0 });
  
  console.log(`server start ${PORT}`);
})