import React, { useRef, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Tick } from "../../assets/icons/tick.svg";
import { ReactComponent as Error } from "../../assets/icons/x.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";

import colors from "../../assets/colors";
import { Column, getCookie, Row } from "../../Utils/Utils";
import Message from "../Message/Message";

export default function Notification1({ content }) {
  const textRef = useRef();
  const [token, setToken] = useState(getCookie());
  const [data, setData] = useState();
  const [message, setMessage] = useState("");

  const setTemplate = (e) => {
    textRef.current.value = e.target.innerText;
  };
  const handleAccept = () => {
    fetch(`http://127.0.0.1:8000/create-notification/ `, {
      method: "POST",
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_book_id: content.user_book_id,
        receiver_id: content.sender_id,
        type: "accept",
        message: textRef.current.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setMessage({
            type: false,
            content: data.error,
          });
        } else if (data.detail) {
          setMessage({
            type: true,
            content: data.detail,
          });
        }
      })
      .catch((error) => {
        console.log("someThing went wrong :", error);
      });
  };
  const handleReject = () => {
    fetch(`http://127.0.0.1:8000/create-notification/ `, {
      method: "POST",
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_book_id: content.user_book_id,
        receiver_id: content.sender_id,
        type: "reject",
        message: textRef.current.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setMessage({
            type: false,
            content: data.error,
          });
        } else if (data.detail) {
          setMessage({
            type: true,
            content: data.detail,
          });
        }
      })
      .catch((error) => {
        console.log("someThing went wrong :", error);
      });
  };

  const setContactInfo = (e) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const user_id = urlParams.get("userId");
    fetch(`http://127.0.0.1:8000/account/${user_id}`, {
      method: "GET",
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        textRef.current.value = ` Name: ${data?.full_name} \n
Email: ${data?.email} \n
Phone: ${data?.phone_number} \n
Address: ${data?.address}`;
      })
      .catch((error) => {
        console.log("someThing went wrong :", error);
      });
  };
  // type : true : green , false : red
  return (
    <>
      {message && <Message type={message.type} text={message.content} />}
      <Container>
        <Column className="start gap25">
          <Row>
            <Row>
              <span className="title">
                {`${content.sender_name} wants to borrow ${content.book_name}`}
              </span>
            </Row>
            <Row>
              <DeleteButton>
                <DeleteIcon />
              </DeleteButton>
              <AcceptButton onClick={handleAccept}>Accept</AcceptButton>
              <RejectButton onClick={handleReject}>Reject</RejectButton>
            </Row>
          </Row>
          <Row>
            <textarea
              ref={textRef}
              defaultValue={"I'm sorry the book is borrowed to some one else"}
            />
          </Row>
          <Row>
            <ContactInfoButton onClick={setContactInfo}>
              Contact Information
            </ContactInfoButton>
            <Template1 onClick={setTemplate}>
              I'm not available right now
            </Template1>
            <Template2 onClick={setTemplate}>
              I will contact you as soon as possible
            </Template2>
          </Row>
        </Column>
      </Container>
    </>
  );
}

const ContactInfoButton = styled.button`
  height: 45px;
  padding: 10px;
  border: none;
  border-radius: 15px;
  background-color: ${colors.secondary};
  box-shadow: 0px 6px 20px #6c5dd480;
  font-size: 20px;
  cursor: pointer;
  color: white;
  margin-right: 10px;
`;

const Template1 = styled.button`
  height: 45px;
  padding: 10px;
  border: none;
  margin-right: 10px;
  border-radius: 15px;
  background-color: ${colors.secondary};
  box-shadow: 0px 6px 20px #6c5dd480;
  font-size: 20px;
  cursor: pointer;
  color: white;
`;

const Template2 = styled.button`
  height: 45px;
  padding: 10px;
  border: none;
  border-radius: 15px;
  background-color: ${colors.secondary};
  box-shadow: 0px 6px 20px #6c5dd480;
  font-size: 20px;
  cursor: pointer;
  color: white;
  margin-right: 10px;
`;

export const Container = styled.div`
  position: relative;
  border-radius: 15px;
  background-color: white;
  border: 1px solid ${colors.lightGray};
  display: flex;
  align-items: center;
  min-width: 1340px;
  margin-bottom: 20px;
  overflow: hidden;
  padding: 30px;
  textarea {
    width: 1300px;
    max-width: 1300px;
    height: 185px;
    max-height: 185px;
    font-size: 25px;
    border: 1px solid ${colors.lightGray};
    border-radius: 15px;
    resize: none;
    padding: 10px;
    &:focus {
      outline: none;
      border: 1px solid ${colors.secondary};
    }
  }
  .title {
    font-size: 30px;
    max-width: 1000px;
    line-height: 1.2;
  }
  .gap25 {
    gap: 25px;
  }
  animation: fade-in 0.5s ease-in-out;
  @keyframes fade-in {
    0% {
      opacity: 0;
      margin-top: 20px;
    }
    100% {
      opacity: 1;
      margin-top: 0;
    }
  }
`;
export const DeleteButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 15px;
  background-color: ${colors.redBg};
  position: absolute;
  top: 15px;
  right: 255px;
  border: none;
  padding-top: 5px;
  cursor: pointer;
`;

export const AcceptButton = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 10px;
  background-color: ${colors.greenBg};
  position: absolute;
  top: 15px;
  right: 15px;
  border: none;
  padding-top: 5px;
  color: ${colors.greenBoarder};
  cursor: pointer;
  font-size: 20px;
  font-weight: 700;
`;

export const RejectButton = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 10px;
  background-color: ${colors.redBg};
  position: absolute;
  top: 15px;
  right: 135px;
  border: none;
  padding-top: 5px;
  color: ${colors.redBoarder};
  cursor: pointer;
  font-size: 20px;
  font-weight: 700;
`;
