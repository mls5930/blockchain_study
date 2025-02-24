
## 회고

### 오늘 뭐가 어려웠어?

혜성  

- 구조가 헷갈림

부모가 계속 아래에 있어서 헷갈림.  
근데 보충 수업으로 어느 정도 이해가 감.

- props이랑 onClick

onClick이벤트가 헷갈림 함수의 onClick이벤트

```jsx
<button onClick={this.props.onClick}></button>
```

약간....문법이 익숙하지 않아서
위의 onClick은 그냥 HTML 문법일 뿐인데....자바스크립트 문법
즉 => onClick = this.props.onClick
이거랑 헷갈렸다?

### JSX에서의 onClick은 HTML의 이벤트 속성이 아님. 리액트의 이벤트 객체를 기반으로 동작하는 속성

```js
const button = document.createElement("button");
button.textContent = "Click Me";
button.onclick = this.props.onClick; // 함수 할당 (실행 X)
document.body.appendChild(button);
```

✔️ 즉, onClick={this.props.onClick}은 button.onclick = this.props.onClick과 같은 역할을 함.
✔️ 중요한 점은 실행(())이 아니라, 함수 참조를 넘긴다는 것!


```jsx
onClick = () => {

}

() => {

}
<button onClick={onClick(i)}></button>
<button onClick={() => onClick(i)}></button>

const a = () => {
    return "나는 A!";
}

const b = a;

console.log(b);  // b는 a 함수 자체를 참조 (출력: ƒ () => { return "나는 A!" })
console.log(b()); // b() 실행 → "나는 A!"
```

onClick={onClick(i)}
=> onClick(i)가 즉시 실행됨 (❌ 잘못된 사용법)
=> 버튼이 렌더링 될 때 실행
=> 결과적으로 버튼을 클릭하기도 전에 onClick(i)가 실행되어버림.

onClick={() => onClick(i)}
=> 클릭할 때만 onClick(i)가 실행됨 (✅ 올바른 사용법)
=> 얘는 onClick에 함수 이벤트 등록 => 누를 때 이벤트 발동 즉, 함수 실행

## 주말 과제

### 최초 실행

```mermaid
sequenceDiagram
    participant User
    participant Constructor
    participant Render
    participant ComponentDidMount
    participant SetState
    participant ReRender
    participant ComponentDidUpdate

    User ->> Constructor: 생성자 실행
    Constructor ->> Render: 초기 렌더링 실행
    Render ->> User: (value: 0, isLoading: false, action: null) 화면 표시

    User ->> ComponentDidMount: componentDidMount 실행
    ComponentDidMount ->> SetState: this.setState({ value: 10 })
    
    SetState ->> ReRender: 상태 변경 감지 → 리렌더링 발생
    ReRender ->> User: (value: 10, isLoading: false, action: null) 화면 업데이트

    User ->> ComponentDidUpdate: componentDidUpdate 실행
    ComponentDidUpdate ->> User: 조건 확인 후 UI 유지
```

### 증감 버튼 눌렀을 때
```mermaid
sequenceDiagram
    participant Browser
    participant Render
    participant componentDidMount
    participant componentDidUpdate
    participant setTimeout

    Browser ->> Render: onClick(increment) → this.setState({ isLoading: true, action })
    Render ->> Browser: 로딩 중 화면 표시

    Browser ->> componentDidUpdate: setState로 인해 componentDidUpdate 실행
    componentDidUpdate ->> setTimeout: 1초 후 isLoading: false & value 증가

    setTimeout ->> Render: 1초 후 this.setState({ isLoading: false, value: value + 1 })
    Render ->> Browser: 새로운 값 (value: 1, isLoading: false) 렌더링

    Browser ->> componentDidUpdate: setState로 인해 componentDidUpdate 실행
    componentDidUpdate ->> Render: UI 업데이트 완료
    Render ->> Browser: UI 업데이트 완료
```

### 이후

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