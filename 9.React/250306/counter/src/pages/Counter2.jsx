import  axios  from "axios"
import { useData } from "../store/counterProvider.jsx";
export const Counter2 = () => {
    const {state,dispatch} = useData()
    
    // 최초로 컴포넌트가 생성했을 쌔, DB에 있는 카운터 값 가져와서 상태 저장
   const handleIncrement = async(type) => {
    try {
        const newValue = type === "INCREMENT" ? state.value + 1 : state.value - 1 
        await axios.post("http://localhost:3005/counter",{ newValue });
        dispatch({type})
    } catch(error) {
        console.log("Counter 기능 실패", error);
    }
   }
    return (
        <>
            {state.value}
            <button onClick={() => handleIncrement("INCREMENT")}>+</button>
            <button onClick={() => handleIncrement("DECREMENT")}>-</button>
            <button onClick={() => handleIncrement("RESET")}>리셋버튼</button>
        </>
    )
}