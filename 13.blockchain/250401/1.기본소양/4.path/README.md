# path

`fs`를 잘 다루려면 반드시 `path`를 **먼저** 이해해야 해요.  
왜냐하면, **파일을 다룬다는 건 곧 경로(Path)를 다룬다는 뜻**이기 때문이에요.

## path 모듈을 “자연스럽게” 이해하는 시각

---

### 1. **운영체제(OS)별 경로 처리 차이를 감싸는 "표준화 인터페이스"**

> `path`는 **운영체제마다 다른 경로 처리 방식을 안전하게 통일**시켜주는 도구

| OS             | 경로 구분자 | 예시                   |
| -------------- | ----------- | ---------------------- |
| Windows        | `\`         | `C:\Users\Me\file.txt` |
| Unix/Linux/Mac | `/`         | `/home/me/file.txt`    |

개발할 때는 이 차이를 일일이 신경 쓰기 어렵죠. 그래서 `path`가 등장해요:

```js
const path = require("path");
const fullPath = path.join("folder", "sub", "file.txt");
// Windows: folder\sub\file.txt
// Mac/Linux: folder/sub/file.txt
```

시선: **"path는 OS 간 호환성의 안전벨트다."**

---

### 2. **“경로 조작 도구”로 보기: 문자열 연산이 아닌, 구조화된 계산**

> `path`는 단순 문자열 연결이 아님 → **논리적으로 "경로 위치"를 계산해주는 도구**

- `path.join()` → 논리적으로 경로를 결합
- `path.resolve()` → 절대 경로 계산
- `path.dirname()`, `path.basename()` → 경로 분해
- `path.extname()` → 확장자만 추출

📌 파일 경로 = "주소"라고 보면, `path`는 "주소 조작기계"인 셈

---

### 3. **“보안과 안전”의 관점으로 보기: 사용자 입력 경로 막기**

> 실무에서 path는 **보안과 안전**을 위해 필수

```js
const userInput = "../../../etc/passwd";
const safePath = path.join(__dirname, userInput);
// 예상한 폴더 밖으로 빠져나가버릴 수 있음
```

`path.normalize()`로 경로를 정리하고  
`path.resolve()`로 현재 기준 절대경로로 고정시키면 위험 감소

---

### 4. **“프로젝트 구조 이해 도우미”로 보기**

> `path`는 **폴더 구조가 복잡할수록 필수**

예:

- 템플릿 파일 경로를 다룰 때
- public 디렉토리에서 파일 serve할 때
- 환경 설정 파일 불러올 때

📌 이럴 땐 `__dirname`, `__filename`, `path.resolve()`의 조합이 핵심

```js
const templatePath = path.resolve(__dirname, "views", "index.html");
```

---

## 결론: path 모듈을 자연스럽게 다루기 위한 시선 4가지

| 시선                | 설명                                      |
| ------------------- | ----------------------------------------- |
| 🧱 OS 추상화 시선   | 경로 구분자를 자동으로 맞춰주는 안전 장치 |
| 🧠 구조적 계산 도구 | 단순 문자열 연산이 아닌, 경로 계산기      |
| 🔒 보안 보호 장치   | 사용자 입력 경로 막고, 경로 조작 방지     |
| 📦 프로젝트 관리자  | 복잡한 폴더 구조를 다룰 때의 핵심 도구    |

---

## 💡 실용 정리: fs를 잘 쓰고 싶다면 먼저 path부터 이해하라

`fs`는 "파일을 조작하는 손",  
`path`는 "파일이 어디 있는지를 계산하는 눈"이에요.
