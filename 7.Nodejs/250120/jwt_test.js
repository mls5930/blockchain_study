/*
    1. Header 객체 생성

    JWT의 기본 정보를 담고 있습니다.
    => 사용할 암호화 알고리즘 HS256

    HMAC-SHA256 (Hash-based Message Authentication Code with SHA-256)

    메시지와 비밀 키를 사용하여 해시값을 생성.
    HMAC의 역할은 메세지가 변경되지 않았음을 확인하는 것.

    SHA-256?

    메세지의 고정 길이 해시 값을 생성.
*/

const header = {
    alg: "HS256",
    typ: "JWT"
}

/*
    2. 페이로드(Payload) 객체 생성

    실제 데이터(정보)가 들어감.

    사용자 ID
    역할 role
    비밀번호는 절때 넣으시면 안됩니다!!!
*/

const payload = {
    name: "wnqudgus1234",
    address: "서울 특별시 중랑구 홍길동 아파트 2동 202호"
}

// 먼저 평문을 구해봅시다.

function encode(obj) {
    return Buffer.from(JSON.stringify(obj)).toString('base64');
}

const header64 = encode(header);
const payload64 = encode(payload);

// 여기 평문에는 아직 암호화 시그니처(서명)이 아직 없음

const 평문 = header64 + "." + payload64
/*
    평문: 암호화되지 않은 원본 데이터 즉, 아직 암호화가 이루어지지 않았다.
    아직 서명값이 안들어갔기 때문에 그 자체로 인코딩된 원본 데이터
    이 상태를 평문이라고 한다.
*/
console.log(평문);

/*
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
    .eyJuYW1lIjoid25xdWRndXMxMjM0IiwiYWRkcmVzcyI6IuyEnOyauCDtirnrs4Tsi5wg7KSR656R6rWsIO2Zjeq4uOuPmSDslYTtjIztirggMuuPmSAyMDLtmLgifQ==
    맨 끝에 ==는 뭘까?
    ==을 패딩이라고 부름
    base64URL 인코딩 => 주 특징은 ==(패딩) 제거
*/

// 이제 서명을 한번 해보자