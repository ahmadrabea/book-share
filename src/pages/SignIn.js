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
  const [verificationMessage, setVerificationMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const verificationToken = urlParams.get("token");
    fetch(`http://127.0.0.1:8000/verify-email/${verificationToken}/`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setVerificationMessage(data?.success);
      })
      .catch((error) => {
        console.log("someThing went wrong :", error);
      });
  }, []);
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
          {verificationMessage && (
            <Message type={true} text={verificationMessage} />
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
