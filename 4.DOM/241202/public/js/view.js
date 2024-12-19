const dataList = document.querySelector('#dataList');
const userIdTitle = document.querySelector('#userIdTitle');

const userId = location.search;
if(userId === ""){
    alert('정상적인 방법으로 접근해주세요');
    location.href = "./list.html";
}

const parseUserId = userId.split("=") // 반환값 타입 => 배열
const readUser = () => {
    const board = JSON.parse(localStorage.getItem('board')) || [];
    let result = {};
    for(let i = 0; i < board.length; i++) {
        if(board[i].userId === parseUserId[1]){
            result = {...board[i]};
        }
    }
    const dataListItem = document.createElement("div");
    dataListItem.setAttribute("class", "data-list-item");
    dataListItem.setAttribute("data-index", result.userId);
    userIdTitle.innerHTML = `${result.userId}님의 개인정보`;

    const dataListId = document.createElement("div");
    const dataListEmail = document.createElement("div");
    const dataListDate = document.createElement("div");
    const dataListDeleteBtn = document.createElement("div");

    dataListDeleteBtn.setAttribute("class", "user-delete-btn");

    dataListId.innerHTML = result.userId;
    dataListEmail.innerHTML = result.email;
    dataListDate.innerHTML = result.date;
    dataListDeleteBtn.innerHTML = "❌";

    dataListItem.append(
    dataListId,
    dataListEmail,
    dataListDate,
    dataListDeleteBtn
    );

    dataList.append(dataListItem);

}

readUser();

dataList.addEventListener('click', userDelete)

