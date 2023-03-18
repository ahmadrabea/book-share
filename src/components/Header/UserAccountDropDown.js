import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import colors from "../../assets/colors";
import Atoms from "../../Atoms/Atoms";

const UserAccountDropDown = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(Atoms.loggedInState);
  const handleSignOut = () => {
    setIsLoggedIn(false);
    navigate("/");
  };
  return (
    <Ul>
      <Li>WishList</Li>
      <Li>Your Profile</Li>
      <Li onClick={handleSignOut}>Sign Out</Li>
    </Ul>
  );
};

export default UserAccountDropDown;

const Ul = styled.ul`
  width: 130px;
  height: 130px;
  position: absolute;
  top: 55px;
  right: -4px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 10px;
  list-style-type: none;
  margin-block: 0;
  margin-inline: 0;
  padding-inline: 0;
  background-color: ${colors.primary};
`;
const Li = styled.li`
  /* flex: 1/3; */
  cursor: pointer;
  list-style: none;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  &:hover {
    background-color: ${colors.secondary};
    color: white;
  }
`;
