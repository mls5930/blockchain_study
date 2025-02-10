const express = require('express');
const app = express();
require('dotenv').config();

const router = require('./routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router)

app.listen(3000, () => {
  console.log(`백엔드 서버`);
});
