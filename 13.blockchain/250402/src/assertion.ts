import axios from "axios"
const fetchData = async () => {
    const { data: { userid, birthday } } = await axios.get("http://api.example");
    return { userid: userid as string, birthday: birthday as string | number }
}

// birthday
// "1950-08-02" 한국
// "1950/08/02" 미국
// 508002 => number 타입 예측이 힘들다.
const a = fetchData();

/*
    변수 a는 fetchData의 반환값이 객체이기 때문에 a 타입 자체는 객체입니다.
    a 안에 userid와 birthday속성이 있는데 각각 string,string 입니다.
*/
