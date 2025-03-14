import { getCount } from "../../api/counter"

export const getHistory = (result) => {
    return result.map((value) => ({
        id: value.id,
        createdAt: value.createdAt
    }));
};

export const getData = async () => {
    const result = await getCount();
    const history = getHistory(result);
    return { count: result[0].value, history };
};