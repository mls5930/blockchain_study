const j = {
    fn1: (a:number, b:number):number => {
    return 1;
}
}

const fn1 = (a:number, b:number):number => {
    return 1;
}

const fn2 = <T>() :T => {
    return "1" as T;
}

// const fn1 = <T>(a:number, b:number):T => {
//     return 1;
// }

// 정적으로 number만을 표현할 수 있는 함수다! 가아니라
// 얘는 호출하는 시점에서 타입을 결정하고 싶다면?

fn2<string>();

const fn4 = <T>():T => {
    return "1" as T
}

fn4<string>()

// as T는 왜 어설션을 사용해야 함?

const fn100 = (): string | number | Array<string> => {
    return "1"
}

fn100();

const fn101 = (): any => {
    return "1"
}

fn101();

// 왜 이런 동적 타입같은 기능을 제공할까?
// 코드의 재사용성
// 아 ㅋㅋ 코드의 재사용성 높힐라고 이딴짓을 하는거구나 알고만 있을게요 ㅎㅎ
// 아닙니다.

// 1. 예상 가능한 범위 내에서 코드를 작성하면서도, 체계적인 규칙을 벗어나지 않아야 한다. => 인지
//    이러한 기준속에서 여러분들은 코드를 작성해야합니다.
// 2. 그리고 타입도 매개변수화 할 수 있다.