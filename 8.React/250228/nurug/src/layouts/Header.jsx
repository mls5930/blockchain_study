import React from "react";
import { HeaderWrapper } from "../components/HeaderWrapper.styled";
import { NavLink } from "react-router-dom";
// npm install react-router-dom
// NavLink => a태그 역할 => 일단 쭉 구현하고 설명할게요
// to => a태그의 href와 비슷함.

export const Header = () => {
    return (
        <HeaderWrapper>
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/about">About</NavLink>
                </li>
                <li>
                    <NavLink to="/contact">Contact</NavLink>
                </li>
                <li>
                    <NavLink to="/login">Login</NavLink>
                </li>
            </ul>
        </HeaderWrapper>
    )
}