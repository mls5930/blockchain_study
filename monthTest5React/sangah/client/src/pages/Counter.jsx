import React, { useEffect, useState } from "react";
import axios from "axios";
import { ContainerWrapper } from "../components/ContainerWrapper.styled";
import { counterReducer } from "../reducer/counterReducer";
// import { data } from "react-router-dom";

export const Counter = () => {
  const [state, setState] = useState({ count: 0 });
  const [history, setHistory] = useState([]); // history 따로 만들면 편함

  // 날짜도 복사해서 넣어, 배열로 가져와 순회 돌려서 뿌려
  useEffect(() => {
    try {
      const getCounter = async () => {
        const { data } = (await axios.get("http://localhost:3005/counter")); // 비동기로 실행
        setHistory([...history, ...data.history]);
        setState({ count: data.count }); // axios 실행되기 전 실행?되서 초기값 적용됨 "COUNT:0"
      };
      getCounter();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleDispatch = async (action) => {
    console.log("state", state);
    try {
      const newValue = counterReducer(state, action);
      const response = await axios.post("http://localhost:3005/counter", {
        newValue: newValue,
      });

      setState({ ...state, count: newValue }); // history: [...state.history, time : ]
      setHistory([...history, { createdAt: response.data.createdAt }]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ContainerWrapper>
      <h1>Count : {state.count}</h1>
      <div>
        <div className="count-box">
          <button onClick={() => handleDispatch("INCREMENT")}>+</button>
          <button onClick={() => handleDispatch("DECREMENT")}>-</button>
          <button onClick={() => handleDispatch("RESET")}>RESET</button>
        </div>
        <div className="history-box">
          <ul>
            {history.length === 0 ? (
              <h1>Loading..</h1>
            ) : (
              history.map((item, index) => (
                <li className="history" key={index}>
                  {item.createdAt}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </ContainerWrapper>
  );
};
