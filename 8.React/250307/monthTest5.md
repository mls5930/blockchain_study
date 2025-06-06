# 5차 월별 평가

**카운터 구현**

## 1. 평가 일정

- **진행:** 2025년 03월 07일 (하루 종일)
- **제출 마감:** 2025년 03월 07일 (퇴실 전까지)

## 2. 작업 지시 내용

1. **레이아웃**

   - 전체 컨테이너: 가로 1000px, 세로 600px, 가운데 정렬
   - 내부 레이아웃: 왼쪽 박스(카운터) + 오른쪽 박스(이력), 가로 배치, `gap: 16px`

2. **카운터 (왼쪽 박스)**

   - 현재 카운트 값 표시
   - `+`, `-` 버튼을 클릭할 때마다 값 증가·감소
   - 변경된 값이 즉시 화면에 반영

3. **이력(오른쪽 박스)**

   - 왼쪽 박스에서 버튼을 누른 시각(예: `HH:MM:SS`)과 동작(`+`, `-`)을 리스트로 표시

4. **백엔드 연동**

   - **DB에 카운트 값 저장** 후, 페이지 로드 시 **DB에서 불러오기**
   - (예) `POST /counter`, `GET /counter`

5. **상태 관리**

   - React **상위 컨테이너**에서 `useState` 또는 `useContext + useReducer` 등 전역 상태 사용
   - 새로고침 후에도 DB 데이터와 동기화해 **상태가 유지**되도록 처리
   - 왼쪽 박스에서 카운트 변경 → 오른쪽 박스에 로그 반영

## 3. 평가 항목 (총 100점)

1. **프로젝트 구조/환경 구성 (10점)**

   - CRA 또는 Webpack/Babel 환경 세팅, 서버 구동 등

2. **레이아웃 구현 (10점)**

   - 1000×600, `gap: 16px`, 왼쪽·오른쪽 박스 배치 등

3. **카운트 상태 관리 (10점)**

   - `state`/`props` 활용 적절성 (4점)
   - 추가사항: 전역 상태 활용(useContext + useReducer) (6점)

4. **이벤트 처리 (10점)**

   - `+`, `-` 클릭 시 카운트 증가·감소 로직 동작 여부

5. **데이터 흐름 & 이력(Log) (10점)**

   - 버튼 클릭 기록이 오른쪽 박스에 표시되는지 

6. **새로고침 시 DB 연동 (10점)**

   - `GET /counter` → 초기값 불러오기
   - `POST /counter` → 저장

7. **React 생명주기 (10점)**

   - 훅 기능을 사용하여 초기 로드/변경 시점 로직 구현

8. **이력(Log) 추가 기능 (10점)**

   - 추가사항: 특정 시점으로 돌아가기 등 확장 기능 (4점)
   - 추가사항: 이력 초기화 (6점)
   - 이력 초기화 버튼은 `+`, `-` 버튼과 나란히 배치.

9. **styled-components를 활용하여 요소를 꾸몄는가? (10점)**

   - 전체 Wrapper 테두리 색은 #9e9e9e (4점)
   - 오른쪽 로그의 텍스트들 font-size는 24px (6점)

10. **코드 가독성 (10점)**

   - 폴더 디렉토리 구조가 나뉘어지고 설명할 수 있는가? (6점)
   - 함수, 변수명 등이 직관적이고 체계적인가? (4점)
   
## 4. 제출 방법

1. **프로젝트 구조**

   - 프론트엔드(React)와 백엔드(Node.js + Express)
   - `client/`, `server/` 폴더로 분리.

2. **온라인 저장소(권장)**

   - GitHub 레포지토리 URL 제출.

3. **실행/구동**

   - **에러 없이** 빌드·실행되어야 함.
   - 추가 라이브러리 사용 시 `package.json` 반영.

## 추가 안내

- **전역 상태**(`useContext + useReducer`) 예시:
  ```js
  // 예시
  const { state, dispatch } = useContext(GlobalContext);
  dispatch({ type: 'INCREMENT' });
  ```
- **상태 끌어올리기**만 쓸 경우, 상위 컴포넌트의 `count`와 `setCount`를 자식에 props로 내려서 이벤트 처리
- 서버 통신은 `Axios` 사용
- `useEffect`로 **마운트 시점**(초기 DB 값)과 **카운트 변경 시점**(DB 저장) 로직 구현

## 못하면 어떻게 해요?

걱정마세요.  
다음 주 수업이 끝난 후 재시험을 치르겠습니다.