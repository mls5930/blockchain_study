const dataForm = document.querySelector("#dataForm");

const userCreate = (e) => {

    const { userId, email } = e.target

    const userValue = userId.value;
    const userEmail = email.value;

    const board = JSON.parse(localStorage.getItem("board")) || [];

    board.push({
        userId: userValue,
        email: userEmail
    })

    localStorage.setItem("board", JSON.stringify(board));

}


dataForm.addEventListener("submit", userCreate);