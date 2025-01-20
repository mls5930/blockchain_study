const str = "ABC" // <Buffer 41, 42, 43>
const base64Encoded = Buffer.from(str).toString("base64");
console.log(base64Encoded);

/*
    Buffer.from(str)으로 인코딩
    .toString("base64") => base64로 추가로 인코딩

    UTF-8 인코딩 => A -> 65 (10진수) -> 41 (16진수)
    base64 인코딩 => 01000001 01000010 01000011
    => 010000 010100 001001 000011
    => QUJD
*/

// 얘를 다시 문자열로 바꾸고 싶다면?
const base64Decoded = Buffer.from(base64Encoded, "base64").toString('utf-8');
console.log(base64Decoded);

/*
    base64로 인코딩된 문자열을 다시 원래의 문자열로 디코딩합니다.
    base64Encoded를 버퍼로 변환하고, UTF-8 형식으로 변환하여 문자열로 만듭니다.
    결과는 원래 문자열 'ABC' 입니다.
*/

