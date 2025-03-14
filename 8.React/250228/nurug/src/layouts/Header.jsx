import React from "react";
import { HeaderWrapper } from "../components/HeaderWrapper.styled";
import { NavLink } from "react-router-dom";
import {styled} from "styled-components"

const StyledNavLink = styled(NavLink)`
    color: red;
`
// npm install react-router-dom
// NavLink => a태그 역할 => 일단 쭉 구현하고 설명할게요
// to => a태그의 href와 비슷함.

/*
    커스텀 훅 기준

    1. 반복적인 코드가 무엇인가? 자유롭게 작성해보자
*/
export const Header = () => {
    return (
        <HeaderWrapper>
            <ul>
                <li>
                    <StyledNavLink to="/">Home</StyledNavLink>
                </li>
                <li>
                    <StyledNavLink to="/about">About</StyledNavLink>
                </li>
                <li>
                    <StyledNavLink to="/contact">Contact</StyledNavLink>
                </li>
                <li>
                    <StyledNavLink to="/login">Login</StyledNavLink>
                </li>
                <li>
                    <StyledNavLink to="/customhooktest">CustumHookTest</StyledNavLink>
                </li>
                <li>
                    <StyledNavLink to="/customhooktest2">CustumHookTest2</StyledNavLink>
                </li>
            </ul>
        </HeaderWrapper>
    )
}