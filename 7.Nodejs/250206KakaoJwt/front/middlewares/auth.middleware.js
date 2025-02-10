const jwt = require("jsonwebtoken");

const authMe = async (req, res, next) => {
    try {
        // 1. Authorization 헤더에서 토큰 가져오기
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            // 토큰이 없으면, 요청 객체에 user를 빈 객체로 설정하고 다음 미들웨어로 이동
            req.user = null;
            return next();
        }

        const token = authHeader.split(" ")[1]; // "Bearer 토큰값"

        // 2. 토큰 검증
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // 3. 사용자 정보 저장 (요청 객체에 user 추가)
        req.user = decoded;

    } catch (error) {
        console.error("JWT 검증 실패:", error.message);
        req.user = null; // 검증 실패 시 user를 null로 설정
    }

    // 4. 다음 미들웨어로 이동
    next();
};
// 요청에 인증 토큰을 첨부한다는 의미
const attachAuthToken = (req, res, next) => {
    try {
        const token = req.cookies?.access_token;
        
        if (!token) {
          console.warn('Access token is missing');
          return next();
        }
    
        req.headers.authorization = `Bearer ${token}`;
        next();
      } catch (error) {
        console.error('Error in authorization middleware:', error);
        next(error); 
      }
}

module.exports = {
    authMe,
    attachAuthToken
};
