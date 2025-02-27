# 과제 풀이

## youjungMain.jsx

```jsx
import React, {useState} from "react";
// import "./main.css"
import StyledButton from "../components/youjungBtn";

const Main = () => {
    const [color, setColor] = useState("")

    const habndleChange = (e) => {
        console.log(color);
        
        // color === "red" ? setColor("blue"): setColor("red")
        if(color === "red") {
            setColor("blue")
        } else{
            setColor("red")
        }
        
    }

    return (
        <>
            <p className="css-main">나는 기존 css로 작성한 빨간색 글자</p>
            <StyledButton color={color} onClick={habndleChange}>
                i'm styledButton component
            </StyledButton>
        </>
    )
}

export default Main
```

## 문제

1. 버튼을 누르면, 글자의 색이 바뀌어라.(글자 색은 어떤 색이 되어도 상관 X)

## props

```jsx
    <>
        <p className="css-main">나는 기존 css로 작성한 빨간색 글자</p>
        <StyledButton color={color} onClick={habndleChange}>
            i'm styledButton component
        </StyledButton>
    </>
```

## 현 상황

버튼을 누르면 버튼 배경색이 바뀜  
글자 색이 바뀌어야 하는데 말이죠?  

## 필요한 것을 리스트 해보자

1. props가 필요한 주체는 누구야?

p태그죠.
그럼 p태그를 props로 받을 수 있는 컴포넌트로 만드는 건?

```jsx
// 이 아이는 p태그
<StyledText color={color}>나는 기존 css로 작성한 빨간색 글자</StyledText>
```

## 그럼 해당 컴포넌트를 어떤 디렉토리에 만들어야 할까?

- pages: 해당 페이지에 전체적인 컴포넌트구요
- components: 각각 독립적인 UI 조각 => 버튼, 인풋, 텍스트

naver.com로 예를 들면  
옥션, 경제, 시사....등등

## src/components/Text.jsx

편의상 `YoujungText.jsx` 라고 하겠음!

## src/components/YoujungText.jsx
