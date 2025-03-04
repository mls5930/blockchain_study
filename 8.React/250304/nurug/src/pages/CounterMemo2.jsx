import { memo, useMemo, useCallback, useState } from "react"

const Child = memo((props) => {
    console.log("나는 Child! 호출될까?");
    
    return (
        <button>진짜?</button>
    )
});

export const Counter = () => {
    const [count, setCount] = useState(0);

    return (
        <>
            {count}
            <button onClick={() => setCount(count + 1)}>+</button>
            <Child parentCount={count}/>
        </>
    )
}
