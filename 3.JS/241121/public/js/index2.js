// 객체 복사하기

// 배열을 다시 복기해보자.
// const arr = [12, 15];
// const arr2 = [...arr];
// arr2[0] = 20;
// console.log(arr);

const Person = {
    name: "홍길동",
    age: 32
}

// 참조값 => 집주소
// const clone = Person
// 새로운 참조값을 만들고 Person의 인적사항을 복사해줘.
const clone = { ...Person };

clone.name = "주병현";
clone.age = 50;

console.log(Person.age === clone.age); // false


