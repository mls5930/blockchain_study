const path = require("path");

module.exports = {
    entry: "./src/index.js", // 번들링을 시작할 파일
    output: {
        filename: 'bundle.js', // 생성될 번들 파일 명
        path: path.join(__dirname, 'dist') // 번들 파일 저장 경로
    }
}
// npx webpack