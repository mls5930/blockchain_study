// getElementById
// getElementsByTagName
// getElementsByClassName

// gnb안에 있는 li만 선택하는 두 가지 방법

// 첫 번째 방법
const gnb = document.getElementById('gnb');
const liList = gnb.getElementsByTagName("li");

// 두 번째 방법
// 배열이다.
const gnbs = document.querySelectorAll('#gnb > li');
console.log(gnbs);

// 단 하나의 요소
const li = document.querySelector('body > ul:nth-of-type(2) > li');
li.innerHTML = "나는 여전히 두 번째 li이지롱";
console.log(li);