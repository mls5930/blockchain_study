// // exports는 참조의 개념이다.
// // module.exports는 기본값이 빈 객체이기 때문에 값을 할당하면서 넘길 수 있다.

// const exports = module.exports // {}
// console.log(exports === module.exports); // true

// // module.exports // {}
// module.exports = {
//     age: "40",
//     name: "주병현"
// }

// 빈 객체에 바로 할당을 하여서 exports로 넘길 수 있다.

const a = () => {
    // 리턴을 명시해주지 않으면 return이 undefined로 있는다
    return "a"
};
const b = () => {
    // 리턴을 명시해주지 않으면 return이 undefined로 있는다
    return "b"
};
// module.exports = {
//     a,b
// }

// 함수나 변수를 바로 전달하고 싶을 때, 코드를 효율적으로 줄일 수 있다.
// module.exports = {
//     a:a,
//     b:b
// }

exports.name = () => {
    return "hello world"
}