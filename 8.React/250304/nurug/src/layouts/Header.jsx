import React from 'react';
import { HeaderWrapper } from '../components/HeaderWrapper.styled';
import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';

const StyledNavLink = styled(NavLink)`
  color: green;
`;

export const Header = () => {
  return (
    <HeaderWrapper>
      <ul>
        <li>
          <StyledNavLink to="/counter">Counter</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/dashboard">Dashboard</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/login">Login</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/counter2">CounterUseMemo2</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/counter3">CounterUseCallback</StyledNavLink>
        </li>
      </ul>
    </HeaderWrapper>
  );
};
