import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import UserAccountDropDown from "./UserAccountDropDown";
import { useState } from "react";
import { useRecoilState } from "recoil";
import Atoms from "../../Atoms/Atoms";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isUserAccountDropDownDisplayed, setIsUserAccountDropDownDisplayed] =
    useState(false);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(Atoms.loggedInState);
  const handleNotification = () => {
    navigate("/notifications");
  };
  return (
    <Nav>
      <Container>
        <Logo>
          <img src="/images/logo.png" alt="book share logo" />
        </Logo>
        <RightBlock>
          <Links>
            <a href="#">Home</a>
            {isLoggedIn ? (
              <a href="#">Your library</a>
            ) : (
              <a href="#">Discover</a>
            )}
          </Links>
          <Buttons>
            {isLoggedIn ? (
              <>
                <Notification onClick={handleNotification}>
                  <FontAwesomeIcon icon={faBell} />
                </Notification>
                <UserAccount
                  onClick={() => {
                    setIsUserAccountDropDownDisplayed(
                      !isUserAccountDropDownDisplayed
                    );
                  }}
                >
                  <img src="/images/userAccount.jpg"></img>
                  {isUserAccountDropDownDisplayed && <UserAccountDropDown />}
                </UserAccount>
                <AddBook>
                  <div>
                    <img src="/images/add-book-icon.png" />
                  </div>
                  <span>Add book</span>
                </AddBook>{" "}
              </>
            ) : (
              <SignUpButton
                onClick={() => {
                  navigate("/signup");
                }}
              >
                <div>
                  <img src="/images/signin.svg" />
                </div>
                <span>Sign Up</span>
              </SignUpButton>
            )}
          </Buttons>
        </RightBlock>
      </Container>
    </Nav>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  width: 1400px;
`;

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  background-color: white;
  display: flex;
  justify-content: center;

  z-index: 100;
  border-bottom: solid 2px #00000029;
`;

const Logo = styled.a`
  height: 50px;
  display: inline-block;
  display: flex;
  cursor: pointer;
  img {
    display: block;
    width: 100%;
  }
`;

const RightBlock = styled.div`
  display: flex;
`;
const Links = styled.div`
  display: flex;
  align-items: center;

  a {
    text-decoration: none;
    padding: 7px 20px;
    color: black;
    font-size: 20px;
    font-weight: 600;
    transition: 300ms ease-in-out;
    :last-child {
      border-right: 1px solid #00000029;
      margin-right: 20px;
    }
    :hover {
      color: #6c5dd4;
    }
  }
`;
const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;
const Notification = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 15px;
  border: none;
  background-color: #f0edfd;
  transition: 150ms ease-in-out;
  cursor: pointer;
  :hover {
    background-color: #6c5dd4;
    svg {
      color: #f0edfd;
    }
  }
  svg {
    transition: 150ms ease-in-out;
    color: #6c5dd4;
    font-size: 25px;
  }
`;
const UserAccount = styled.div`
  width: 50px;
  height: 50px;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 15px;
    width: 100%;
  }
`;
const AddBook = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 50px;
  padding: 0px 20px;
  border-radius: 15px;
  color: white;
  background-color: #6c5dd4;
  box-shadow: 0px 1px 10px #6c5dd480;
  border: none;
  font-size: 16px;
  font-weight: 500;
  div {
    display: flex;
  }
`;
const SignUpButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 50px;
  padding: 0px 20px;
  border-radius: 15px;
  color: white;
  background-color: #6c5dd4;
  box-shadow: 0px 1px 10px #6c5dd480;
  border: none;
  font-size: 16px;
  font-weight: 500;
  div {
    display: flex;
  }
`;

export default Header;
