const commentFrm = document.querySelector('#commentFrm');
const commentRow = document.querySelector('.comment-row');

const list = [];

const drowing = () => {
    commentRow.innerHTML = "";

    for(let i = 0; i < list.length; i++){
        const listDiv = document.createElement("div");
        const commentId = document.createElement("div");
        const commentContent = document.createElement("div");
        const commentDate = document.createElement("div");
        const commentTitle = document.createElement("div");
        const commentDeleteBtn = document.createElement("div");
  
        listDiv.append(commentId);
        listDiv.append(commentContent);
        listDiv.append(commentDate);
    
        listDiv.setAttribute("class", "comment-row-list");
        listDiv.setAttribute("id", `commentRowList${i}`);
        commentId.setAttribute("class", "comment-id");
        commentContent.setAttribute("class", "comment-content");

        commentContent.append(commentTitle);
        commentContent.append(commentDeleteBtn);

        commentTitle.setAttribute("class", "comment-title");
        commentDeleteBtn.setAttribute("class", "comment-delete-btn");
        
        commentTitle.innerHTML = list[i].content;
        commentDeleteBtn.innerHTML = "❌";

        commentDate.setAttribute("class", "comment-date");
    
        commentId.innerHTML = list[i].userId;
        commentDate.innerHTML = list[i].date;
     
        commentRow.append(listDiv);
    }
}

const userCreate = (e) => {
    e.preventDefault();

    const content = e.target.content.value;
    const comment = {
        userId: "주병현",
        content: content,
        date: "2024-11-29",
        updated: false,
    }

    list.push(comment);
    drowing();
    e.target.content.value = "";
}

const findIndex = (e) => {
    const findId = e.target.parentNode.parentNode.id;
    const replaceString = findId.replace("commentRowList",""); // "0"
    return parseInt(replaceString);
}

const userDelete = (e) => {
    if(e.target.className === "comment-delete-btn") {
        const index = findIndex(e)
        const really = confirm("진짜 삭제 하시겠습니까?");
        if(really) {
            list.splice(index, 1); 
            drowing();
        } 
    }
}

const userUpdate = (e) => {
    if(e.target.className === "comment-title") {
        const index = findIndex(e)
        list[index].updated = !list[index].updated;
        const flag = list[index].updated;
        const parentNode = e.target.parentNode
        parentNode.innerHTML = ""
        if(flag) {
            const commentInput = document.createElement("input");
            commentInput.value = e.target.innerHTML;

            const deleteBtn = document.createElement("div");
            deleteBtn.setAttribute("class", "comment-delete-btn");
            deleteBtn.innerHTML = "❌";

            parentNode.append(commentInput);
            parentNode.append(deleteBtn);
            commentInput.addEventListener("keyup", function (event) {
                if(event.keyCode !== 13) {
                    return;
                }
                list[index].content = event.target.value;
                list[index].updated = !list[index].updated;
                console.log(list);
                drowing();
            })
        }
    }
}

commentFrm.addEventListener("submit", userCreate);
commentRow.addEventListener("click", userDelete);
commentRow.addEventListener("click", userUpdate);