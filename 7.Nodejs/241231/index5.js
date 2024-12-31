const a = {
    name : "홍길동"
}

a.age = 32;

console.log(a);

function user(_name, _lastName, _firstName, _age) {
    this.name = _name;
    this.lastName = _lastName;
    this.firstName = _firstName;
    this.age = _age;

    this.sayHi = function () {
        return console.log(`안녕하세요 저는 ${this.name} 입니다.`);
    }
} 

const JBH = new user("주병현", "병현", "주", 40);
const KTJ = new user("김태정님", "태정", "김", 39);

console.log(JBH.sayHi());