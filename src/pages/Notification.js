import React from "react";
import styled from "styled-components";
import Header from "../components/Header/Header";
import { Column, H2, Row } from "../Utils/Utils";
import Footer from "../components/Footer/Footer";
import Notification1 from "../components/Notifications/Notification1";
import Notification2 from "../components/Notifications/Notification2";

const NotificationPage = () => {
  return (
    <>
      <Header></Header>
      <Container>
        <Wrapper>
          <Column className="start">
            <H2 className="mb50">Notifications</H2>
            <Notification1
              type={true}
              text={
                "Your request to borrow Rich Dad Poor Dad has been accepted"
              }
            />
            <Notification1
              type={false}
              text={
                "Your request to borrow Rich Dad Poor Dad has been rejected"
              }
            />
            <Notification2 />
            <Notification2 />
          </Column>
        </Wrapper>
      </Container>

      <Footer />
    </>
  );
};

export default NotificationPage;

const Container = styled.div`
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 25px;
  .mb50 {
    margin-bottom: 70px;
  }
`;

const Wrapper = styled.div`
  padding: 0 36px;
  width: 1400px;
  display: flex;
  justify-content: center;
`;
