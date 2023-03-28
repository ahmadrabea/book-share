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
import Message from "../Message/Message";

const ForgetPassword = () => {
  const emailRef = useRef();

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(Atoms.loggedInState);
  const [token, setToken] = useRecoilState(Atoms.tokenState);
  const [error, setError] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSuccessfulLogin = (data) => {
    setToken(data.token);
    setIsLoggedIn(true);
    navigate("/home");
  };
  const handleBack = () => {
    navigate("/");
  };

  const handleSendEmail = () => {
    if (emailRegex.test(emailRef.current.value)) {
      setError(false);
    } else {
      setError(true);
    }
  };
  return (
    <RegContainer>
      {error && (
        <Message
          type={false}
          text={"invalid Email , please enter valid email"}
        />
      )}
      <Fly1 className="fly1" />
      <Fly2 className="fly2" />

      <ContentContainer>
        <Column className="gap20">
          <Row>
            <Column className="start">
              <H2>Forget Password ?</H2>
              <span>Reset password in two quick steps</span>
            </Column>
          </Row>

          <InputField ref={emailRef} placeholder={"Email"} />
          <SendEmailButton onClick={handleSendEmail}>
            Send Email
          </SendEmailButton>
          <BackButton onClick={handleBack}>Back</BackButton>
        </Column>
      </ContentContainer>
    </RegContainer>
  );
};

export default ForgetPassword;

const RegContainer = styled.div`
  width: 40%;
  height: 410px;
  background-color: ${colors.primary};
  background-size: contain;
  border-radius: 15px;
  margin-top: 80px;
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
  width: 375px;
  height: 45px;
  padding: 10px;
  border: 2px solid ${colors.lightGray};
  border-radius: 15px;
  font-size: 20px;
  margin-top: 30px;
  &:focus {
    outline-color: ${colors.secondary};
  }
  &.big {
    height: 155px;
  }
`;
const SendEmailButton = styled.button`
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
  margin-bottom: 10px;
`;

const BackButton = styled.button`
  width: 400px;
  height: 45px;
  padding: 10px;
  border: none;
  border-radius: 15px;
  background-color: transparent;
  font-size: 20px;
  cursor: pointer;
  color: black;
  margin-bottom: 10px;
`;
