const logout = document.querySelector("#logout");

const checkCookie = (cookie, key) => {
    const token = cookie
        .split(";")
        .map((value) => value.split("="))
        .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {})
    return token[key]
}

logout.addEventListener('click', async() => {
    const token = checkCookie(document.cookie, "token");
    const flag = confirm('정말 로그아웃 하시겠습니까?');
    if(flag) {
        const response = await fetch('/user/logout', {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });
        const result = await response.json();
        
        if(result.success) window.location.href = result.redirect;
    }
})

/*
    {
        "sub": "1234567890", => 토큰의 고유 식별자.,
        "name": "Ju Byeong Hyeon",
        "iat": 1516239022 => 토큰이 발급된 시간.,
        "userid": "wnqudgus1234"
    }
*/