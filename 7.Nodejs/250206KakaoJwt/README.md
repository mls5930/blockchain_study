# **카카오 로그인 흐름 및 JWT 인증 프로세스**  

## 1. 전제 조건

- 두 개의 페이지가 존재

  - `카카오 로그인 페이지`: 사용자가 카카오 로그인을 시도하는 페이지  
  - `메인 페이지`: 로그인된 사용자만 접근 가능하며, JWT 토큰 검증을 통해 인증된 사용자 정보를 확인  

- JWT 토큰 검증 필요

  - 클라이언트에서 받은 JWT를 서버에서 검증하여 변조 여부 및 만료 여부 확인  
  - 검증이 성공하면 해당 사용자 정보를 `req.user`에 저장  
  - 검증 실패 시 `req.user = null` 할당 후 로그인 페이지 표시  

## 2. 전체 로그인 흐름

### (1) 클라이언트가 메인 페이지에 접근

1. 사용자가 `/`(메인 페이지)로 접속
2. `attachAuthToken` 미들웨어가 쿠키에서 `access_token`을 읽어 `Authorization` 헤더에 추가
3. `authMe` 미들웨어가 JWT 검증을 수행:
   - 유효한 경우: `req.user = decoded` 설정  
   - 유효하지 않은 경우: `req.user = null` 설정  
4. 서버는 `req.user` 정보를 활용하여 페이지를 렌더링  

### (2) JWT 검증을 위한 미들웨어

#### 1. 글로벌 미들웨어: attachAuthToken
   - `쿠키`에서 JWT를 가져와 `Authorization` 헤더에 추가  

```js
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
};
```

#### 2. JWT 검증 미들웨어: authMe

   - `Authorization` 헤더에서 토큰을 추출하고 검증  

```js
const authMe = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            req.user = null;
            return next();
        }

        const token = authHeader.split(" ")[1]; // "Bearer <토큰값>"

        // JWT 검증
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;

    } catch (error) {
        console.error("JWT 검증 실패:", error.message);
        req.user = null; // 검증 실패 시 user를 null로 설정
    }

    next();
};
```

### (3) 메인 페이지 응답 처리

1. `authMe` 미들웨어를 거친 후 `req.user` 정보를 기반으로 페이지 렌더링  
2. `userInfo`가 없으면 "카카오 로그인" 버튼 표시  

```js
router.get('/', authMiddleware.authMe, (req, res) => {
    res.render('index.html', {
        userInfo: req.user || {} // req.user가 없으면 빈 객체 반환
    });
});
```

**템플릿 (index.html):**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>메인 페이지</title>
</head>
<body>
    {% if userInfo and userInfo.nickname %}
    <ul>
        <li>이름: {{ userInfo.nickname }}</li>
    </ul>
    {% else %}
    <a href="/auth/kakao">카카오 로그인하기</a>
    {% endif %}
</body>
</html>
```

### (4) 사용자가 카카오 로그인을 진행

1. "카카오 로그인하기" 버튼 클릭 → `/auth/kakao` 요청 발생
2. 서버에서 카카오 로그인 페이지(`https://kauth.kakao.com/oauth/authorize`)로 리다이렉트  
3. 사용자가 로그인하면 `인가 코드(Authorization Code)`가 서버로 전달됨  

### (5) 카카오 인가 코드 처리 및 JWT 발급

1. 서버가 **인가 코드**를 받아서 `카카오 토큰 API`를 호출해 `액세스 토큰` 요청  
2. `카카오 액세스 토큰`을 이용해 사용자 정보 요청  
3. 받아온 사용자 정보를 **JWT로 변환하여 발급**  

```js
const jwt = require("jsonwebtoken");
const axios = require("axios");

const getKakaoToken = async (req, res) => {
    const { code } = req.query;

    try {
        // 1. 카카오 액세스 토큰 요청
        const tokenResponse = await axios.post("https://kauth.kakao.com/oauth/token", {
            grant_type: "authorization_code",
            client_id: process.env.KAKAO_CLIENT_ID,
            redirect_uri: process.env.KAKAO_REDIRECT_URI,
            code,
            client_secret: process.env.KAKAO_CLIENT_SECRET, // 선택 사항
        });

        const kakaoAccessToken = tokenResponse.data.access_token;

        // 2. 카카오 사용자 정보 가져오기
        const userResponse = await axios.get("https://kapi.kakao.com/v2/user/me", {
            headers: { Authorization: `Bearer ${kakaoAccessToken}` }
        });

        const userInfo = userResponse.data.kakao_account.profile;
        const nickname = userInfo.nickname;

        // 3. JWT 발급
        const jwtToken = jwt.sign({ nickname }, process.env.SECRET_KEY, { expiresIn: "1h" });

        // 4. 쿠키에 저장 후 메인 페이지로 리다이렉트
        res.cookie("access_token", jwtToken, { httpOnly: true, secure: true });
        res.redirect("/");

    } catch (error) {
        console.error("카카오 로그인 오류:", error);
        res.status(500).json({ error: "카카오 로그인 실패" });
    }
};
```

## 3. 최종 로그인 흐름 요약

### 1) 메인 페이지 진입 (`/`)

- `attachAuthToken` 미들웨어가 쿠키에서 JWT를 `Authorization` 헤더에 추가  
- `authMe` 미들웨어가 JWT를 검증하고 `req.user`에 사용자 정보 추가  

✅ **JWT 유효함 → 사용자 정보 표시**  
❌ **JWT 없음 또는 검증 실패 → 로그인 버튼 표시**  

### 2) 카카오 로그인 (`/auth/kakao`)

- 사용자가 "카카오 로그인하기" 버튼을 클릭하면 카카오 로그인 페이지로 이동  
- 로그인 후 `인가 코드`를 서버로 반환  

### 3) 카카오 인가 코드 처리 및 JWT 발급 (`/auth/kakao/callback`)

- `인가 코드`를 이용해 **카카오 액세스 토큰** 요청  
- 카카오 사용자 정보** 요청 후 JWT 
- JWT를 **쿠키에 저장**한 뒤, 메인 페이지로 이동  

### 4) 로그인 유지 및 JWT 검증

- 메인 페이지 접근 시, `attachAuthToken` → `authMe` 미들웨어에서 JWT 검증  
- JWT가 유효하면 사용자 정보 표시**, 만료되었거나 변조되면 로그인 버튼 

## 4줄 요약

- `attachAuthToken` → `authMe` → 메인 페이지 처리  
- JWT가 없거나 만료되면 로그인 페이지로 이동
- JWT가 유효하면 사용자 정보를 이용해 메인 페이지 렌더링
- 카카오 로그인 후 JWT를 발급 및 쿠키에 저장하여 유지