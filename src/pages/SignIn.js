import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header/Header";
import { Column, H2, Row, getCookie } from "../Utils/Utils";
import Footer from "../components/Footer/Footer";
import SignIn from "../components/SignIn/SignIn";
import { useRecoilState } from "recoil";
import Atoms from "../Atoms/Atoms";
import Message from "../components/Message/Message";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const [successfulRegMessage, setSuccessfulRegMessage] = useRecoilState(
    Atoms.successfulRegMessage
  );
  const [token, setToken] = useState(getCookie());
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  });

  return (
    <>
      <Header></Header>
      <Container>
        <Wrapper>
          {successfulRegMessage && (
            <Message type={true} text={successfulRegMessage} />
          )}
          <SignIn />
        </Wrapper>
      </Container>

      <Footer />
    </>
  );
};

export default SignInPage;

const Container = styled.div`
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 25px;
`;

const Wrapper = styled.div`
  padding: 0 36px;
  width: 1400px;
  display: flex;
  justify-content: center;
`;
