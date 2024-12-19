const dataList = document.querySelector("#dataList");

// 댓글 리스트를 화면에 출력하는 함수
function drawing() {
    const board = JSON.parse(localStorage.getItem("board")) || []; // 기존 댓글 데이터 가져오기 (빈 배열 기본값)
    dataList.innerHTML = ""; // 기존 리스트 초기화
   
    for(let i = 0; i < board.length; i++) {
      const dataListItem = document.createElement("div");
      dataListItem.setAttribute("class", "data-list-item");
      // data-*
      // data-*는 HTML에 데이터를 추가하기 위해 사용된다.
      // 나중에 이벤트 객체에서 dataset으로 쉽게 접근하고 수정할 수 있다.
      // e.target.dataset.index => 특정 유저의 특정 아이디 접근
      dataListItem.setAttribute("data-index", board[i].userId);
  
      const dataListId = document.createElement("a");
      const dataListEmail = document.createElement("div");
      const dataListDate = document.createElement("div");
      const dataListDeleteBtn = document.createElement("div");

      dataListDeleteBtn.setAttribute("class", "user-delete-btn");
      dataListId.setAttribute("href", `./view.html?userId=${board[i].userId}`);
  
      dataListId.innerHTML = board[i].userId;
      dataListEmail.innerHTML = board[i].email;
      dataListDate.innerHTML = board[i].date;
      dataListDeleteBtn.innerHTML = "❌";
  
      dataListItem.append(
        dataListId,
        dataListEmail,
        dataListDate,
        dataListDeleteBtn
      );

      dataList.append(dataListItem);
    }
}

drawing();

dataList.addEventListener('click', userDelete)