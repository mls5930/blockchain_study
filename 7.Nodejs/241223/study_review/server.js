const express = require('express');
const app = express();
const PORT = process.env.SERVER_PORT ?  process.env.SERVER_PORT : 3000;

const userList = [
    {
        userId: "wnqudgus1234",
        name: "주병현"
    },
    {
        userId: "wnqudgus5565",
        name: "주병현"
    }
]

app.get('/', (req, res) => {
    res.send("<h1>제 유저 목록 페이지에 오신것을 환영합니다.</h1>")
});

app.get('/list', (req, res) => {
    res.json(userList)
});

app.get('/modify', (req, res) => {
    const { userId, newName } = req.query;
    for(let i = 0; i < userList.length; i++){
        if(userList[i].userId === userId) {
            userList[i].name = newName;
            return res.json(userList);
        }
    }
});

app.get("/create", (req, res) => {
    const { userId, name } = req.query

    userList.push({
        userId,
        name
    })

    res.json(userList)
})

app.get('/delete', (req, res) => {
    const { userId } = req.query;

    for(let i = 0; i < userList.length; i++){
        if(userList[i].userId === userId){
            userList.splice(i, 1);
            return res.json(userList);
        }
    }
});

app.listen(PORT, () => {
    console.log(`서버가 ${PORT}번대로 잘 열렸는가?`);  
})