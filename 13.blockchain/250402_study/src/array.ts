const stringArray: string[] = [
    "17%"
]

const numberArray: number[] = [1,2,3];

// 튜플
const stringArray2: [string, number, string[]] = ["150", 200, ["dd"]]

// <> 제네릭 또는 제네릭 괄호
const stringArray3:Array<string | number> = ["12년산 동동주", "호랑이 막걸리", 1]

type 한글자 = (string | number | (string | number)[])[]
const stringArray4: 한글자 = ["150", 200, ["dd", 1]]
