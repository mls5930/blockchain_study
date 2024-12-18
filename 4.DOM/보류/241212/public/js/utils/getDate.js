const getDate = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate(); 
    const hour = today.getHours();
    const minutes = today.getMinutes();

    return `${year}-${month}-${date} ${hour}:${minutes}`
}