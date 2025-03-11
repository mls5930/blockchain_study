import instance from "./axios";

export const getCount = async() => {
    const { data } = await instance.get(`/counter`);
    return data.value.value
}

export const postCount = async(newValue) => {
    const {data : { value }} = await instance.post(`/counter`, { newValue });
    return value
}