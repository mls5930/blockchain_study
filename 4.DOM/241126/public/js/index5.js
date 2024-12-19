const form = document.querySelector('#loginForm');
const uid = document.querySelector('#uid');
const upw = document.querySelector('#upw');

function submitHandler(e) {
    // action에 적힌 경로로 값을 들고 이동하기 전에
    // 잠깐 멈춘다 => 우리가 아이디 비밀번호 검증을 해야 하기 때문에
    e.preventDefault();

    // 검증 => 아이디, 비번 input태그에 빈 값 체크
    if(uid.value === "") {
        const error = document.createElement('div');
        // <div></div>
        error.setAttribute("class", "error");
        // <div class="error"></div>
        error.innerHTML = '너 id의 값이 빈값이야';
        // <div class="error">너 id의 값이 빈값이야</div>
        form.append(error)
        throw new Error("너 uid의 값이 빈값이야.")
    }
    else if(upw.value === "") {
        throw new Error("너 upw의 값이 빈값이야.")
    // id와 pw가 빈 값이 아니다 => 즉 정상적으로 값이 담겼다. => 네이버로 경로 이동
    } else {
        window.location.href = `https://search.naver.com/search.naver?userid=${uid.value}`
    }
}

form.addEventListener('submit', submitHandler)