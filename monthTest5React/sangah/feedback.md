# 1차 피드백

1. **프로젝트 구조/환경 구성 (10점)** 10점
2. **레이아웃 구현 (10점)** 10점
3. **카운트 상태 관리 (10점)** 4점
4. **이벤트 처리 (10점)** 10점
5. **데이터 흐름 & 이력(Log) (10점)** 0점
6. **새로고침 시 DB 연동 (10점)** 4점
7. **React 생명주기 (10점)** 4점 (카운터는 됨)
8. **이력(Log) 추가 기능 (10점)** 0점
9. **styled-components를 활용하여 요소를 꾸몄는가? (10점)** 0점 
10. **코드 가독성 (10점)** 6점

총 48점

## .env 파일 활용

```jsx
const { data } = await axios.get("http://localhost:3005/counter");
await axios.post("http://localhost:3005/counter", { newValue: newValue });
```

## 

```jsx
    setState({
        ...state, // 이 부분
        count: data.value.value,
        history: data.history.map((value) => ({
            createdAt: value.createdAt
        }))
    });
```

- 9번 꽁으로 챙겨 (+10점)
- 데이터 흐름 & 이력(Log) (+10점)

   - 버튼 클릭 기록이 오른쪽 박스에 표시되는지

68점

# 2차 피드백

1. **프로젝트 구조/환경 구성  10점**
   - CRA 또는 Webpack/Babel 환경 세팅, 서버 구동 등
2. **레이아웃 구현  10점**
   - 1000×600, `gap: 16px`, 왼쪽·오른쪽 박스 배치 등
3. **카운트 상태 관리  4점**
   - `state`/`props`(또는 전역 상태) 활용 적절성 (4점)
   - 추가사항: 전역 상태 활용(useContext + useReducer) (6점)
4. **이벤트 처리  10점**
   - `+`, `-` 클릭 시 카운트 증가·감소 로직 동작 여부
5. **데이터 흐름 & 이력(Log)  10점**
   - 버튼 클릭 기록이 오른쪽 박스에 표시되는지 
6. **새로고침 시 DB 연동  4점**
   - `GET /counter` → 초기값 불러오기, `POST /counter` → 저장
7. **React 생명주기  4점 (카운터는 됨)**
   - 훅 기능을 사용하여 초기 로드/변경 시점 로직 구현
8. **이력(Log) 추가 기능  0점**
   - (선택) 특정 시점으로 돌아가기 등 확장 기능 (5점)
   - (선택) 이력 초기화 (5점)
9. **styled-components를 활용하여 요소를 꾸몄는가? 5점**
   - 전체 Wrapper 테두리 색은 #9e9e9e (5점)
   - 오른쪽 로그의 텍스트들 font-size는 24px (5점)
10. **코드 가독성/문서화  6점**
   - 컴포넌트 파일, 함수, 변수명 등이 직관적이고 체계적인가

63점

## 문제

### 6. **새로고침 시 DB 연동  4점**

이젠...오른쪽 로그는 쌓이고 새로고침되도 되는데...  

**문제원인: 카운터가 새로고침되면 0으로 바뀜**

```jsx
useEffect(() => {
    try {
      const getCounter = async () => {
        const data = (await axios.get("http://localhost:3005/counter")).data; // 비동기로 실행

        data.response.map((item, index) => {
          console.log(item.createdAt);
        });
        setHistory([...history, ...data.response]);
        setState({ count: data.response[0].value }); // axios 실행되기 전 실행?되서 초기값 적용됨 "COUNT:0"
      };
      getCounter();
    } catch (error) {
      console.log(error);
    }
  }, []);
```

- DB에 저장은 잘됨

그러면 뿌려올 때 잘못되었겠지?

```js
setState({ count: data.response[0].value }); // axios 실행되기 전 실행?되서 초기값 적용됨 "COUNT:0"
```

학생의견: 원래 findOne해서 가지고 왔는데 이거는 findAll에서 가져온 함수에서 뽑아온거
=> order: [["id", "DESC"]]

아니 GET /counter에서 이미 뽑아있었네!!!!!!!!

```js
app.get("/counter", async (req, res) => {
  try {
    const result = await Counter.findOne({
      order: [["id", "DESC"]],
    });
    const response = await Counter.findAll();
    res.json({ response });
  } catch (error) {
    console.log(error);
  }
});
```

### data.response[0].value 이거 인지하고 있었냐?

학생의견: 아니오....

그럼 점수 못주지

### 9. **styled-components를 활용하여 요소를 꾸몄는가? 5점**

아니....1차 피드백에도 문제를 지적하고 꽁으로 챙기랬는데  
2차에도 못했네?  
심지어 내가 전체 `Wrapper`라고 했는데  
아주 그냥

- 여전히 9번 꽁으로 못챙기는.... (+10점)

   - 버튼 클릭 기록이 오른쪽 박스에 표시되는지

## 학생의견: 주말 숙제로 해올게요

내가 뭐가 되니....그러면
너무 이쁘다. ㅇㅋ

