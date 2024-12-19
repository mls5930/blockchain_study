const userDelete = (e) => {
  if(e.target.className === "user-delete-btn") {
    const result = confirm("진짜 삭제 허시겠습니까?");
    if(result) {
      const parentElement = e.target.parentNode;
      // 좀 더 명확하게 삭제하기 위해서 userId를 구함.
      const userId = parentElement.dataset.index; // dataset객체를 통해 data-index값을 가져옴
      const board = JSON.parse(localStorage.getItem('board'));
      // 반복문을 돌리기 싫다면, 해당 index를 drawing함수에서 화면을 그릴 때, 아예 index를 넣어줘도 됩니다.
      for(let i = 0; i < board.length; i++) {
        if(board[i].userId === userId) board.splice(i, 1);
      }
      localStorage.setItem("board", JSON.stringify(board));
      location.href = "./list.html";
    }
  }
}
