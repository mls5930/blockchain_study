// 내장되어 있는 new class(틀)은 뭐가 있을까?

const nowDate = new Date();

// console.log(nowDate.getMonth() + 1);
// console.log(nowDate.getDate());
// console.log(nowDate.getHours());
// console.log(nowDate.getMinutes());

console.log(`
    오늘 date는 
    ${nowDate.getFullYear()}년 
    ${nowDate.getMonth() + 1}월 
    ${nowDate.getDate()}일 
    ${nowDate.getHours()}시 
    ${nowDate.getMinutes()}분 
    입니다`
);

// 그렇다면, new Date()구조는 대략 어떻게 되어있을까?
class Date2 {
    // ES7
    year = 2024;
    month = 11;
    day = 31;
    hour = 12;
    minutes = 10;

    getFullYear() {
        return this.year;
    }
    getMonth() {
        return this.month;
    }
    getDate() {
        return this.day;
    }
    getHours() {
        return this.hour;
    }
    getMinutes() {
        return this.minutes;
    }
}

const nowDate2 = new Date2();

console.log(`
    오늘 date는 
    ${nowDate2.getFullYear()}년 
    ${nowDate2.getMonth() + 1}월 
    ${nowDate2.getDate()}일 
    ${nowDate2.getHours()}시 
    ${nowDate2.getMinutes()}분 
    입니다`
);

// getMonth() 메서드는 0부터 시작하는 월 인덱스를 반환
// [1,2,3,4,5,6,7,8,9,10,11,12]
// 그래서 + 1을 더하여 월을 표시
// 자바스크립트 설계 당시 다른 프로그래밍 언어(C언어 등등)의 날짜 처리 방식에서
// 영향을 받아서 만들어진 것.