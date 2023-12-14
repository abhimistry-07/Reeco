import React from "react";
import styled from "styled-components";

const Navbar = () => {
  return (
    <NavbarContainer>
      <LeftPart>
        <h1>Reeco</h1>
        <NavLink href="#">Store</NavLink>
        <NavLink href="#">Orders</NavLink>
        <NavLink href="#">Analytics</NavLink>
      </LeftPart>
      <RightPart>
        <NavLink href="#">Cart</NavLink>
        <span>Hello, Abhishek</span>
      </RightPart>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.div`
  background-color: #48dda7;
  /* padding: 5px; */
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
`;

const LeftPart = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`;

// const Logo = styled.img`
//   width: 50px;
//   height: 50px;
// `;

const RightPart = styled.div`
  display: flex;
  gap: 30px;

  span {
    font-weight: bold;
  }
`;

const NavLink = styled.a`
  text-decoration: none;
  color: white;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

export default Navbar;
