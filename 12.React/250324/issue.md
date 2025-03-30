```js
const {
  getKakaoToken,
  getKakaoUser,
  createUser,
  createJwtToken,
  saveRefreshToken,
} = require("../services/auth/auth.service");
require("dotenv").config();

const kakaoLogin = async (req, res) => {
  try {
    // front가 보내준 인가 코드 받고 검증
    const { code } = req.query;
    if (!code) return res.status(400).send("Auth code not provided");

    // Kakao_Token 받음
    const kakao_token = await getKakaoToken(code);
    console.log("kakao_token", kakao_token);

    if (!kakao_token)
      return res.status(401).send("유효하지 않은 KAKAO_Token입니다.");

    // KAKAO한테 사용자 정보 요청해서 받음 (KAKAO_Token 사용)
    const userInfo = await getKakaoUser(kakao_token);

    if (!userInfo) res.status(404).send("사용자 정보가 존재하지 않습니다.");

    // DB에 사용자 정보 저장 / 기존사용자 => DB UPDATE, 신규사용자=> DB CREATE
    const { id, properties } = userInfo;

    console.log(properties.profile_image);
    const user = await createUser(
      id,
      kakao_token,
      properties.nickname,
      properties.profile_image
    );

    // JWT_Token 생성 후 저장
    const jwt_token = createJwtToken(user);

    // Refresh_Token 생성
    const refresh_token = await saveRefreshToken(id);
    console.log(jwt_token);

    //  쿠키에 JWT_Token 넣어서 redirect
    res.setHeader(
      "Set-Cookie",
      `access_token=${jwt_token}; SameSite=None; Path=/; `
    );
    res.header(
      "Access-Control-Allow-Origin",
      `http://${process.env.CLIENT_IP}`
    );
    res.header("Access-Control-Allow-Credentials", "true");

    return res.redirect(`http://${process.env.CLIENT_IP}`);
  } catch (error) {
    console.log(error);
  }
};

const kakaoLogout = async (req, res) => {
  try {
    // front가 보내준 로그아웃 할 사용자 nickname 받고 검증
    const { id } = req.query;
    if (!id) return res.status(401).send("유효하지 않은 id입니다.");

    // 성공 => front에 logout 응답 후 JWT_Token(Cookie) 삭제
    res.setHeader(
      "Set-Cookie",
      `access_token=; Max-Age=0 Domain=localhost; Path=/;`
    );

    return res.redirect(`http://${process.env.CLIENT_IP}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { kakaoLogin, kakaoLogout };
```
