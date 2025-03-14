class Tiger {
   constructor(props) {
      this.name = props.name;
      this.growllll = props.growllll;
   }

   growl() {
      return this.growllll;
   }
}

class Cat extends Tiger{
   constructor(props) {
      super(props); 
      this.name = props.name;
      this.meowwww = props.meowwww;
   }

   meow() {
      return this.meowwww;     
   }
}
 
const cat1 = new Cat({name: "나비", meowwww: "미야야야야옹", growllll: "으르릉"})
console.log(cat1.meow());
console.log(cat1.growl());
