import React from 'react'
import styled from 'styled-components';

export const Navbar = () => {
  return (
    <SNav>ポケモン図鑑</SNav>
  )
}

const SNav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: orange;
    height: 60px;
    width: 100%;
    color: #fff;
    font-size: 24px;
`;