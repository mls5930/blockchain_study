
const flower = JSON.parse(localStorage.getItem("flower"));

const dataList = document.querySelector("#dataList");

for(let i = 0; i < flower.length; i++) {
    const firstImg = document.createElement("img");
    firstImg.setAttribute("src", flower[i].img)
    firstImg.setAttribute("height", flower[i].height)
    firstImg.setAttribute("width", flower[i].width)
    dataList.append(firstImg);
}
