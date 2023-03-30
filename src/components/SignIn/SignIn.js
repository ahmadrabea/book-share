import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import colors from "../../assets/colors";
import Atoms from "../../Atoms/Atoms";
import doRequest from "../../Service/doRequest";
import { H2 } from "../../Utils/Utils";

const SignIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(Atoms.loggedInState);
  const [token, setToken] = useRecoilState(Atoms.tokenState);
  const [error, setError] = useState(false);

  const handleSuccessfulLogin = (data) => {
    setToken(data.token);
    setIsLoggedIn(true);
    navigate("/home");
  };
  const handleFailedLogin = (data) => {
    data.error && console.log(data.error);
    data.non_field_errors && console.log(data.non_field_errors);
  };
  const handleForgetPassword = (e) => {
    e.preventDefault();
    navigate("/forgetpassword");
  };

  const handleSignIn = () => {
    doRequest(
      "http://127.0.0.1:8000/account/login/",
      "POST",
      {
        username: emailRef.current.value,
        password: passwordRef.current.value,
      },
      (data) => {
        handleSuccessfulLogin(data);
      },
      handleFailedLogin
    );
  };
  return (
    <SignInContainer>
      <ContentContainer>
        <H2>
          Give Your <br />
          Books a New Life
        </H2>
        <InputField ref={emailRef} placeholder={"Email"} />
        <InputField
          ref={passwordRef}
          placeholder={"Password"}
          type={"password"}
        />
        <a onClick={handleForgetPassword}>Forget Your Password ?</a>
        <SignInButton onClick={handleSignIn}>Sign In</SignInButton>
      </ContentContainer>
    </SignInContainer>
  );
};

export default SignIn;

const SignInContainer = styled.div`
  width: 70%;
  height: 600px;
  background-image: url("images/signin.png");
  background-size: contain;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  padding-left: 100px;
  padding-top: 60px;

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
  width: 260px;
  height: 25px;
  padding: 10px;
  border: 2px solid ${colors.lightGray};
  border-radius: 15px;
  font-size: 20px;
  &:focus {
    outline-color: ${colors.secondary};
  }
`;
const SignInButton = styled.button`
  width: 285px;
  height: 45px;
  padding: 10px;
  border: none;
  border-radius: 15px;
  background-color: ${colors.secondary};
  box-shadow: 0px 6px 20px #6c5dd480;
  font-size: 20px;
  cursor: pointer;
  color: white;
`;
