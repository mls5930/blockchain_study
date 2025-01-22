const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const PORT = process.env.PORT || 3000;
const router = require('./user/user.route');
const { sequelize, User } =  require('./model');

nunjucks.configure('views', {
    express: app
})

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
app.use(router);

app.listen(PORT, async() => {
    await sequelize.sync({force: true});
    await User.create({userid:"wnqudgus1234", userpw:"qwer1234"});
    const users = await User.findOne({where: { userid:"wnqudgus1234" }});
    console.log(users);
    // 시퀄라이즈 sync 자리
    console.log("server start");
})
