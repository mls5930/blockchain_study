const form = document.querySelector('#loginForm');
const uid = document.querySelector('#uid');
const upw = document.querySelector('#upw');

const error = document.createElement("div");
error.setAttribute("class","error")
form.append(error)

const userInfo = [
    {
        userId: "주병현",
        userPw: 1234
    },
    {
        userId: "김태정",
        userPw: 1234
    }
]

function emptyValueCheck() {
    if(uid.value === "") {
        error.innerHTML = "아이디를 입력해주세요.";
        return;
    }
    if(upw.value === "") {
        error.innerHTML = "패스워드를 입력해주세요.";
        return;
    }
}

// event = evnetObject
function userCheck(event) {
    event.preventDefault();

    emptyValueCheck();

    for(let i = 0; i < userInfo.length; i++) {
        if(uid.value === userInfo[i].userId && Number(upw.value) === userInfo[i].userPw) {
            // classList는 class에 이름을 하나 더 넣든가, 빼든가 하는 것.
            error.classList.add("victory");
            error.classList.remove("error");
            error.innerHTML = "로그인에 성공했습니다."
            window.location.href = `https://search.naver.com/search.naver?userid=${uid.value}&userPw=${upw.value}`
        }
        // 아이디가 존재하지 않았을 때
        if(uid.value !== userInfo[i].userId) {
            error.innerHTML = "존재하지 않는 아이디입니다.";
        }
        // 비교를 통해서 아이디는 찾았어
        if(uid.value === userInfo[i].userId) {
            // 찾은 아이디의 패스워드가 존재하지 않았을 때
            if(Number(upw.value) !== userInfo[i].userPw) {
                error.innerHTML = "패스워드가 틀렸습니다";
            }
        }
    }
    // 검증해야 하니까
    // 1. 빈 값 체크
    // 2. 아이디, 비밀번호 존재여부
    // window.loaction.href = "www.naver.com?userId=주병현&userPw=1234"
}

form.addEventListener('submit', userCheck);