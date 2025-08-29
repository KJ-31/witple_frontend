import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-decoration: none;
  
  &:hover {
    color: #007bff;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavLink = styled(Link)<{ $active?: boolean }>`
  color: ${props => props.$active ? '#007bff' : '#666'};
  text-decoration: none;
  font-weight: ${props => props.$active ? '600' : '400'};
  padding: 8px 16px;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #f8f9fa;
    color: #007bff;
  }
`;

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <HeaderContainer>
      <Logo to="/">Witple</Logo>
      <Nav>
        <NavLink to="/" $active={location.pathname === '/'}>
          홈
        </NavLink>
        <NavLink to="/about" $active={location.pathname === '/about'}>
          소개
        </NavLink>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
