import React, { useRef, useState } from "react";
import styled from "styled-components";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import { ReactComponent as PenIcon } from "../../assets/icons/pen.svg";

import colors from "../../assets/colors";
import { Column, getCookie, Row } from "../../Utils/Utils";
import { useRecoilState } from "recoil";
import Atoms from "../../Atoms/Atoms";
import Message from "../Message/Message";
import { useEffect } from "react";
import RatingStars from "../helper/StarsRating";

export default function Form() {
  const firstName = useRef();
  const email = useRef();
  const about = useRef();
  const lastName = useRef();
  const phoneNumber = useRef();
  const imageInputRef = useRef();
  const address = useRef();
  const [token, setToken] = useState(getCookie());
  const [emptyFile, setEmptyFile] = useState();
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("userId"))
  );
  const [message, setMessage] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const handleImageChange = () => {
    const file = imageInputRef.current.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImagePreviewUrl(imageUrl);
  };
  const handleImageDelete = () => {
    setImagePreviewUrl("/images/user.png");
    setEmptyFile(new File([], "/images/user.png", { type: "image/jpeg" }));
  };

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
    const formData = new FormData();
    formData.append("first_name", firstName.current.value);
    formData.append("last_name", lastName.current.value);
    formData.append("phone_number", phoneNumber.current.value);
    formData.append("address", address.current.value);
    formData.append("about", about.current.value);
    formData.append(
      "user_image_url",
      imageInputRef.current.files[0] || emptyFile
    );

    fetch(`http://127.0.0.1:8000/account/profile/${userId}/`, {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
      },
      body: formData,
    })
      .then((res) => {
        if (res.ok) {
          console.log(res);
          handleSuccessfulSave();
          return res.json();
        } else {
          handleBadSave();
        }
      })
      .then((data) => {
        console.log(data);
        if (data) {
          console.log(data);
          localStorage.setItem("userInfo", JSON.stringify(data));
          setUserInfo(localStorage.getItem("userInfo"));
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
          <Row className="gap25 alignedStart">
            <Column className="gap25">
              <BookPicture>
                {/* <img src={imagePreviewUrl || userInfo.user_image_url}></img> */}
                <img src={"/images/book.png"}></img>
              </BookPicture>
              <EditButton onClick={() => imageInputRef.current.click()}>
                <PenIcon />
                <input
                  hidden
                  type={"file"}
                  ref={imageInputRef}
                  onChange={handleImageChange}
                />
              </EditButton>
              <DeleteButton onClick={handleImageDelete}>
                <DeleteIcon />
              </DeleteButton>
            </Column>
            <Column className="gap25">
              <InputField ref={firstName} placeholder={"Book title"} />
              <InputField ref={email} placeholder={"Author"} />
              <InputField ref={about} placeholder={"Publisher"} />
              <InputField
                ref={about}
                className="big"
                placeholder={"Description"}
              />
            </Column>
            <Column className="gap25">
              <RatingStars initialRating={0} />
              <InputField ref={lastName} placeholder={"Year"} />
              <InputField ref={phoneNumber} placeholder={"ISBN"} />

              <DropDownCategories>
                <option hidden>Select Book Categories</option>
                <option>Drama</option>
                <option>Drama</option>
                <option>Drama</option>
                <option>Drama</option>
                <option>Drama</option>
                <option>Drama</option>
              </DropDownCategories>
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

const DropDownCategories = styled.select`
  width: 442px;
  height: 72px;
  padding: 10px;
  border: 2px solid #c6c6c6;
  border-radius: 15px;
  font-size: 20px;
  cursor: pointer;
  &:focus {
    outline-color: ${colors.secondary};
  }
  &.big {
    height: 100px;
  }
`;

const BookPicture = styled.div`
  width: 200px;
  height: 250px;
  overflow: hidden;
  cursor: pointer;
  position: relative;

  img {
    border-radius: 15px;
    width: 100%;
    height: 100%;
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
const CategoryButton = styled.button`
  width: 100%;
  height: 60px;
  padding: 10px;
  border: none;
  border-radius: 15px;
  background-color: ${colors.lightGray};
  box-shadow: 0px 6px 20px #6c5dd480;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  color: black;
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
  .star {
    margin-top: 11px;
    margin-bottom: 10px;
    padding-bottom: 10px;
    padding-right: 7px;
  }
  .blank {
    width: 30px;
    cursor: pointer;
    &.hovered {
      path {
        fill: #ff764b;
      }
    }
    path {
      fill: ${colors.lightGray};
    }
  }
  .filled {
    width: 30px;
    cursor: pointer;
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
