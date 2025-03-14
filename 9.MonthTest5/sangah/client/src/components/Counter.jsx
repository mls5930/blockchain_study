import React, { useContext } from "react";
import axios from "axios";
import { useCount } from "../context/CounterContext";
import { counterReducer } from "../reducer/counterReducer";

export const Counter = () => {
  const { state, dispatch } = useCount();

  const handleDispatch = async (action) => {
    console.log("state", state);
    try {
      dispatch({ action });
      // const newValue = counterReducer(action, state);
      await axios.post("http://localhost:3005/counter", {
        newValue: state.count,
      });
      setState({ ...state, count: newValue }); // history: [...state.history, time : ]
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="count-box">
      <button onClick={() => handleDispatch("INCREMENT")}>+</button>
      <button onClick={() => handleDispatch("DECREMENT")}>-</button>
      <button onClick={() => handleDispatch("RESET")}>RESET</button>
    </div>
  );
};
