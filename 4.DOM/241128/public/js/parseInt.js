// parseInt

// parseInt의 인자값이 존재함.
// 해당 인자 문자열에 포함된 숫자를 찾아서 number로 형변환 
// 문자열이 문자가아닌 숫자열로 사용해야 넘버형으로 변환해줌 => 문자먼저 없애라.
const id = "commentRowList0"
const stringConvert = id.replace("commentRowList", "")

let b = parseInt(stringConvert);
// 인덱스를 찾는 과정
console.log(b);
