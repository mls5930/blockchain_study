import React from "react";
import { HeaderWrapper } from "../components/header/HeaderWrapper.styled"
import { NavLink } from "react-router-dom";

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
            </ul>
        </HeaderWrapper>
    )
}

