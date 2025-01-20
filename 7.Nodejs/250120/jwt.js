/*
    4.jwtFlow.md 참고
*/ 

const crypto = require('crypto');

function encode(obj) {
    return Buffer.from(JSON.stringify(obj)).toString("base64url")
}

function decode(base64) {
    return JSON.parse(Buffer.from(base64, "base64url").toString('utf-8'));
}

function createSignature(base64url, salt = "wnqudgus1234") {
    // [header,payload]
    // [eesafjsdfjdsf,ewqnjeedujsafdbnsdhfbdshfbdshfbhb]
    const data = base64url.join(".");
    // eesafjsdfjdsf.ewqnjeedujsafdbnsdhfbdshfbdshfbhb
    // return 값은 signature 값 입니다!
    return crypto.createHmac("sha256", salt).update(data).digest("base64url");
}

function sign(data) {
    const header = encode({alg:"HS256", typ:"JWT"});
    const payload = encode({...data});
    const signature = createSignature([header,payload]);
    // eesafjsdfjdsf.ewqnjeedujsafdbnsdhfbdshfbdshfbhb.asdsadasdasdasdsad
    return [header, payload, signature].join(".");
}

function verify(token, salt) {
    // [eesafjsdfjdsf,ewqnjeedujsafdbnsdhfbdshfbdshfbhb,asdsadasdasdasdsad]
    const [header, payload, signature] = token.split(".");
    const newSignature = createSignature([header, payload], salt);
    if(newSignature !== signature) throw new Error("토큰이 변조됐습니다.");
    // 주의!! 얘는 그냥 값을 보여주기 위한 return
    return decode(payload);
    // return true
}

// 유저가 로그인하여 넘겨준 값.
const user = {
    userid: "wnqudgus1234",
    username: "juByeongHyeon"
}

const token = sign(user);
//  eesafjsdfjdsf.ewqnjeedujsafdbnsdhfbdshfbdshfbhb.asdsadasdasdasdsad
const payload = verify(token, "wnqudgus1234");

console.log(payload);