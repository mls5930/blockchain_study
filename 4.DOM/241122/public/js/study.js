const studentGrade = {
    name: "주병현",
    grades: [85, 90, 88, 92, 78]
}

const average = () => {
    const { grades } = studentGrade;
    let sum = 0;
    for(let i = 0; i < grades.length; i++) {
        sum = sum + grades[i];
    }
    return sum / grades.length;
}

console.log("주병현의 평균 성적" , average());


// 심화
// 객체 안의 grades배열에 가장 큰 값을 뽑아서 console.log에 출력
// 성적 중에서 가장 좋은 성적을 뽑아서 그 값만 출력한다.
const getHighestGrade = () => {
    const { grades } = studentGrade;
    let highest = grades[0];
    for(let i = 1; i < grades.length; i++) {
        if(highest < grades[i]) {
            highest = grades[i];
        }
    }
    return highest
}

console.log("주병현의 제일 높은 성적" , getHighestGrade());

// 학생 생성하기


const studentName = prompt("생성할 학생 이름을 작성하세요");
const grade1 = Number(prompt("첫 번째 점수를 입력하세요"));
const grade2 = Number(prompt("두 번째 점수를 입력하세요"));
const grade3 = Number(prompt("세 번째 점수를 입력하세요"));
const grade4 = Number(prompt("네 번째 점수를 입력하세요"));
const grade5 = Number(prompt("다섯 번째 점수를 입력하세요"));

// 객체를 생성하는 함수를 여기에 선언합니다.
// 참고로 이번에는 조건문, 반복문 필요 없습니다.
// 총 입력한 값
const allInput = {
    studentName: studentName, 
    grade1: grade1, 
    grade2: grade2, 
    grade3: grade3, 
    grade4: grade4, 
    grade5: grade5
}
// 학생 생성 함수 선언
const createStudent = (allInput) => {
    const { studentName, grade1, grade2, grade3, grade4, grade5 } = allInput;
    // 속성
    const studentGrade = {
        name: studentName,
        grades: [grade1, grade2, grade3, grade4, grade5]
    }
    console.log(studentGrade);
}

createStudent(allInput);
// 여기서 입력값을 받는 변수를 선언합니다.
// 1. 입력값을 6개 받는다 => 이름, 점수1, 점수2, 점수3, 점수4, 점수5
// 2. 입력값을 받은 변수들을 위의 함수에 인자로 전부 넘겨줍니다. => 함수 호출 부분
// 3. 함수 선언 부분은 인자로 전달해준 변수들을 매개변수로 전부 받고,
// 학생 이름과 성적으로 이루어진 객체를 생성합니다.
// 4. 최종적으로 생성한 객체를 함수 내부에서 출력console.log()합니다.(이번엔 return 안사용함.)