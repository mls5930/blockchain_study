// const str3 = "a, b";
// const str4 = str3.split(",");

const str5 = new String("a, b");
const str6 = str5.split(",");

/*
    위의 코드 실행 과정 설명

    1. **문자열 선언**:

   `const str5 = new String("a, b");`

   - 내부적으로 `str5`은 `String` 클래스의 인스턴스 객체로 간주됩니다.
    => str5로 실체화 시켰다.

    2. **`split` 메서드 호출**:

   - `split` 메서드는 `String.prototype`에 정의되어 있는 메서드입니다.
   - `str5.split('a', 'b')`는 `String.prototype.split` 메서드를 호출하여 
   문자열을 ',' 를 기준으로 나누는 작업을 수행합니다.

    3. **프로토타입 체인 동작**:

   - 자바스크립트는 `str5`에서 `split` 메서드를 찾으려고 시도합니다.
   - `str5` 자체에는 `split` 메서드가 정의되어 있지 않으므로, 
   프로토타입 체인을 따라 `String.prototype`에서 메서드를 찾습니다.

   이처럼 객체가 자신의 메서드와 속성을 상속받는 구조를 **프로토타입 체인**이라고 부릅니다.
*/

// String class는 어떻게 이루어져 있을까?
class String2 {
    constructor(value) {
        this.value = value;
    }

    split(value) {
        const result = [];
        let current = ""

        for(let char of this.value) {
            if(char === value) {
                result.push(current)
                current = "";
            }
            else {
                current += char;
            }
        }

        result.push(current); // 마지막 값 추가
        return result;
    }
}

const myStr = new String2("a, b, c");
console.log(myStr.split(",")); // ["a", "b", "c"]

/*
    문자열은 String 클래스의 인스턴스 객체라고 할 수 있다.

    문자열은 하나의 데이터(값)이지만, 내부에서는 이 데이터를 다룰 수 있도록 행동(메서드)가 함께 제공.
    String이라는 Class(설계도, 틀)에서 상속받은 것.

    프로토타입 체인은 유전자(DNA)와 비슷하다.

    String 객체는 String.prototype으로부터 메서드를 물려받아서 split, indexOf등의 기능을 사용 가능.
*/

