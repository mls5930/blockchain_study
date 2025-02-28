import { useState } from "react";

export const useInput = (init) => {
    const [value, setValue] = useState(init);
    
    const onChange = (e) => {
        const {value} = e.target
        setValue(value)
    }
    return {
        value,
        onChange
    }
}