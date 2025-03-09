import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { counterReducer } from "../reducer/counterReducer";

const CounterContext = createContext();

export const CounterProvider = ({ children }) => {
  // const [state, setState] = useState({ count: 0, history: [] });
  const [state, dispatch] = useReducer(counterReducer, {
    count: 0,
    history: [],
  });

  useEffect(() => {
    const getCounter = async () => {
      const { data } = await axios.get("http://localhost:3005/counter");
      console.log("data", data);
      setState({
        ...state,
        count: data.value.value,
        history: [{ time: data.value.createdAt }],
      });
    };
    getCounter();
  }, []);

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
};

export const useCount = () => useContext(CounterContext);
