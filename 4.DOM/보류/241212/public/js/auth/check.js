const getUser = JSON.parse(localStorage.getItem('user')) || ""

if(!getUser) {
    alert("로그인을 먼저 해주세요");
    return location.href = "./login.html"
}