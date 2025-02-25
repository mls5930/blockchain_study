import React, { useState, useEffect } from "react";
import './style.css'

export const Counter = () => {
    const [value, setValue] = useState(0)
    console.log("asd");
    
    const increment = () => {
        setValue((prevState) => prevState + 1);
    }

    const decrement = () => {
        setValue((prevState) => prevState - 1);
    }

    return (
        <>
            <div>{value}</div>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </>
    )
}