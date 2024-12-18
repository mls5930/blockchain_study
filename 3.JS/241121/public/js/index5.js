// 객체 안에 객체
// 0: 12, 1: 15, 2: [0: 12, 1: 15]
// const arr = [12, 15, 
//     [
//         12, 15
//     ]
// ]

const obj1 = {
    name: {
        firstName:"주",
        secondName: "병현"
    },
    age: 30,
}
 
const clone = { ...obj1 };
clone.name.firstName = "김";
console.log(obj1.name.firstName);