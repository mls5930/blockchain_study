# 2차 피드백

## return을 왜 작성하셨을까요?

```js
    useEffect(() => {
        if(state.count != null) {
            return setstate({
                ...state, 
                time: state.time ? [...state.time, "업로드"] : ["업로드"]
            });
        }else {
            return setstate({
                count:null,
                time:null
            })
        }
       
    },[state.count])
```

## 문제 분석: `return`을 왜 작성했을까?

```js
useEffect(() => {
    if(state.count != null) {
        return setState({
            ...state, 
            time: state.time ? [...state.time, "업로드"] : ["업로드"]
        });
    } else {
        return setState({
            count: null,
            time: null
        });
    }
}, [state.count]);
```

리액트 생명주기(`useEffect`)와 상태 업데이트(`setState`) 개념 부족

### **혜성 학생의 문제점 요약**  

#### **문제 원인**  

1. **`useEffect`의 `return`을 잘못 사용**  

   - 여기서는 불필요한 `return`이므로 잘못된 사용.  

2. **`setState`를 반환값처럼 사용**  

   - `setState`는 단순 상태 변경 함수이며 `return`이 필요 없음.  
   - 함수 호출과 리액트 상태 업데이트를 혼동한 오류.  

#### **혜성 학생이 보완해야 할 개념**

✅ `useEffect`의 return은 **cleanup 용도**  
✅ `setState`는 **return하지 않음**  
✅ 리액트 상태 변경 & 렌더링 흐름 이해  
 
## useContext를 잘못 작성했다는 느낌

```jsx

import React, {useState,useEffect,useContext,createContext} from "react";
import styled from "styled-components";
import axios from "axios"
const StyledBox = styled.div`
    padding: 20px 0 ;
    margin: 20px auto;
    max-width: 1000px;
    max-height: 600px;
    background-color: #9e9e9e;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    
`
const Databox = createContext(null)

export const CounteProvider = ({children}) => {

    const [state,setstate] = useState(
        {
            count:0,
            time:null
        }
    )

    useEffect(() => {
        if(state.count != null) {
            return setstate({
                ...state, 
                time: state.time ? [...state.time, "업로드"] : ["업로드"]
            });
        }else {
            return setstate({
                count:null,
                time:null
            })
        }
       
    },[state.count])

    return(
        <StyledBox>
            <Databox.Provider value={{state , setstate}} >
                {children}
            </Databox.Provider>
        </StyledBox>
    )
}
export const useCounter = () => useContext(Databox)
export default CounteProvider
```

useContext를 사용할 필요가 없음  

상태(state)를 useState로 관리하고 있음.
하지만 useContext는 다른 컴포넌트에서 공유할 필요가 있을 때 사용하는 것.
=> 그런데 StyledBox 내부에서만 state를 사용하므로, 굳이 useContext를 쓸 이유가 없음.

결론: useContext를 제거하던가, useState만 사용하던가.

## 스타일드 컴포넌트의 위치가 일관되지 않음

```jsx
import React, {useState,useEffect,useContext,createContext} from "react";
import styled from "styled-components";
import axios from "axios"
const StyledBox = styled.div`
    padding: 20px 0 ;
    margin: 20px auto;
    max-width: 1000px;
    max-height: 600px;
    background-color: #9e9e9e;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    
`
const Databox = createContext(null)

export const CounteProvider = ({children}) => {

    const [state,setstate] = useState(
        {
            count:0,
            time:null
        }
    )

    useEffect(() => {
        if(state.count != null) {
            return setstate({
                ...state, 
                time: state.time ? [...state.time, "업로드"] : ["업로드"]
            });
        }else {
            return setstate({
                count:null,
                time:null
            })
        }
       
    },[state.count])

    return(
        <StyledBox>
            <Databox.Provider value={{state , setstate}} >
                {children}
            </Databox.Provider>
        </StyledBox>
    )
}
export const useCounter = () => useContext(Databox)
export default CounteProvider
```

- components 폴더에서 스타일드 컴포넌트를 따로 관리하고 있음.
- 그런데 App.jsx(또는 CounteProvider) 내부에서도 styled-components를 직접 작성함.
=> 컴포넌트 분리가 제대로 되지 않았고, 유지보수가 어려운 구조가 됨.

## 구조가 아주....난리가 났습니다.

### App.jsx

```jsx
import './App.css';
import CounteProvider from './store/CountProvider'
import Counter from './pages/counter'
import Countertext from './pages/countText'
import Time from "./pages/Time"
function App() {
  return (
    <CounteProvider>
      <Countertext>
          <Counter/>
          <Time/>
      </Countertext>
    </CounteProvider>
  );
}

export default App;
```

### pages/countText.jsx

```jsx
import React, { Children } from "react";
import { useCounter } from "../store/CountProvider";
import AppBox from "../component/AppBox.jsx"
 const Countertext = (props) => {
    const {state,setstate} =useCounter()

    return(
        <div>
            <div>count{state.count}</div>
            <AppBox>  
                {props.children}
            </AppBox>
        </div>
    )
}
export default Countertext
```

### pages/Time.jsx

```jsx
import React from "react";
import { useCounter } from "../store/CountProvider";
import ContentBox from "../component/ContentBox"
 const Time = () => {
    const {state,setstate} =useCounter()
    console.log(state);
    const stateTime = () =>{
        
    }

    return(
        <ContentBox>
            <div>
                <p>{state.time}</p>
            </div>
        </ContentBox>
    )
}
export default Time
```

## 현재 코드 구조가 너무 일관성이 없고, 상태 관리 방식이 뒤섞여있음

### 주요 문제점

1. pages/countText.jsx에서는 props.children을 사용해 상태를 내려받음.
2. pages/Time.jsx에서는 전역 상태(useContext)를 직접 가져와 사용함.
3. 컴포넌트 간 상태 전달 방식이 일관되지 않음.
    - Countertext에서는 props 기반 상태 관리.
    - Time에서는 useContext 기반 상태 관리.
    - 통일성이 전혀 없음.

### 해결책

1. 전역 상태(useContext)를 사용할 거면, 모든 곳에서 useContext를 일관되게 사용해야 함.

    - countText.jsx에서 props.children 방식 제거.
    - 모든 상태를 useCounter()에서 가져오도록 수정.

2. App.jsx에서 Countertext를 감싸는 구조가 불필요하므로 제거.

    - Countertext, Counter, Time을 CounteProvider 내부에서 동등한 레벨로 배치.

3. 컴포넌트의 역할을 명확하게 분리.

    - Countertext.jsx → count 상태 표시
    - Time.jsx → time 상태 표시

## 결론적으로 기능이 안됌