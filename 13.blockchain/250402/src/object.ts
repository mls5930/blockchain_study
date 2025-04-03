const object1: { name: string; dosu: string; vol: string } = {
    name: "12년산 동동주",
    dosu: "18%",
    vol: "150ml"
}


interface sulInfo {
    name: string;
    dosu: string;
    vol: string;
}


const Liquor: sulInfo = {
    name: "12년산 동동주",
    dosu: "18%",
    vol: "150ml"
}

// const getLiquor = async () => {
//     const { data }: sulInfo[] = await getLiquor();
//     return data
// }