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
console.log(strLength);
function assertIsString(value: unknown): asserts value is string {
    if (typeof value !== "string") {
        throw new Error("값이 문자열이 아닙니다!");
    }
}

const data: unknown = "TypeScript";
assertIsString(data);
console.log(data.toUpperCase());
type User = { id: number; name: string };


function assertIsUser(obj: any): asserts obj is User {
    if (typeof obj !== "object" || typeof obj.id !== "number" || typeof obj.name !== "string") {
        throw new Error("User 타입이 아닙니다!");
    }
}

const userData: any = { id: 1, name: "Alice" };
assertIsUser(userData);
console.log(userData.name.toUpperCase()); // "ALICE" (안전하게 사용 가능!)
