const express = require("express");
const app = express()
const PORT = process.env.PORT || 3005;
const {Couter,sequelize} = require("./model")
require("dotenv").config

app.get("/counter", (req,res) => {
    
});



app.listen(PORT , () => {
    console.log("server open");
    
})