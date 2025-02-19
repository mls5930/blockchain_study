class Cat {
   constructor(props) {
    // 이름이라는 추상적인 데이터를 정의하고 싶다.
    // cat1.name = props;
    // cat2.name = props;
    this.name = props;
   } 
}

const cat1 = new Cat("나비");
const cat2 = new Cat("고앵이");
console.log(cat2);

// 추상적인 존재를 누가 실체화 시켰느냐?에 따라서 this는 달라진다.
// 즉, 호출 또는 실행되었을 때!!!! this가 결정된다가 이 뜻임.

// 나는 cat1의 실체화 즉, this를 cat2로 바꾸고싶다고.