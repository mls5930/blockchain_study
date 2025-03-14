### **📌 `npm`이 아니라 `npx`를 사용하는 이유는?**

#### ✅ **1. `npx`는 패키지를 글로벌 설치 없이 실행할 수 있도록 해준다.**

```sh
npx babel example.js --out-file dist/example.js
```

- `npx`를 사용하면 **해당 프로젝트의 `node_modules/.bin`에 있는 패키지를 직접 실행할 수 있음.**
- 즉, `babel`을 **글로벌 설치(`npm install -g @babel/cli`)하지 않아도** 바로 실행 가능.

---

## **📜 1️⃣ `npm`과 `npx`의 차이점**

### **✅ `npm` (Node Package Manager)**

- 패키지를 **설치하는 도구.**
- `npm install` 명령어를 사용하여 프로젝트 또는 전역(Global)에 패키지를 설치함.

### **✅ `npx` (Node Package Executor)**

- 설치된 패키지를 **실행하는 도구.**
- 패키지를 설치하지 않아도 일회성 실행이 가능.

✅ **즉, `npx`는 특정 패키지를 실행할 때, 로컬(`node_modules/.bin`)이나 글로벌 패키지를 찾고 실행하는 역할을 함.**

---

## **📜 2️⃣ `npm`과 `npx`의 실행 방식 차이**

### **🚀 `npm`을 사용한 Babel 실행 (글로벌 설치 필요)**

```sh
npm install -g @babel/cli
babel example.js --out-file dist/example.js
```

- **`@babel/cli`를 글로벌 설치해야만 실행 가능.**
- 만약 프로젝트에서 Babel 버전을 바꾸고 싶다면 **글로벌 패키지를 업데이트해야 하는 불편함 발생.**

---

### **🚀 `npx`를 사용한 Babel 실행 (글로벌 설치 불필요)**

```sh
npx babel example.js --out-file dist/example.js
```

- **로컬에 설치된 `@babel/cli`를 찾아 실행.**
- `node_modules/.bin/babel`을 실행하기 때문에 **글로벌 설치가 필요 없음.**

✅ **즉, `npx`를 사용하면 Babel을 글로벌로 설치할 필요 없이 실행할 수 있어 더 편리함!**

---

## **📜 3️⃣ 왜 `npx`가 Babel 실행에 적합할까?**

1. **전역(Global) 설치 필요 없음 → 프로젝트마다 다른 Babel 버전을 사용할 수 있음.**
2. **로컬 패키지를 우선 실행** → 프로젝트의 `node_modules/.bin`에서 실행.
3. **일회성 실행 가능** → 설치 없이도 최신 버전의 Babel을 실행할 수 있음.

---

## **🎯 결론**

✅ **`npm`은 패키지를 설치하는 도구, `npx`는 패키지를 실행하는 도구.**  
✅ **`npx`를 사용하면 Babel을 글로벌 설치하지 않고도 실행할 수 있어 더 효율적임.**  
✅ **Babel과 같은 개발 도구는 프로젝트별로 버전이 다를 수 있기 때문에, `npx`를 사용하면 각 프로젝트의 Babel 버전을 유지하면서 실행할 수 있음.** 🚀
