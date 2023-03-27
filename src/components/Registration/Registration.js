import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import colors from "../../assets/colors";
import Atoms from "../../Atoms/Atoms";
import doRequest from "../../Service/doRequest";
import { Column, H2, Row } from "../../Utils/Utils";
import { ReactComponent as Fly1 } from "../../assets/icons/fly1.svg";
import { ReactComponent as Fly2 } from "../../assets/icons/fly2.svg";

const Registration = () => {
  const firstName = useRef();
  const emailRef = useRef();
  const address = useRef();
  const lastName = useRef();
  const phoneNumber = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(Atoms.loggedInState);
  const [token, setToken] = useRecoilState(Atoms.tokenState);
  const [error, setError] = useState(false);

  const handleSuccessfulLogin = (data) => {
    setToken(data.token);
    setIsLoggedIn(true);
    navigate("/home");
  };
  const handleFailedLogin = () => {};

  const handleSignIn = () => {
    // doRequest(
    //   "http://127.0.0.1:8000/account/login/",
    //   "POST",
    //   {
    //     username: emailRef.current.value,
    //     password: passwordRef.current.value,
    //   },
    //   (data) => {
    //     handleSuccessfulLogin(data);
    //   },
    //   handleFailedLogin
    // );
  };
  return (
    <RegContainer>
      <Fly1 className="fly1" />
      <Fly2 className="fly2" />

      <ContentContainer>
        <Row className="gap20 alignedStart">
          <Column className="gap40">
            <InputField ref={firstName} placeholder={"First Name"} />
            <InputField ref={emailRef} placeholder={"Email"} />
            <InputField className="big" ref={address} placeholder={"Address"} />
          </Column>
          <Column className="gap40">
            <InputField ref={lastName} placeholder={"Last Name"} />
            <InputField ref={phoneNumber} placeholder={"Phone Number"} />
            <InputField ref={password} placeholder={"Password"} />
            <InputField
              ref={confirmPassword}
              placeholder={"Confirm Password"}
            />
          </Column>
        </Row>
        <Row>
          <SignUpButton onClick={handleSignIn}>Sign Up</SignUpButton>
        </Row>
      </ContentContainer>
    </RegContainer>
  );
};

export default Registration;

const RegContainer = styled.div`
  width: 70%;
  height: 600px;
  background-color: ${colors.primary};
  background-size: contain;
  border-radius: 15px;
  .gap20 {
    gap: 20px;
  }

  .gap40 {
    gap: 40px;
  }
  .fly1 {
    position: absolute;
    top: 200px;
    left: 200px;
    @media (max-width: 1700px) {
      display: none;
    }
  }
  .fly2 {
    position: absolute;
    top: 600px;
    right: 200px;
    @media (max-width: 1700px) {
      display: none;
    }
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 40px 20px;

  h2 {
    font-size: 50px;
    line-height: 1.5;
    margin: 0;
  }
  a {
    margin-left: 5px;
    font-size: 12px;
    cursor: pointer;
    color: black;
    font-weight: bold;
    opacity: 0.5;
    &:hover {
      color: ${colors.secondary};
    }
  }
`;

const InputField = styled.input`
  width: 420px;
  height: 45px;
  padding: 10px;
  border: 2px solid ${colors.lightGray};
  border-radius: 15px;
  font-size: 20px;
  &:focus {
    outline-color: ${colors.secondary};
  }
  &.big {
    height: 155px;
  }
`;
const SignUpButton = styled.button`
  width: 400px;
  height: 45px;
  padding: 10px;
  border: none;
  border-radius: 15px;
  background-color: ${colors.secondary};
  box-shadow: 0px 6px 20px #6c5dd480;
  font-size: 20px;
  cursor: pointer;
  color: white;
  margin-top: 50px;
`;
