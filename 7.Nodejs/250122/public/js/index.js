const form = document.querySelector("form");
const user_id = document.querySelector("input[type=text]");
const user_pw = document.querySelector("input[type=password]");

form.addEventListener("submit", async(e) => {    
    e.preventDefault();
    if(!user_id.value) return alert("아이디 입력해주세요!");
    if(!user_pw.value) return alert("비밀번호 입력해주세요!");

    try {
        const response = await fetch('/user/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    user_id: user_id.value,
                    user_pw: user_pw.value
                }
            )
        })
        const result = await response.json();
        if(result.success) window.location.href = result.redirect
    } catch (error) {
        console.log(error);
    }
})
