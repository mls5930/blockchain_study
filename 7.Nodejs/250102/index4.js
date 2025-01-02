// 상속

// 날개, 깃털, 부리 => 새

class 새 {
    constructor () {
        this.날개 = 2;
        this.날수있나 = true;
        this.깃털 = 300;
        this.부리 = true;
    }
}
//            상속
class 비둘기 extends 새 {
    constructor() {
        // 부모 클래스인 새의 생성자를 호출하여 부모 클래스 속성을 상속받음.
        super();
    }
}
//            상속
class 닭둘기 extends 비둘기 {
    constructor() {
        // 부모 클래스인 비둘기의 생성자를 호출하여 부모 클래스 속성을 상속받음.
        super();
        this.깃털 = 100;
        this.날수있나 = false;
    }
}

const 비둘기1 = new 비둘기();
const 닭둘기1 = new 닭둘기();

console.log(닭둘기1.날수있나); // false
console.log(닭둘기1.깃털); // 100개

// 추상화, 본질, 분류