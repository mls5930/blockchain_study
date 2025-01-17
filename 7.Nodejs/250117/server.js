const express = require("express");
const app = express();
const multerUpload = require('./file.middleware');
const nunjucks = require('nunjucks');

app.set('view engine', "html");
nunjucks.configure('views', {
    express: app
})

app.use(express.static('uploads'));
app.use(express.urlencoded({ extended : true }));

app.get('/upload', (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
})

app.get('/view', (req, res) => {
    // 여기에서 업로드한 path를 queryString으로 받자.
    // 그리고 HTML에 뿌려주면 될 것 같은데?
    // npm install nunjucks
    const image = req.query.image;
    // uploads/파일이름
    res.render('view.html', {
        image
    })
})

app.post('/upload', multerUpload.single("file"), (req, res) => {
    try {
        const { filename } = req.file;
        res.redirect(`/view?image=${filename}`);
    } catch (error) {
        console.log(error);
        res.send('파일 업로드 실패 ㅠ');
    }
})

app.listen(3000, () => {
    console.log("sever start");
})

/*
    // 멀터는 미들웨어 라이브러리로서, 넘어온 파일을
    // 읽을 수 있는 데이터로 변환한 후, req.file에 다시 넣어줌.
    // 그래서 미들웨어라고 부르고 사용함.
    // req.headers["Content-Type"] === "multipart/form-data"

    single: 내부적으로 multer가 파일 업로드를 처리하는 방식에 대해서
    추상화된 메서드. 

    req.header 안에 Content-Type 살펴봄 
    multipart/form-data가 맞냐?
    name="file"인게 있냐?
    있으면 어떤 파일을 보냈느냐 확인.
    
    console.log(req.headers["content-type"]);
    // 파일 업로드하는건 알겠는데 데이터는?
    res.send("헤더 확인")

    let data = "";
    
    // 데이터 조각을 확인해보자 => 스트림
    // 작은 단위가 청크라고 한데, 그러면 데이터를 확인할 수 있을까?
    // 스트림 방식으로 데이터 읽기
    req.on("data", (chunk) => {
        data = data + chunk;
    })

    req.on("end", () => {
        console.log("전체 데이터", data);
        res.send("파일 데이터 확인 완료");
    })

    {
        fieldname: 'file',
        originalname: 'README.md', // 원래 파일 이름
        encoding: '7bit', // 파일의 인코딩 방식 => 7bit ASCII 인코딩 방식
        mimetype: 'application/octet-stream',
        destination: 'uploads/', // 저장할려는 디렉토리 경로
        filename: 'README.md', // 파일 이름
        path: 'uploads/README.md', // 해당 파일이 저장된 전체 경로
        size: 1801 // 파일의 텍스트 사이즈
        // image/png , image/jpg
    }
*/