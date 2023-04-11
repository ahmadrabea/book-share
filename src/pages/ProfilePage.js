import React from "react";
import styled from "styled-components";
import Header from "../components/Header/Header";
import { Column, H2, Row } from "../Utils/Utils";
import Footer from "../components/Footer/Footer";
import SignIn from "../components/SignIn/SignIn";
import { useRecoilState } from "recoil";
import Atoms from "../Atoms/Atoms";
import Message from "../components/Message/Message";
import Profile from "../components/Profile/Profile";
import ChangePassword from "../components/Profile/ChangePassword";

const ProfilePage = () => {
  return (
    <>
      <Header></Header>
      <Container>
        <Wrapper>
          <Column className="start">
            <H2>Your Profile</H2>
            <Profile />
            <H2>Change Password</H2>
            <ChangePassword />
          </Column>
        </Wrapper>
      </Container>

      <Footer />
    </>
  );
};

export default ProfilePage;

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
