// 객체를 생성할 때 호출되는 특별한 메서드를 사용할 수 있음.
// constructor => 생성자
// 붕어빵 틀
class User {
    constructor(_name, _age) {
        this.name = _name;
        this.age = _age;
    }
}

// User라는 틀을 이용해서 새로운 객체를 생성하겠다.
// 인스턴스 객체 생성
const 주병현 = new User("주병현", "서른두살");
const 조상아 = new User("조상아", "스물두살");

console.log(주병현);
console.log(조상아);

// new 키워드는 User라는 클래스(틀)을 바탕으로 새로운 객체를 만들겠다라는 뜻
// User => class
// 주병현, 조상아 => instance

