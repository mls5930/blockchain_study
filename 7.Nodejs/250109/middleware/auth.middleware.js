const authCheck = (req, res, next) => {
    console.log("나는 첫 번째 미들웨어");
    
    // 쿠키값을 항상 꺼내와서 있는지 없는지만 체크할겁니다.
    const { user_id } = req.cookies
    // 로그인 되어있다면, 다음 콜백 함수 즉, 글쓰기 화면을 출력하는 함수 호출해
    if(user_id) {
        next();
    // 로그인 안되어있어? 너 권한 없어. 로그인 페이지로 가
    } else {
        return res.redirect('/login');
    }
}

module.exports = {
    authCheck
}