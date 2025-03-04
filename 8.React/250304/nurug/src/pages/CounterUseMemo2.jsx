import { memo, useMemo, useCallback, useState } from "react"

const Child = memo((props) => {
    console.log("나는 Child! 호출될까?");
    console.log(props.parentCount);
    
    return (
        <>
            {props.parentCount}
            <button>진짜?</button>
        </>
        
    )
})

export const CounterUseMemo2 = () => {
    const [count, setCount] = useState(0);

    const number = useMemo(() => {
        console.log("나는 비싼 연산");
        let number = 0;
        for(let i = 1; i <= 10000000; i++) {
            number = number + i;
        }
        // 500000000067109000
        console.log(number);
        return number + count;
    }, [])
    // 500000000067109001
    console.log(number);
    
    return (
        <>
            {count}
            <button onClick={() => setCount(count + 1)}>+</button>
            <Child parentCount={count} />
        </>
    )
}

    // useEffect처럼 문법 작성하는 순서가 있음
    // 1. useMemo(, [])
    // 2. useMemo(() => {}, [])

    // useCallback은 불필요한 함수의 재생성을 방지 
    // 부모 컴포넌트가 리렌더링 될 때, onClick함수가 새로 만들어지는 것을 막음
