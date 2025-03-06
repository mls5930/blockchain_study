import { useEffect, useState } from "react"
import axios from "axios"
import { counterReducer } from "../reducer/counterReducer"

export const Counter2 = () => {
    const [state, setState] = useState({
        count: 0,
    });

    // 최초로 컴포넌트가 생성했을 때, DB에 있는 카운터 값 가져와서 상태 저장
    useEffect(() => {
        const getCounter = async() => {
            const { data } = await axios.get("http://localhost:3005/counter");
            console.log(data.value.value);
            setState({...state, count: data.value.value})
        }
        getCounter();
    }, [])


    // 올라가는 버튼을 땅 때렸을 때, DB에 값을 저장해야됌
    const handleDispatch = async(action) => {
        try {
            // 요청 본문에 데이터를 담아서 보낼거임!
            // action타입이 INCREMENT면 증가한 값, 아니면 감소한 값
            const newValue = counterReducer(action, state);
            // DB에 데이터 생성 요청
            await axios.post('http://localhost:3005/counter', { newValue: newValue });
            // 요청이 완료 되었으면 상태 업데이트
            setState({...state, count: newValue})
        } catch (error) {
            console.log("Counter 기능 실패...", error);
        }
    }


    return (
        <>
            {state.count}
            <button onClick={() => handleDispatch("INCREMENT")}>+</button>
            <button onClick={() => handleDispatch("DECREMENT")}>-</button>
            <button onClick={() => handleDispatch("DELETE")}>리셋</button>
            {state.who}
        </>
    )
    /*
        DB와 서버 => API 통신을 이용한 카운터 구현

        1. 언제? 카운터의 숫자를 가져와서 상태에 넣을것인가?
        2. 언제? 카운터의 + 또는 -버튼을 눌렀을 때 서버에 통신하여 DB에 값을 넣을것인가?
    */
}