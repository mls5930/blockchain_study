const boardList = {
    id: 1,
    writer: "Alice",
    title: "제목",
    content: "내용",
    hit: 0
}

// console.log(boardList['id']);
// console.log(boardList['writer']);
// console.log(boardList['title']);
// console.log(boardList['content']);
// console.log(boardList['hit']);

for(const key in boardList) {
    console.log(boardList[key]);
}

// 순회를 할 수 있다.