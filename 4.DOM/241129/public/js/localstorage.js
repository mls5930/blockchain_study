// 어떤식의 그릇을 보내고 받을 것인가
// 데이터 통신 객체 => JSON => 저장하거나 데이터를 교환할 때(통신)사용하는 형식입니다.
// 브라우저와 서버간의 데이터 교환할 때 많이 씁니다.
// 로컬 스토리지는 문자열(stringfy된 객체 덩어리) 저장할 수 있다.

// 브라우저에 로컬스토리지 데이터 추가(단일 객체만)
function saveSingleObject() {
    const user = {
        userId: "user1",
        email: "user1@example.com"
    }

    // localStorage.setItem("user1", JSON.stringify(user));
    localStorage.setItem("user2", "아무값");
}

// 브라우저에서 로컬 스토리지 데이터 가져오기
function getSingleObject () {
    // const user = JSON.parse(localStorage.getItem("user2"));
    const user = localStorage.getItem("user2");
    console.log(typeof user);
    console.log(user);
}

saveSingleObject();
getSingleObject();
