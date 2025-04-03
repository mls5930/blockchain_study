interface 공부<타입> {
    아이디: 타입,
    비밀번호: number
}

const 유저1: 공부<string> = {
    아이디: "블록체인1234",
    비밀번호: 1234
}

const 유저2: 공부<number> = {
    아이디: 1234,
    비밀번호: 1234
}

const 유저3: 공부<string[]> = {
    아이디: ["블록체인1234"],
    비밀번호: 1234
}
const 유저4: 공부<string>[] = [
    {
        아이디: "블록체인1234",
        비밀번호: 1234
    }
]
const 유저5: 공부<string>[][] = [
    [
        {
            아이디: "블록체인1234",
            비밀번호: 1234
        }
    ]
]
const 유저6: 공부<string[]>[] = [
    {
        아이디: ["블록체인1234"],
        비밀번호: 1234
    }
]
const 유저7: 공부<string[]>[][][][][][][][][][] = [
    [
        [
            [
                [
                    [
                        [
                            [
                                [
                                    [
                                        {
                                            아이디: ["블록체인1234"],
                                            비밀번호: 1234
                                        }
                                    ]
                                ]
                            ]
                        ]
                    ]
                ]
            ]
        ]
    ]
]

const 함수 = <T>(a: number, b: T): T => {
    console.log(a, b);
    return b;
};

console.log(함수(123, "이거123"));
console.log(함수(123, 456));

const value: any = "Hello, TypeScript!";
const strLength: number = (value as string).length;
console.log(strLength); // 18