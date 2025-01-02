// 함수형 프로그래밍

/*
    user_id: 사용자 아이디
    user_pw: 사용자 비밀번호
    age: 나이
    name: 주병현
*/

// 배열이라는 변수
const userList = [
    {
        user_id: "wnbqudgus5565",
        user_pw: "qwer1234",
        age: 40,
        name: "주병현"
    }
]

// 위의 변수를 보고 어떠한 기능이 필요한지 파악해보자.
// 유저에 대한 정보가 있으니, 맥락으로 봤을 때, 유저를 추가하는 "기능"도 있겠지?
function addUser(_user_id, _user_pw, _age, _name) {
    userList.push({
        user_id: _user_id,
        user_pw: _user_pw,
        age: _age,
        name: _name
    })
}

// 유저를 추가하는 "기능"도 있으니까, 유저를 조회하는 "기능"도 필요하겠지?
function getUserList() {
    return console.log(userList);
}

// 유저를 추가하자!
addUser("rhgPtjd1234", "ffasqweeq1212", 26, "고혜성");
// 유저 추가 기능이 잘 작동되는지 확인해볼까?
getUserList();