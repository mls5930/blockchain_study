let _num = 1;
let _num2 = 7;
// == => 데이터 "값"만 비교
// === => 데이터 "타입"까지 비교
console.log(_num === _num2);

//8
let _num3 = _num + _num2
//8
let _num4 = _num + _num2

// 증감 연산자
// 먼저 증가하고 나중에 값을 호출한다.
console.log(++_num3);

// 먼저 값을 호출하고 나중에 증가한다.
console.log(_num4++);
console.log(_num4);

// 빼기
let _num5 = _num - _num2;
// 곱하기
let _num6 = _num * _num2;
// 나머지
        //    1      7
let _num7 = _num % _num2;
console.log(_num7);
let _num10 = 10;
// 10을 5로 나누고 그 나머지를 구하는 연산
// 복합 대입 연산자
_num10 %= 5; // => _num10 = _num10 % 5
// 10을 5로 나눈 값
_num10 = _num10 / 5;
console.log(_num10);

// 부정 연산자
// 반환되는 값의 반대되는 boolean값
// false
console.log(true !== true);

// 이따 오후에는 대소관계 연산자(얘가 얘보다 크냐 작냐 => true, false)
// 10이 20보다 커? => 아니오(false)
console.log(10 > 20);



