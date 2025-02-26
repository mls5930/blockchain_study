import React, { useEffect, useState } from "react";
import axios from "axios"

export const Dog = () => {
    const [dog, setDog] = useState("");
    const [loading, setLoading] = useState(false);

    const getDogImage = async() => {
        setLoading(true);
        const response = await axios.get("https://dog.ceo/api/breeds/image/random");
        setDog(response.data.message);
        setLoading(false);
    }

    const switchImage = () => {
        switch (loading) {
            case true:
                return <div>로딩 중...</div>
            case false:
                return <img src={dog} />
        }
    }

    useEffect(() => {
        getDogImage()
    }, [])

    return (
        <>
            {loading ? <div>로딩 중...</div> : <img src={dog} alt="Random Dog" />}
            <button onClick={getDogImage}>강아지!</button>
        </>
    )
}