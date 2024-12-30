const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
const PORT = process.env.SERVER_PORT ? process.env.SERVER_PORT : 3000;
const router = require('./routes/board.route')

app.use(express.urlencoded({extended: true}));

app.set('view engine', "html");
nunjucks.configure('views', {
    express: app
})

app.use(router)

app.listen(PORT, () => {
    console.log("server start");
});