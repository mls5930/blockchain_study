const logout = document.querySelector("#logout");

const xhr = new XMLHttpRequest();
logout.addEventListener('click', () => {
    const flag = confirm('정말 로그아웃 하시겠습니까?');
    if(flag) {
        xhr.open("POST", '/user/logout');
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
        xhr.onload = () => {
            const { redirect } = JSON.parse(xhr.responseText);
            console.log(redirect);
            if(xhr.status === 200) {
                alert("로그아웃 됬음");
                window.location.href = redirect;
            } 
        }
    }
})

// 1. 눌렀을 때, 정말 로그아웃 하시겠습니까? => 예
// 2. 예를 누르면, 다시 폼 제출해서 로그아웃 할거임.
// 3. XMLHttpRequest 객체 이용할거임.
// 4. 서버에서 쿠키 지웠으면 다시 메인 홈페이지로 이동