import axios from "axios"
import React, { useEffect,useState } from "react"
// step 1 버튼을 추가 .버튼을 누르면 새로운 강아지 사진이떠야함
// step 2 버튼을 누를 때 , 로딩상태 구현
export const Dog = () => {
    const [dog, setDog] = useState("");
    let [loading, setloding] = useState(false)
    const getDogimage = async () => {
        setloding(true)
        const response = await axios.get("https://dog.ceo/api/breeds/image/random")
        // {"message":"https:\/\/images.dog.ceo\/breeds\/retriever-flatcoated\/n02099267_4303.jpg","status":"success"}
        setDog(response.data.message)
        setloding(false)
    }

    useEffect(() => {
        getDogimage()
        
    },[])
    const switchimage = () => {
        switch (loading) {
            case true:
                
                return <div>로딩 중...</div>

            case false: 
                return <img src={dog} width={500} height={500}></img>
        }
    }
    return (
        <div>
             {switchimage()}
            <button onClick={getDogimage}> 강아지!</button>
        </div>
    )
}