import instance from "./axios";

export const getCounter = async() => {
    const { data } = await instance.get("/counter");
    return data;
}

export const postCounter = async(newCount) => {
    await instance.post('/counter', {newValue: newCount});    
    return;
}