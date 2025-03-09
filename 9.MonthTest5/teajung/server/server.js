const express = require('express');
const cors = require('cors');
const sequelize = require('./models/index');
const router = require('./routes/index');
require('dotenv').config();

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use(router);


app.listen(3005, async()=>{
    await sequelize.sync({force:false});
    console.log("Opened Server 3005");
})
