import instance from "./axios";

export const getCount = async() => {
    const { data } = await instance.get(`/counter`);
    return data
}

export const postCount = async(newValue) => {
    const { data } = await instance.post(`/counter`, { newValue });
    return data
}