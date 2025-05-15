import express from "express";
import Wallet from ".";
import path from "path";
import fs from "fs";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
    const viewPath = path.join(__dirname, "/view/index.html");
    res.sendFile(viewPath);
})

app.post("/newWallet", (req, res) => {
    res.json(new Wallet());
})

app.get("/wallet", (req, res) => {
    const list = Wallet.getWalletList();
    res.json(list);
})

app.post("/walletSelect", (req, res) => {
    // 요청 본문으로 받고싶어 뭘?
    const { account } = req.body;
    const privateKey = Wallet.getWalletPrivateKey(account);
    res.json(new Wallet(privateKey));
})

app.listen(4000, () => {
    console.log(`server open`);
})