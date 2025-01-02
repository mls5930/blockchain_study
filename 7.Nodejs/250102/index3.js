// ES6 => class라는 객체를 제공해줘요.

class User {
    // 인스턴스 객체가 생성될 때마다 무조건 실행되는 아이(생성자)
    constructor(_user_id, _user_pw, _age, _name) {
        this.user_id = _user_id,
        this.user_pw = _user_pw,
        this.age = _age,
        this.name = _name
    }

    getUserList () {
        return console.log(`${this.user_id} ${this.user_pw}`);
    }

    sayHi () {
        return console.log(`안녕하세요 저는 ${this.name}이라는 사람입니다.`)
    }
}

const user1 = new User("wnqudgus5565", "qwerasdf1234", 40, "주병현");
const user2 = new User("rhgPtjd1212", "qwerasdf1234", 26, "고혜성");

user1.getUserList();
user2.getUserList();
user1.sayHi(); // 주병현입니다.
user2.sayHi(); // 고혜성입니다.
/*
    함수형 프로그래밍

    기능 중심.

    데이터를 다루는 함수(기능)들이 독립적으로 존재.
    "필요"할 때마다 함수를 호출하여 기능을 사용
    역할과 기능이 명확히 분리

    객체 지향 프로그래밍

    설계 중심.

    데이터를 포함하는 객체(클래스)를 설계하고, 객체의 설계 단계부터
    구조를 구체적으로 처음부터 확실하게 "분류"하여 설계하려는 목적

    장점 : 재사용이 쉽게 가능하며, 유지보수가 용이함.
    단점 : 처음부터 설계하여 분류하는 작업이 어려움 => 시간이 많이 걸림.
*/