const commentFrm = document.querySelector('#commentFrm');
const commentRow = document.querySelector('.comment-row');

// 빈 배열
const list = [
    // {
    //     userId: "주병현",
    //     content: "두 번째 댓글입니다.",
    //     date: "2024-11-28"
    // }
];

/*
    글을 쓰고, 삭제, 업데이트 했을 때, 화면에 다시 보여주어야 함. => drowing 기능

    <div class="comment-row-list">
        <div class="comment-id">주병현</div>
        <div class="comment-content">첫 번째 댓글입니다</div>
        <div class="comment-date">2024-11-28</div>
    </div> 
*/
const drowing = () => {
    const listDiv = document.createElement("div");
    const commentId = document.createElement("div");
    const commentContent = document.createElement('div');
    const commentDate = document.createElement('div');

    listDiv.append(commentId);
    listDiv.append(commentContent);
    listDiv.append(commentDate);

    listDiv.setAttribute("class", "comment-row-list");
    commentId.setAttribute("class", "comment-id");
    commentContent.setAttribute("class", "comment-content");
    commentDate.setAttribute("class", "comment-date");

    commentId.innerHTML = list[0].userId;
    commentContent.innerHTML = list[0].content;
    commentDate.innerHTML = list[0].date;
 
    console.log(listDiv);
    commentRow.append(listDiv);
}

// Create => 먼저 만들기 => 좀 더 수월하다
const userCreate = (e) => {
    e.preventDefault();

    const content = e.target.content.value;
    // 이름, 내용, 날짜 => 배열에 할당 => 배열을 이용해서 화면에 출력함
    const comment = {
        userId: "주병현",
        content: content,
        date: "2024-11-28"
    }

    list.push(comment);
    console.log(list);
    drowing();
}

commentFrm.addEventListener('submit', userCreate)
