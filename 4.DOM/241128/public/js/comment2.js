const commentFrm = document.querySelector('#commentFrm');
const commentRow = document.querySelector('.comment-row');

const list = [];

const drowing = () => {
    const listDiv = document.createElement("div");
    const commentId = document.createElement("div");
    const commentContent = document.createElement("div");
    const commentDate = document.createElement("div");

    for (let i = 0; i < list.length; i++) {
        // 댓글 데이터 설정
        listDiv.append(commentId);
        listDiv.append(commentContent);
        listDiv.append(commentDate);

        listDiv.setAttribute("class", "comment-row-list");
        listDiv.setAttribute("id", `commentRowList${i}`);
        commentId.setAttribute("class", "comment-id");
        commentContent.setAttribute("class", "comment-content");

        commentDate.setAttribute("class", "comment-date");

        commentId.innerHTML = list[i].userId;
        commentContent.innerHTML = list[i].content;
        commentDate.innerHTML = list[i].date;

        commentRow.append(listDiv);
    }
};

const userCreate = (e) => {
    e.preventDefault();

    const content = e.target.content.value;
    const comment = {
        userId: "주병현",
        content: content,
        date: "2024-11-28",
    }

    list.push(comment);
    drowing();
}

commentFrm.addEventListener('submit', userCreate)
