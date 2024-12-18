const a = 20;

function one() {
    let b = 10;
    function three() {
      let c = 20; // uninit
      console.log(a + b + c);
    }
    three();
}
  
one();

/*
   평가(변수 선언, 함수 선언) -> 실행(함수 호출, 값의 할당) -> 함수는 호출되면 평가 -> 실행

    < 1 >
    평가 : const a = uninitialized
    : function one() 
    실행 : const a = 1
    : one()

    < 2 >
    one-평 : let b = uninitialized 
    : function three() 
    one-실 : let b = 10
    : three()

    < 3 >
    three-평 : let c = uninitialized
    three-실 : let c = 20
    : console.log(a + b + c)

    < 4 >
    상위 스코프에서 값을 가져옴
    a + b + c =  20 + 10 + 20 = 50

    평가: 메가커피 3500원, 메가커피 꿀 3200원, 혜성님 => 메가커피 3000원

    9700원 =>
*/