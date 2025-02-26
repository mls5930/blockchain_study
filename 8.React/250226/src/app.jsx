// JSX가 포함된 파일은 React 모듈을 선언해야함
import React from "react";
import { Counter } from './pages/counter';
import { Dog } from './pages/dog';
import { HyesungComment } from './pages/comment';

// 함수형 컴포넌트
// render메서드를 명시하지 않아도 됨
// 컴포넌트 함수명 앞글자는 반드시 대문자!
// 일반적인 JSX에서는 반드시 하나의 부모 요소가 필요
const App = () => {
    return (
        // React.Fragment => <></> 불필요한 부모 태그 없이 여러 요소를 그룹화하는 방법
        <>
            {/* <Counter /> */}
            {/* <Dog /> */}
            <HyesungComment />
        </>
    )
}

export default App