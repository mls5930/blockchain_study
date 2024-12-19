const e = {
    target : {
        content : {
            userId: "주병현",
            value: "첫 댓글입니다.",
            date: "2024-11-28"
        }
    }
}

const { userId, value, date } = e.target.content
/*
    const userId = "주병현"
    const value = "첫 댓글입니다"
    const date = "2024-11-28"
*/
console.log(userId);
console.log(value);
console.log(date);


/*
    위와 같음

    content : {
        value : "첫 댓글입니다." 
    }
*/