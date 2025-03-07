import { useEffect, useState } from "react";
import  axios  from "axios"
export const Counter = () => {

    const [state, setState] = useState({
        count:0,
        who: "sksms"
    })
    // 최초로 컴포넌트가 생성했을 쌔, DB에 있는 카운터 값 가져와서 상태 저장
    useEffect(() => {
        const getCounter = async () => {
            const {data} = await axios.get("http://localhost:3005/counter")
           console.log(data);
           
            setState({...state , count: data.value.value})
        }
        getCounter();
    },[])

    // 올라가는 버튼을 땅 때렸을 때, DB에 값을 저장해야함
   const handleIncrement = async(action) => {
    // npm install axios
    try{
        // 요청 본문에 데이터를 담아서 보낼거임!
        // action 타입이 INCREMENT면 증가한 값,아니면 감소한값
        const newValue = action === "INCREMENT"? state.count + 1 :state.count -1
        // DB에 데이터 생성 요청
        const response = await axios.post("http://localhost:3005/counter",{ newValue });
        // req.baby 
        // 요청이 완료 되었으면 상태 업데이트
        setState({...state , count:state.count + 1})
    }catch(error) {
        console.log("Counter 기능 실패", error);
        
    }
   }
    
   
    return (
        <>
            {state.count}
            <button onClick={() => handleIncrement("INCREMENT")}>+</button>
            {state.who}
        </>
    )

}

/*

    DB와 서버 => API 통신을 이용한 카운터 구현
    1. 언제? 카운터의 숫자를 가져와서 상태에 넣을것인가?
    2. 언제? 카운터의 + 또는 -버튼을 눌렀을  때 서버에 통신하여 DB에 값을 넣을것인가?
*/