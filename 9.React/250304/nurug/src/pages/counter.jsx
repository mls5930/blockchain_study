import { useState, memo, useMemo, useCallback } from "react"

// const Child = () => {
//     console.log("나는 호출될까?");
//     return (
//         <div>진짜?</div>
//     )
    
// }
const Child = memo((props) => {
    console.log("나는 호출될까?");
    console.log(props.parentCount);
    
    return (
        <div>
            <button onClick={props.onClick}>진짜?</button>
        </div>
    )
    
})

export const Counter = () => {
    const [count,setConut] = useState(0);

    useMemo (() => {
        console.log("비싼 연산 실행 중");
        let number= 0;
        for(let i = 1; i <= 100000000; i++){
            number = number + i;
        }
        return number;
    
    },[]);
    // useEffect처럼 문법 작성하는 순서가 있음
    // 1. useMemo(,[])
    // 2. useMemo(()=>{},[])
    // useCallback은 불필요한 부모 컴포넌트가 리렌더링 될 떄, onClick 함수가 새로 만들어지는 것을 막음.

    const onClick = useCallback (() => {
        console.log("좀더 비싼 연산 실행 중");
        let number= 0;
        for(let i = 1; i <= 100000000; i++){
            number = number + i;
        }
        console.log(number);
        return number;
    
    },[]);
    
    return (
        <>
            {count}
            <button onClick={() => setConut(count +1)}>+</button>
            <button onClick={() => setConut(count -1)}>-</button>
            <Child parentCount={count} onClick={onClick}/>
        </>
    )
}