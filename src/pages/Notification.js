import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header/Header";
import { Column, H2, Row, getCookie } from "../Utils/Utils";
import Footer from "../components/Footer/Footer";
import Notification1 from "../components/Notifications/Notification1";
import Notification2 from "../components/Notifications/Notification2";
import { useNavigate } from "react-router-dom";

const NotificationPage = () => {
  const [token, setToken] = useState(getCookie());
  const [notifications, setNotifications] = useState();
  const [updateFlag, setUpdateFlag] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/notifications/", {
      method: "GET",
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setNotifications(data);
      })
      .catch((error) => {
        console.log("someThing went wrong :", error);
      });
  }, [updateFlag]);
  return (
    <>
      <Header></Header>
      <Container>
        <Wrapper>
          <Column className="start">
            <H2 className="mb50">Notifications</H2>
            {notifications?.length ? (
              notifications.map((item) => {
                if (item.type === "accept") {
                  return (
                    <Notification1
                      type={true}
                      content={item}
                      setUpdateFlag={setUpdateFlag}
                    />
                  );
                } else if (item.type === "reject") {
                  return <Notification1 type={false} content={item} />;
                } else if (item.type === "borrow_request") {
                  return <Notification2 content={item} />;
                } else {
                  return <p></p>;
                }
              })
            ) : (
              <p></p>
            )}
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
