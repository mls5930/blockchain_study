import React from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';
import { HeaderWrapper } from '../components/HeaderWrapper.styled';

const StyledNavLink = styled(NavLink)`
  color: green;
`;

export const Header = () => {
  return (
    <HeaderWrapper>
        <ul>
            <li>
                <StyledNavLink to="/dashboard">Dashboard</StyledNavLink>
            </li>
            <li>
                <StyledNavLink to="/login">Login</StyledNavLink>
            </li>
            <li>
                <StyledNavLink to="/counter">Counter</StyledNavLink>
            </li>
            <li>
                <StyledNavLink to="/">Home</StyledNavLink>
            </li>
        </ul>
    </HeaderWrapper>
  );
};
