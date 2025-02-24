## 회고

### 오늘 뭐가 어려웠어?

```js
handleClick = () => {}
// onClick = handleClick
onClick = (onClick) => {}

onClick(handleClick)
```

### 왜 handle이라고 이름 붙힘?

이벤트(event): 사용자가 특정 동작(클릭, 입력, 스크롤 등)을 수행하는 것
이벤트 핸들러(event handler): 특정 이벤트가 발생했을 때 실행되는 함수
"이벤트 핸들러 함수"라고 부르는 이유는 해당 함수가 이벤트를 "처리(Handle)"하는 역할을 하기 때문 

즉, 그냥 함수인데 이벤트를 `눌렀`을 때 실행(handle)하는 함수라고 이름 붙힌 것.  

###

```jsx
onClick={this.handleClick(i)}
onClick={() => this.handleClick(i)}

const a = () => {
    return "나는 A!";
}

const b = a;

console.log(b);  // b는 a 함수 자체를 참조 (출력: ƒ () => { return "나는 A!" })
console.log(b()); // b() 실행 → "나는 A!"

function handleClick(i) {
    console.log(`Clicked: ${i}`);
}

// 즉시 실행됨
button.onclick = handleClick(3);  // 잘못된 코드 (handleClick(3) 즉시 실행)

// 클릭 시 실행됨
button.onclick = () => handleClick(3);  // 버튼 클릭 시 실행
```

```mermaid
sequenceDiagram
    participant User
    participant Render
    participant componentDidMount
    participant setState
    participant componentDidUpdate
    participant setLoading
    participant setTimeout

    User ->> setLoading: [+,- 버튼 클릭]
    setLoading ->> setState: setState({ isLoading: true, action: increment/decrement })
    setState ->> Render: 상태 변경 감지 → render() 실행
    Render ->> User: "로딩 중..." 표시됨

    User ->> componentDidUpdate: componentDidUpdate 실행됨
    componentDidUpdate ->> setLoading: 아직 조건에 만족하지 않으니 아무 변화없이 setLoading으로 감.
    setLoading ->> setTimeout: [비동기] 1초 후 실행 예정
    setTimeout ->> setTimeout: [1초 간 시간 흐름....]
    setTimeout ->> setState: setState({ isLoading: false })

    setState ->> Render: 상태 변경 감지 → render() 실행
    Render ->> User: 변경된 value 값 적용 후 최종 화면 표시
    User ->> componentDidUpdate: 리렌더링 감지
    componentDidUpdate ->> setState: 현재 로딩 끝
    setState ->> Render: action값이 "increment" 면 값 + 아니면 -
    Render ->> User: 리렌더링
    User ->> componentDidUpdate: 리렌더링 감지
    componentDidUpdate ->> User: 조건에 만족하지 않으니 그냥 끝남.

```