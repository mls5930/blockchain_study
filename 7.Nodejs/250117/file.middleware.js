/*
    1. 설치한 multer 모듈 불러옴.
    2. 경로 설정 함수 만듦.
    3. 파일 이름 설정 함수 만듦.
    4. 인스턴스 객체를 만들고 모듈로 내보냄
*/

const multer = require('multer');

// 경로 설정 함수
const destination = (req, file, callback) => {
    // uploads라는 폴더안에 다 저장하겠다.
    // callback: 결과를 반환하는 콜백 함수, 두 개의 인자를 넘겨줌
    // 첫 번째 => 오류 표현함, 두 번째 => 저장할 경로 설정
    // 즉, 이 콜백은 파일이 잘 넘어왔다 => 성공했을 때 콜백 함수가 호출될거임.
    
    // 파일이 이미지일 경우
    if(file.mimetype.startsWith("image")){
        // ㅇㅋ uploads/안에 넣을게
        callback(null, 'uploads/')  
    } else {
        callback(new Error("이미지 파일이 아닙니다."));
    }
}

// 파일 이름 설정 함수
const filename = (req, file, callback) => {
    // 첫 번째 => 오류 표현함, 두 번째 => 저장할 파일 이름 설정
    // 즉, 이 콜백은 파일이 잘 넘어왔다 => 성공했을 때 콜백 함수가 호출될거임.
    callback(null, file.originalname);
}

// diskStorage: 파일을 저장하기 위한 설정을 정의하는 메서드
const storage = multer.diskStorage({destination, filename})
const upload = multer({storage})

module.exports = upload;

    // if("만약에 그냥 이러한 오류가 걸림") {
    //     // 오류가 났으니, 이러한 오류를 보낼게
    //     callback(new Error("파일 저장 오류"), null)
    // } else {
    //     // 오류가 안나고 정상적인 상황이니 첫 번째 인자는 null일게
    //     callback(null, 'uploads/')
    // }