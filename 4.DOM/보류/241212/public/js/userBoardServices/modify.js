const dataList = document.querySelector('#dataList');
const userTitle = document.querySelector('#userTitle');
const params = new URLSearchParams(location.search);
const urlUserId = params.get('userId');
const urlUserEmail = params.get('email');
dataList.children[0].value = urlUserId;
dataList.children[1].value = urlUserEmail;

const searchList = location.search.split('=');
const userIndex = searchList[3]


const modifyUserList = (board, userId, changeUserId, changeEmail) => {
  if(board[userIndex].userId === userId) {
      board[userIndex].userId = changeUserId;
      board[userIndex].email = changeEmail;
      board[userIndex].date = new Date();
  }
  return board;
};

const userUpdate = (e) => {
  const { userId, email } = e.target;
  const changeUserIdValue = userId.value;
  const changeEmailValue = email.value;

  const board = JSON.parse(localStorage.getItem('board')) || []; // 기존 댓글 데이터 가져오기 (빈 배열 기본값)

  const result = modifyUserList(
    board,
    urlUserId,
    changeUserIdValue,
    changeEmailValue
  );

  localStorage.setItem('board', JSON.stringify(result));
};

dataList.addEventListener('submit', userUpdate);
