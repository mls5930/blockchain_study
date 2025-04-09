// example.txt 파일을 읽어보자 이거야.
const fs = require("fs");

// 특정 파일내용 읽기
// utf-8은 파일의 인코딩 방식 => 읽은 데이터를 문자열로 반환
// 인코딩 지정하지 않으면 파일의 내용이 Buffer 객체로 반환
fs.readFile(__dirname + "/uploads/example.txt", "utf-8", (err, data) => {
    if(err) {
        console.log("파일 에러", err);
    } else {
        console.log("파일 내용", data);
    }
})

// fs.createWriteStream 메서드
// 데이터를 한 번에 모두 쓰지 않고, 
// 데이터를 스트림형태로 나눠서 씁니다.

const writeStream = fs.createWriteStream(`${__dirname}` + '/uploads/example.txt');

// 스트림에 데이터 작성
writeStream.write("오늘 좀 욕심 냈음 좋겠다 ㅎㅎ");
writeStream.write("불금엔........코딩인디......");

// 스트림 끝내기
writeStream.end();

writeStream.on('finish', () => {
    console.log("파일 쓰기 완료");
})

