const stringArray: string[] = [
    "15%",
    "16%",
    "17%"

];
const numberArray: number[] = [
    15,
    16,
    17

];

const Array2: Array<string | number> = [
    "15%",
    "16%",
    "17%",
    3

];

type 한글자 = (string | number | (string | number)[])[]


const stringArray2: 한글자 = ["150", 200, ["da", 1]]