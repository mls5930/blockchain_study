// 자...이제 평문까지 구했으니 바로 jwt 외부 모듈 설치?? 아닙니다.

/*
    Node.js의 crypto 모듈

    암호화와 관련된 다양한 기능을 제공

    1. 해싱
    2. 디지털 서명(signature) 생성
*/
const crypto = require('crypto');

const header = {
    alg: "HS256",
    type: "JWT"
}

const payload = {
    name: "wnqudgus1234",
    address: "서울 특별시 중랑구 홍길동 아파트 2동 202호"
}

function encode(obj) {
    return Buffer.from(JSON.stringify(obj)).toString("base64url");
}

const header64 = encode(header)
const payload64 = encode(payload)

const 평문 = header64 + "." + payload64;
const salt = "wnqudgus1234";
const signature = crypto
    .createHmac('sha256', salt)
    .update(평문)
    .digest('base64url');

console.log(signature);
const 암호화 = 평문 + "." + signature
console.log(암호화);

/*
    createHmac(algorithm): 사용할 해시 알고리즘 선택
    update(data): 암호화할 데이터
    digest(format): 결과를 특정 형식으로 반환(hex, base64 등)

    eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ
    .eyJuYW1lIjoid25xdWRndXMxMjM0IiwiYWRkcmVzcyI6IuyEnOyauCDtirnrs4Tsi5wg7KSR656R6rWsIO2Zjeq4uOuPmSDslYTtjIztirggMuuPmSAyMDLtmLgifQ
    .NYLpEF4uBY5gOIJu3tY74OlIMz8f4qHSG4_bwMxyyTs

    핵심은 암호화 복호화가 단순히, 내 정보가 보이냐 안보이냐를 떠나서,
    함부로 나를 증명하여 제 3의 웹사이트를 함부로 이용하는 것을 막는 것도 있다.

    즉, 서명값이 진짜 중요하다!(salt값은 외부로 유출되어선 안된다.)
*/

/*
    즉, 검증을 어떻게 하냐?
    => 나를 어떻게 검증하냐? => 새로운 서명값으로 증명 => 기존의 서명값과 새로운 서명값
    비교하여 값이 완전히 똑같은지 확인
*/

const newSignature = crypto.createHmac('sha256', salt).update(평문).digest("base64url");

console.log(signature === newSignature);
