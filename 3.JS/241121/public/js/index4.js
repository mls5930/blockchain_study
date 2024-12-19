// 객체 덮어쓰기와 병합

const Person = {
    firstName: "주",
    age: 32,
    secondName:"병현"
}

const Person2 = {
    name: "주병현",
    age: 49
}


/*
    const clone = { ...Person, ...Person2 }
    => 위의 변수 클론을 아래로 해부해 보자면 다음과 같다.

    const clone = {
        firstName: "주",
        secondName:"병현"
        name: "주병현",
        age: 49
    }

    const clone = { ...Person, ...Person2, age: 50 }
    => 다음과 같이 또 해부해보면 결과물은 다음과 같다.

    const clone = {
        firstName: "주",
        secondName: "병현",
        name: "주병현",
        age: 49,
        age2: 50
    }
*/

const clone = { ...Person, ...Person2, age: 50 }

console.log(clone);
