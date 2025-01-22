const crypto = require('crypto');

function encode(obj) {
    return Buffer.from(JSON.stringify(obj)).toString("base64url")
}

function createSignature(base64url, salt = "wnqudgus1234") {
    const data = base64url.join(".");
    return crypto.createHmac("sha256", salt).update(data).digest("base64url");
}

function sign(data) {
    const header = encode({alg:"HS256", typ:"JWT"});
    const payload = encode({...data});
    const signature = createSignature([header,payload]);
    return [header, payload, signature].join(".");
}

function verify(token, salt) {
    const [header, payload, signature] = token.split(".");
    const newSignature = createSignature([header, payload], salt);
    if(newSignature !== signature) throw new Error("토큰이 변조됐습니다.");
    return false
}

module.exports = {
    encode,
    createSignature,
    sign,
    verify
}