
// 인덱스와 상관없이 끝부터 삭제
// arr.pop();

// 특정 인덱스부터 특정 개수만큼 삭제

const arr = [
    "첫 번째 댓글입니다.",
    "비밀 댓글입니다.",
    "세 번째 댓글입니다.",
    "네 번째 댓글입니다.",
    "다섯 번째 댓글입니다.",
];


// slice,splice 다 중요하진 않습니다. => index => 내가 뭘 삭제할건데?
const inputIndex = Number(prompt("삭제할 댓글을 선택해주세요"));
// 삭제 함수
function deleteFunction (index) {
    arr.splice(index, 1);
    console.log(arr);
}

// 내가 보기 편한 기능을 만들고 싶다면 만들면 된다.
deleteFunction(inputIndex);

