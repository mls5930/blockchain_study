// const express = require('express')
import express from "express";

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, Babel With Express!')
})

app.listen(3000, () => {
    console.log("Server is running");
})