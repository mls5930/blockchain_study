import React from "react";
import { NavLink } from "react-router-dom";
import {styled} from "styled-components";

const StyledNavLink = styled(NavLink)`
    color: red;
`
export const Headerhandle = ({ruter}) => {

    return (
        <li>
            <StyledNavLink to={ruter}>{ruter}</StyledNavLink>
        </li>
    )
    
} 