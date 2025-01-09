const validateBoardData = (req, res, next) => {
    const reqBodyFields = ["user_id", "writer", "title", "content"];
    const sqlKeywords = ["INSERT", "DELETE", "UPDATE", "SELECT"];
    // for...of은 배열을 순회할 때 사용.
    // field에는 배열의 값이 담김.
    for (const reqBodyField of reqBodyFields) {
        if(req.body[reqBodyField] === "") {
            return res.status(400).send(`${reqBodyField}값이 비어 있습니다!`)
        }
        for (const sqlKeyField of sqlKeywords) {
            // 배열 메서드 some => 배열을 순회함. 배열 요소 중 하나라도 조건을 만족하는지 확인
            if(sqlKeywords.some(() => req.body[reqBodyField].includes(sqlKeyField))) {
                return res.status(400).send(`${reqBodyField}에 SQL 키워드가 포함되어 있습니다.`)
            }
        }
    }
    next();
}

module.exports = {
    validateBoardData
}