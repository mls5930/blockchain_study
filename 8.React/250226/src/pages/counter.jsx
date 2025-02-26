import React, { useState, useEffect } from "react";

// 함수형 컴포넌트 "상태"
// const [[상태], [상태변경을알려줄함수]] = useState();
export const Counter = () => {
    const [value, setValue] = useState(0)

    useEffect(() => {
        console.log("지금은 업데이트");    
    }, [value])

    return (
        <div>
            <h1>숫자 {value}</h1>
            <button onClick={() => setValue(value + 1)}>+</button>
        </div>
    )
}

/*
    클래스형 컴포넌트는 하나의 컴포넌트에 하나의 상태를 가진다.
    하지만, 함수형 컴포넌트는? 여러 개의 상태를 가질 "수" 있다.

    `use`State, `use`Effect

    앞으로 리액트를 할 때, `use`라는 단어를 많이 접할거임.
    이걸 리액트 Hook이라고 함.
    use 그리고 훅이라는 뜻은

    함수형 컴포넌트에서도 상태, 생명주기 등을 활용할 수 있게 해주는 기능
    즉, 이러한 Hooks로 함수형 컴포넌트에서도 "생명주기"를 가질 수 있다.

    useState => 상태 사용하겠다!
    즉, 이 Hook을 사용해서 특정 React 기능을 적용하겠다

    useEffect => 컴포넌트가 렌더링될 때 실행되는

    setA(a + 1)
    function = () => setA(a+1)

    export = {
        counter,
        counter2
    }
*/