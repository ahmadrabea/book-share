import React from "react";
import styled from "styled-components";
import Header from "../components/Header/Header";
import { Column, H2, Row } from "../Utils/Utils";
import Footer from "../components/Footer/Footer";
import Registration from "../components/Registration/Registration";

const SignInPage = () => {
  return (
    <>
      <Header></Header>
      <Container>
        <Wrapper>
          <Registration />
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
