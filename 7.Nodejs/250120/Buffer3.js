const str = 'Hello world';
const buf = Buffer.from(str);
// <Buffer 48 65 6c 6c 6f 20 77 6f 72 6c 64>
console.log(buf.toString("base64"));
// SGVsbG8gd29ybGQ=

/*
    어찌됐건, 위의 버퍼 객체 하나 즉 48, 65....이 값들을 ASCII코드 변환 => 2진수로 표현하여 바이트로 표현하면?
    => 11 * 8 => 88비트
    base64로 인코딩 => 먼저 6비트씩 나눔 => 88 / 6 = 14 나머지 2가 나옴

    SGVsbG8gd29ybGQ=
*/
