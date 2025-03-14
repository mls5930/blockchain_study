class Cat {
   constructor(props) {
    this.name = props.name;
    this.meowwww = props.meowwww
   } 
   meow () {
      return this.meowwww + this.name
   }
}

let cat1 = new Cat({name: "나비", meowwww: "미야아아아옹"});
const cat2 = new Cat({name: "고앵이", meowwww: "월월"});
// const cat3 = cat1.meow.bind(cat2);
cat1.meow = cat1.meow.bind(cat2);
console.log(cat1.meow());



// 추상적인 존재를 누가 실체화 시켰느냐?에 따라서 this는 달라진다.
// 즉, 호출 또는 실행되었을 때!!!! this가 결정된다가 이 뜻임.

// 나는 cat1의 실체화 즉, this를 cat2로 바꾸고싶다고.