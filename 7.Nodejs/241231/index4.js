// 홍길동 => 길동 홍

// 메서드, this를 활용해서 person2가 가지고 있는
// firstName에 "길동"을 넣고, lastName에 "홍"을 넣어보자
const person2 = {
    name : "",
    firstName: "",
    lastName: " ",
    age: 32,
    set _name(value) {
        const arr = value.split("");
        this.name = value;
        this.lastName = arr[0];
        this.firstName = arr[1] + arr[2];
    },
    get _name() {
        return this.firstName + " " + this.lastName;
    }
}

person2._name = "홍길동" // ["홍", "길", "동"]
console.log(person2._name);



// person2.age = 50;
// person2.firstName = "홍";
// person2.lastName = "길동";
// console.log(person2);