import useState from "react"
import { NavLink } from "react-router-dom"
import { isAction } from "redux"
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"

const HeaderSty = styled.div`

        @keyframes gradientMove {
        0% {
            background-position: 0% 50%;
        }

        50% {
            background-position: 100% 50%;
        }

        100% {
            background-position: 0% 50%;
        }
    }
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    background: linear-gradient(to right, #786be6, #f57f7f);
    animation: gradientMove 4s ease infinite;
    background-size: 200% 200%;               
    border: 1 px solid #ccc;
    & > a {
        color: yellow;
        list-style: none;
        text-decoration: none;
    }
    & > div {
        color: white;
        font-size: 50px;
    }
`



export const Header = () => {
    const login = useSelector((state) => state.user.message)
    console.log(login);

    const dispath = useDispatch()

    return (
        <HeaderSty>
            <div>나는 Header</div>
            <div>{login}</div>
            <NavLink to="/main1" className={({ isActive }) => isActive ? "text-blue-500 font-bold" : ""}>더하기로 이동</NavLink>
            <NavLink to="/main2" className={({ isActive }) => isActive ? "text-red-500 font-bold" : ""}>마이너스로 이동</NavLink>
        </HeaderSty>
    )
}