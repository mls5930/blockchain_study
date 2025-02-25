## 회고

### 오늘 뭐가 어려웠어?

- state, props에서 왜 props로 내려줘야 하지?

상태가 자식에 존재한다면, 부모는 자식의 상태를 모르니까.  
최대한, 상태를 부모에게 올려줘야 함.

```jsx
// 함수의 실행을 던진 것 => 클릭되었을 때 실행이 아닌, 렌더링 되었을 때 바로 실행됨
<Square onClick={this.handleClick(i)}/>
// 함수 값 자체를 던진 것 => 클릭되었을 때 실행이 됨.
<Square onClick={() => this.handleClick(i)}/>

// 차이점
```

리액트를 잘한다 => 내가 얘기해준 것들도 인지하는 것 좋아!
=> 리액트는 결국 javascript야!
=> 자바스크립트 기본기가 탄탄해야 잘해

```mermaid
sequenceDiagram
    participant browser
    participant Render
    participant componentDidMount
    participant setState
    participant componentDidUpdate
    participant setLoading
    participant setTimeout

    browser ->> setLoading: [+,- 버튼 클릭]
    setLoading ->> setState: setState({ isLoading: true, action: increment/decrement })
    setState ->> Render: 상태 변경 감지 → render() 실행
    Render ->> browser: "로딩 중..." 표시됨

    browser ->> componentDidUpdate: componentDidUpdate 실행됨
    componentDidUpdate ->> setLoading: 아직 조건에 만족하지 않으니 아무 변화없이 setLoading으로 감.
    setLoading ->> setTimeout: [비동기] 1초 후 실행 예정
    setTimeout ->> setTimeout: [1초 간 시간 흐름....]
    setTimeout ->> setState: setState({ isLoading: false })

    setState ->> Render: 상태 변경 감지 → render() 실행
    Render ->> browser: "로딩 중..." 화면 끝 숫자와 버튼들 보임.
     browser ->> componentDidUpdate: 리렌더링 감지
    componentDidUpdate ->> setState: 조건문 (로딩이 끝났는지) => 끝났으면 + 1 또는 -1
    setState ->> Render: 상태 변경 감지 리렌더링
    Render ->> browser: + 값 또는 -값에 대한 화면 표현
    browser ->> componentDidUpdate: 리렌더링 감지해서 update 메서드 호출
    componentDidUpdate ->> browser: 조건에 만족하지 않으니 그냥 끝남.
```