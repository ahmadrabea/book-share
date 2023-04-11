import React from "react";
import styled from "styled-components";
import Header from "../components/Header/Header";
import { Column, H2, Row } from "../Utils/Utils";
import Footer from "../components/Footer/Footer";
import SignIn from "../components/SignIn/SignIn";
import { useRecoilState } from "recoil";
import Atoms from "../Atoms/Atoms";
import Message from "../components/Message/Message";

const SignInPage = () => {
  const [successfulRegMessage, setSuccessfulRegMessage] = useRecoilState(
    Atoms.successfulRegMessage
  );
  setTimeout(() => {
    setSuccessfulRegMessage("");
  }, 2000);
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
