const express = require("express");
const app = express();

const userList = [
    {
        userId: "wnqudgus1122"
    },
    {
        userId: "wnqudgus2233"
    }
]

// 클라이언트가 localhost:3000에 URL에 땅 쳤을때(요청)
// API
app.get("/", (req, res)=> {
    // /mnt/c/Users/KGA/Documents/blockchain11/7.Nodejs/241220_1/index.html
    res.sendFile(`${__dirname}/index.html`);
}) 

// 클라이언트가 localhost:3000/list에 URL에 땅 쳤을때(요청)
app.get("/list", (req, res) => {
    res.json(userList)
})

app.listen(3000, () => {
    // 콘솔로그 안써줘도 되지만, 열린지 안열린지 모르기 때문에 써줬습니다.
    console.log("서버가 열렸습니다!");
})
