// 함수형 프로그래밍 이전에 객체 지향 프로그래밍 방식으로 유저 관련 기능을 작성해보자.

/*
    user_id: 사용자 아이디
    user_pw: 사용자 비밀번호
    age: 나이
    name: 주병현
*/

// ES5 문법
// 생성자 함수
// 예를 들면 User라는 붕어방 틀을 만듦
function User(_user_id, _user_pw, _age, _name) {
    this.user_id = _user_id;
    this.user_pw = _user_pw;
    this.age = _age;
    this.name = _name;
    // function getUser() {}
}
// 붕어빵 틀에 어떤 재료를 넣었는지 확인하는 메서드(행동) 선언
User.prototype.getUser = function() {
    return console.log(`${this.user_id} ${this.user_pw}`);
}
// User라는 붕어빵 틀에 새로운 붕어빵을 만들겠다.
const user1 = new User("rhgPtjd1234", "qwerasdf1234", 26, "고혜성");
const user2 = new User("wnqudgus5565", "asdfqwer1234", 40, "주병현");

user1.getUser();
user2.getUser();