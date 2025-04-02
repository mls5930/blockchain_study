interface sulInfo {
    name: string;
    dosu: string;
    vol: string
}

const Liquor: sulInfo = {
    dosu: "15%",
    name: "12년산 동동주",
    vol: "200000ml"
}

// const user: userDTO = {
//     userid: "s",
//     userpw: "d"
// }

interface user {
    userid: string
    userpw: string
}
interface userDTO {
    data: user[]
}

const h: userDTO = {
    data: [
        {
            userid: "", 
            userpw: ""
        }
    ]
}

const getLi = async() => {
    const { data } : userDTO = await getLiquor();
    return data
}