const person = {
    name: "조상아",
    age: 25,
    출근한다: function () {
        console.log("회사로 간다");
    },
    밥먹는다: function () {
        console.log("밥먹는다");
    },
    잔다 : function () {
        console.log("Zzz");
    },
    수업이재밌다 : function () {
        console.log("학생분들이 더 재밌어해요 ㅎㅎ");
    },
    첫_인사한다 : function () {
        console.log(`안녕하세요 제 이름은 ${this.name} 입니다 나이는 ${this.age} 입니다`);
    }
}

// person.잔다();
// person.출근한다();
// person.밥먹는다();
// person.수업이재밌다();
person.첫_인사한다();

// 일부를 제외한 대부분의 메서드는 객체의 값(위에서 봤을 때, age name)을 활용한다
// 메서드(행동) 내부에서 this 키워드를 사용하면 현재 객체에 접근할 수 있다.
// 메서드는 나의 객체 값을 변화하여 표현하려고 한다.