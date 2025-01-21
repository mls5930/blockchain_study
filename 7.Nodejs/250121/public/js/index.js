const form = document.querySelector("form");
const user_id = document.querySelector("input[type=text]");
const user_pw = document.querySelector("input[type=password]");

const xhr = new XMLHttpRequest();

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if(!user_id.value) return alert("아이디 입력해주세요!");
    if(!user_pw.value) return alert("비밀번호 입력해주세요!");
    xhr.open('post', '/user/login');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send(`user_id=${user_id.value}&user_pw=${user_pw.value}`);
    xhr.onload = () => {
        const { success, redirect } = JSON.parse(xhr.responseText);
        if(success) window.location.href = redirect; // 서버가 보낸 URL로 이동
    }
})

/*
    form.addEventListener("submit", (e) => {
        // form태그 폼 제출 이벤트 막음
        // 왜? 화면의 빈 값 체크하려고
        // 일단 빈 값 체크부터 할게요!
        e.preventDefault();
        if(!user_id.value) return alert("아이디 입력해주세요!");
        if(!user_pw.value) return alert("비밀번호 입력해주세요!");
        // 어떻게 서버로 다시 요청값을 보낼까....?
        
        // 유효성 검사가 끝났으니, 이상이 없다면, 다시 폼 값을 만들어서
        // AJAX => XMLHttpRequest()
        // 서버 특정 라우트 URL 및 HTTP 메서드 정보 적음
        xhr.open('post', '/user/login');
        // Content-Type 명시 즉, 요청 데이터의 형식을 알려주는 부분
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        // 서버로 데이터를 실제로 보내는 부분 작성 => 요청 본문
        xhr.send(`user_id=${user_id.value}&user_pw=${user_pw.value}`);
        // 그 이후, 서버가 응답을 보냈을 때, 실행되는 코드
        xhr.onload = () => {
            // 왜? 서버에서 작성한 리다이렉트가 안됐을까?
            // AJAX 요청 => 서버에서 응답이 온다는 것들을 단순한 데이터로 취급
            // 서버는 데이터만 응답주는걸 책임지겠다 이거야.
            const { success, redirect } = JSON.parse(xhr.responseText);
            if(success) window.location.href = redirect; // 서버가 보낸 URL로 이동
        }
    })
*/