const array1 = ["user-id", "writer", "title", "content"];
const req = {
    body : {
        "user-id": "wnqudgus1234",
        writer: "주병현",
        title: "forof은 정말 재밌습니다.",
        content: ""
    }
}

// 보통 우리가 속성에 접근하려면 뭘 사용했을까?

// 점 표기법
// console.log(req.body.user_id);

// 대괄호 표기법
// console.log(req.body["writer"]);

// for of
for(const field of array1) {
    // user-id
    // writer
    // title
    // content
    if(req.body[field] === "") {
        // content가 빈 값입니다!
        console.log(`${field}가 빈 값 입니다!`);  
    }
}

