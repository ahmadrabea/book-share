import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header/Header";
import { Column, H2, Row, getCookie } from "../Utils/Utils";
import Footer from "../components/Footer/Footer";
import ForgetPassword from "../components/ForgetPassword/ForgetPassword";
import { useNavigate } from "react-router-dom";

const ForgetPasswordPage = () => {
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
          <ForgetPassword />
        </Wrapper>
      </Container>

      <Footer />
    </>
  );
};

export default ForgetPasswordPage;

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
