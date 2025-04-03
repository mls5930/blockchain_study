// const log = <T>(a: T): T => {
//   console.log(a);
//   return a
// }

// log<number>(1);
// log<string>("1");
// log<[string]>(["하하"]);

// interface objectDTO<T>  {
//   userid: string
//   birthday: T
// }

// const object: objectDTO<string[]> = {
//   userid: "wnqud",
//   birthday: ["1996-08-02"]
// }

// interface user {
//   userid: string
// }

interface liquorDTO {
    name: string,
    dosu: any
}

const liquor: liquorDTO = {
    name: "12년산 전통주",
    dosu: 20
} 
