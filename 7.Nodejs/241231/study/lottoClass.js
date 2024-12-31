class Lotto {
    constructor() {
        // 로또 번호를 저장할 배열
        this.numbers = [];
    }

    // 중복 여부를 검사하는 메서드
    isDuplicate(number) {
        return this.numbers.includes(number);
    }

    // 랜덤한 번호 생성 메서드
    generateRandomNumber() {
        return Math.floor(Math.random() * 45) + 1; // 1부터 45까지의 난수 생성
    }

    // 로또 번호를 생성하는 메서드
    createNumbers() {
        while (this.numbers.length < 6) {
            const randomNum = this.generateRandomNumber();

            // 중복되지 않으면 배열에 추가
            if (!this.isDuplicate(randomNum)) {
                this.numbers.push(randomNum);
            }
        }
    }

    // 로또 번호 출력 메서드
    displayNumbers() {
        console.log("생성된 로또 번호: ", this.numbers.sort((a, b) => a - b)); // 오름차순 정렬 출력
    }
}

// Lotto 클래스 사용
const lotto = new Lotto();
lotto.createNumbers(); // 로또 번호 생성
lotto.displayNumbers(); // 생성된 로또 번호 출력
