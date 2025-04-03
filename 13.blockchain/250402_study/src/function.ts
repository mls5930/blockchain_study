
const j = {
    fn1: (a: number, b: number): number => {
        return 1;
    }
}
const fn1 = (a: number, b: number): number => {
    return 1;
}
const fn2 = <T>(a: number, b: number): T => {
    // 나는 리턴 타입을 숫자 1 또는 문자열 1을 호출할 떄 결정하고 싶어.
    return "1" as T;
}


// const fn2 = <T>(a: number, b: number): T => {
//     return 1;
// }

// 정적으로 number 만을 표현할 수 있는 함수다! 가 아니라 
// 애는 호출하는 시점에서 타입을 결정하고 싶다면?

const result = fn2<string>(1, 2)

// 왜 이런 동적 타입같은 기능을 제공할까?
// 코드의 재사용성
// 1.예상 가능한 범위 내에서 코드를 작성하면서도, 체계적인 규칙을 벗어나지 않아야 한다 => 인지
//      이러한 기준속에서도 여러분들은 코드를 작성해야합니다.
// 2.그리고 타입도 매개변수화 할 수 있다.