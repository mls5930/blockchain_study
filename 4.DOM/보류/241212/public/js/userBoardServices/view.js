const dataList = document.querySelector('#dataList');
const userTitle = document.querySelector('#userTitle');
const searchList = location.search.split("=");
const userIndex = parseInt(searchList[2]);


const findUser = (board, userId) => {
  for (let i = 0; i < board.length; i++) {
    if (board[i].userId === userId) {
      return board[i];
    }
  }
};

// 댓글 리스트를 화면에 출력하는 함수
const readUser = () => {
  const board = JSON.parse(localStorage.getItem('board')) || []; // 기존 댓글 데이터 가져오기 (빈 배열 기본값)
  dataList.innerHTML = ''; // 기존 리스트 초기화
  // 디코딩 처리
  const params = new URLSearchParams(location.search);
  const userId = params.get('userId'); // "한글" (디코딩된 결과)
  const result = findUser(board, userId);

  const dataListItem = document.createElement('div');
  dataListItem.setAttribute('class', 'data-list-item');
  dataListItem.setAttribute('data-index', result.userId);

  const dataListId = document.createElement('div');
  const dataListEmail = document.createElement('div');
  const dataListDate = document.createElement('div');
  const dataListDeleteBtn = document.createElement('div');

  dataListId.setAttribute('class', 'user-id');
  dataListEmail.setAttribute('class', 'user-email');
  dataListDeleteBtn.setAttribute('class', 'user-delete-btn');

  dataListId.innerHTML = result.userId;
  userTitle.innerHTML = `${result.userId} 님 정보 수정페이지 이동`;
  userTitle.setAttribute(
    'href',
    `./modify.html?userId=${result.userId}&email=${result.email}&userIndex=${userIndex}`
  );
  dataListEmail.innerHTML = result.email;
  dataListDate.innerHTML = new Date();
  dataListDeleteBtn.innerHTML = '❌';

  dataListItem.append(
    dataListId,
    dataListEmail,
    dataListDate,
    dataListDeleteBtn
  );
  dataList.append(dataListItem);
};

readUser();

dataList.addEventListener('click', userDelete);
