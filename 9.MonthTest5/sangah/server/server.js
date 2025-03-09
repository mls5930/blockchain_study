const express = require("express");
const app = express();
const PORT = process.env.PORT || 3005;
const { Counter, sequelize } = require("./model");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("dotenv").config();
const cors = require("cors");
app.use(cors());

// DB에서 count 값 가져옴/ findAll => 0번째 객체 가져오기(최신, front에서 history 사용)
app.get("/counter", async (req, res) => {
  try {
    const result = await Counter.findOne({
      order: [["id", "DESC"]],
    });
    const response = await Counter.findAll();
    res.json({ response });
  } catch (error) {
    console.log(error);
  }
});

// DB에 count 값 저장
app.post("/counter", async (req, res) => {
  try {
    const { newValue } = req.body;
    const newCounter = await Counter.create({ value: newValue });

    res.json({
      success: true,
      value: newCounter.value,
      createdAt: newCounter.createdAt,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, async () => {
  await sequelize.sync({ force: true });

  (await Counter.findOne({ where: { id: 1 } })) ||
    (await Counter.create({ id: 1, value: 0 }));

  console.log(`SERVER OPEN ${PORT}`);
});
