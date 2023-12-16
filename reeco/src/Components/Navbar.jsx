import React from "react";
import styled from "styled-components";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Flex,
  Image,
  VStack,
  HStack,
  Spacer,
  Box,
} from "@chakra-ui/react";

const Navbar = () => {
  return (
    <NavbarContainer>
      <LeftPart>
        <Text fontSize='4xl' as='b'>Reeco</Text>
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
  /* background-color: #48dda7; */
  background-color: #1e633f;
  /* padding: 5px; */
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 65px;
  height: 75px;
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
