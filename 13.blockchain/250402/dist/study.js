"use strict";
const 유저1 = {
    아이디: "블록체인1234",
    비밀번호: 1234
};
const 유저2 = {
    아이디: 1234,
    비밀번호: 1234
};
const 유저3 = {
    아이디: ["블록체인1234"],
    비밀번호: 1234
};
const 유저4 = [
    {
        아이디: "블록체인1234",
        비밀번호: 1234
    }
];
const 유저5 = [
    [
        {
            아이디: "블록체인1234",
            비밀번호: 1234
        }
    ]
];
const 유저6 = [
    {
        아이디: ["블록체인1234"],
        비밀번호: 1234
    }
];
const 유저7 = [
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
];
const 함수 = (a, b) => {
    console.log(a, b);
    return b;
};
console.log(함수(123, "이거123"));
console.log(함수(123, 456));
const value = "Hello, TypeScript!";
const strLength = value.length;
console.log(strLength); // 18
