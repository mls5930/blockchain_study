/*
    require 함수가 호출될 때, 해당 모듈 파일이 처음으로 로드되고 실행됩니다.  
    이 과정에서 아래 코드를 봤을 때, index2.js(모듈)내의 모든 코드는 실행됩니다.
*/
const { name } = require('./index4');

/*
    module객체는 Node.js에서 기본적으로 제공되는 내장 객체 중 하나.
    => 런타임 환경엔진....시간이 걸린다 인지..
    => 효율적으로 일을 하자
    Node.js는 모듈 시스템을 통해서 코드를 재사용할 수 있다.

    이를 가능하게 하는 핵심 요소 중 하나가 `module` 객체
    각 파일을 모듈로 취급하고, 모듈간의 데이터를 주고받기 위해서 존재

    - module.exports: 모듈에서 내보내는 객체나 값 정의
    - require 함수: 다른 파일에서 정의된 모듈을 불러오는 역할

    자! 실습 20분간

    study.js 파일을 생성

    계산기 만드세요 => add, minus, mul

    위의 add,minus,mul은 각각 함수로 정의하고, 기능을 구현하세요.
    ex=> return num1 + num2;
    그리고 모듈로 다 내보내세요

    study2.js에서 require 함수를 이용해서 study.js에서 내보낸 모듈을 받습니다.
    그리고 함수를 호출하세요 => 각 함수의 결과물을 console.log찍어서 보여주세요. 

    스타트
*/
