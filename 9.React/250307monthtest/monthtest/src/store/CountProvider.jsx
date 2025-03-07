
import React, {useState,useEffect,useContext,createContext} from "react";
import styled from "styled-components";
import axios from "axios"
const StyledBox = styled.div`
    padding: 20px 0 ;
    margin: 20px auto;
    max-width: 1000px;
    max-height: 600px;
    background-color: #9e9e9e;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    
`
const Databox = createContext(null)



export const CounteProvider = ({children}) => {

    const [state,setstate] = useState(
        {
            count:0,
            time:null
        }
    )
    useEffect( async() => {
        const dataget = await axios.get("http://localhost3005/counter")
    },[])
    useEffect(() => {
        if(state.count != null) {
            return setstate({
                ...state, 
                time: state.time ? [...state.time, "업로드"] : ["업로드"]
            });
        }else {
            return setstate({
                count:null,
                time:null
            })
        }
       
    },[state.count])

    return(
        <StyledBox>
            <Databox.Provider value={{state , setstate}} >
                {children}
            </Databox.Provider>
        </StyledBox>
    )
}
export const useCounter = () => useContext(Databox)
export default CounteProvider