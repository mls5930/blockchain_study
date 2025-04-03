import axios from "axios"

    // data : {
    //     userid: "",
    //     birthday: ""
    // }
// const fetchData = async() => {
//     const { data: { userid, birthday } } = await axios.get("http://api.example")
//     return { userid: userid as string, birthday: birthday as string | number }
// }
1
const fetchData = async(): Promise<{userid: string, birthday: string | number}> => {
    const { data: { userid, birthday } } = await axios.get("http://api.example")
    return { userid, birthday }
}


// "1950-08-02"
// "1950/08/02"
// 500802 => number

const a = fetchData();

/*
    변수 a는 fetchData의 반환값이 객체이기 때문에 a 타입 자체는 객체입니다.
    a 안에 userid와 birthday속성이 있는데 각각 string, string 입니다.
*/