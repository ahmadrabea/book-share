import React, { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import colors from "../../assets/colors";
import Atoms from "../../Atoms/Atoms";
import { Column, Row } from "../../Utils/Utils";
import Message from "../Message/Message";

export default function ChangePassword() {
  const currentPassword = useRef();
  const newPassword = useRef();
  const confirmNewPassword = useRef();
  const [token, setToken] = useRecoilState(Atoms.tokenState);
  const [message, setMessage] = useState("");
  const handleSuccessfulChange = (data) => {
    console.log(data);
    setMessage({
      type: true,
      content: data.detail,
    });

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };
  const handleBadChange = (data) => {
    setMessage({
      type: false,
      content: data?.detail
        ? data?.detail
        : data?.error
        ? data?.error
        : "something went wrong",
    });

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleChangePassword = () => {
    fetch("http://127.0.0.1:8000/account/change-password/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
      body: JSON.stringify({
        current_password: currentPassword.current.value,
        new_password: newPassword.current.value,
        confirm_new_password: confirmNewPassword.current.value,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          handleBadChange();
        }
      })
      .then((data) => {
        if (data) {
          handleSuccessfulChange(data);
        }
      })
      .catch((error) => {
        console.log("someThing went wrong :", error);
      });
  };

  return (
    <>
      {message && <Message type={message.type} text={message.content} />}
      <Container>
        <Column className="start gap25">
          <Row className="gap25">
            <InputField
              ref={currentPassword}
              type={"password"}
              placeholder={"Current Password"}
              autoComplete="new-password"
            />
            <InputField
              ref={newPassword}
              type={"password"}
              placeholder={"NewPassword"}
            />
            <InputField
              ref={confirmNewPassword}
              type={"password"}
              placeholder={"Confirm New Password"}
            />
          </Row>
          <Row>
            <ChangeButton onClick={handleChangePassword}>
              Change Password
            </ChangeButton>
          </Row>
        </Column>
      </Container>
    </>
  );
}

const InputField = styled.input`
  width: 420px;
  height: 45px;
  padding: 10px;
  border: 2px solid ${colors.lightGray};
  border-radius: 15px;
  font-size: 20px;
  &:focus {
    outline-color: ${colors.secondary};
  }
  &.big {
    height: 100px;
  }
`;

const ChangeButton = styled.button`
  width: 200px;
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

export const Container = styled.div`
  position: relative;
  border-radius: 15px;
  background-color: white;
  border: 1px solid ${colors.lightGray};
  display: flex;
  justify-content: center;
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
  }
  .gap25 {
    gap: 25px;
  }
  .width {
    width: 100%;
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
