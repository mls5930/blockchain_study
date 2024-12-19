const dataList = document.querySelector("#dataList");

// 댓글 리스트를 화면에 출력하는 함수
function drawing() {
    const board = JSON.parse(localStorage.getItem("board")) || []; // 기존 댓글 데이터 가져오기 (빈 배열 기본값)
    dataList.innerHTML = ""; // 기존 리스트 초기화
  
    for(let i = 0; i < board.length; i++) {
      const dataListItem = document.createElement("div");
      dataListItem.className = "data-list-item";
  
      const dataListId = document.createElement("div");
      const dataListEmail = document.createElement("div");
  
      dataListId.textContent = `아이디: ${board[i].userId}`;
      dataListEmail.textContent = `이메일: ${board[i].email}`;
  
      dataListItem.append(dataListId, dataListEmail);
      dataList.append(dataListItem);
    }
}

drawing();
