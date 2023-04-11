import React, { useRef, useState } from "react";
import styled from "styled-components";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import { ReactComponent as PenIcon } from "../../assets/icons/pen.svg";

import colors from "../../assets/colors";
import { Column, Row } from "../../Utils/Utils";
import { useRecoilState } from "recoil";
import Atoms from "../../Atoms/Atoms";
import Message from "../Message/Message";

export default function Profile() {
  const firstName = useRef();
  const email = useRef();
  const about = useRef();
  const lastName = useRef();
  const phoneNumber = useRef();
  const address = useRef();
  const [token, setToken] = useRecoilState(Atoms.tokenState);
  const [userInfo, setUserInfo] = useRecoilState(Atoms.userInfo);
  const [message, setMessage] = useState("");

  const handleSuccessfulSave = () => {
    setMessage({
      type: true,
      content: "profile information has been updated Successfully",
    });

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };
  const handleBadSave = (data) => {
    setMessage({
      type: false,
      content: "something went wrong",
    });
  };

  const handleUpdateProfile = () => {
    console.log(userInfo);
    fetch(`http://127.0.0.1:8000/account/profile/${userInfo.user_id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
      body: JSON.stringify({
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        phone_number: phoneNumber.current.value,
        address: address.current.value,
        about: about.current.value,
      }),
    })
      .then((res) => {
        if (res.ok) {
          handleSuccessfulSave();
        } else {
          handleBadSave();
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
        <Column className="gap25">
          <Row className="width end">
            <SaveButton onClick={handleUpdateProfile}>Save</SaveButton>
          </Row>
          <Row className="gap25">
            <Column className="gap25">
              <ProfilePicture>
                <img src="/images/userAccount.jpg"></img>
              </ProfilePicture>
              <EditButton>
                <PenIcon />
              </EditButton>
              <DeleteButton>
                <DeleteIcon />
              </DeleteButton>
            </Column>
            <Column className="gap25">
              <InputField ref={firstName} placeholder={"First Name"} />
              <InputField ref={email} placeholder={"Email"} />
              <InputField ref={about} className="big" placeholder={"About"} />
            </Column>
            <Column className="gap25">
              <InputField ref={lastName} placeholder={"Last Name"} />
              <InputField ref={phoneNumber} placeholder={"Phone Number"} />
              <InputField
                ref={address}
                className="big"
                placeholder={"Address"}
              />
            </Column>
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

const ProfilePicture = styled.div`
  width: 200px;
  height: 200px;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 15px;
    width: 100%;
  }
`;

const SaveButton = styled.button`
  width: 100px;
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
export const DeleteButton = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 15px;
  background-color: ${colors.redBoarder};
  border: none;
  padding-top: 5px;
  cursor: pointer;
  path {
    fill: white;
  }
`;
export const EditButton = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 15px;
  background-color: ${colors.secondary};
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