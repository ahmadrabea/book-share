import React, { useEffect, useState } from "react";
import styled from "styled-components";
import colors from "../../assets/colors";
import { ReactComponent as Heart } from "../../assets/icons/heart.svg";
import { ReactComponent as Star } from "../../assets/icons/star.svg";
import { Row, Column, getCookie } from "../../Utils/Utils";
import { json, useNavigate } from "react-router-dom";
import { ReactComponent as Eye } from "../../assets/icons/eye.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import { ReactComponent as PenIcon } from "../../assets/icons/pen.svg";

const FeedCard = (props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(getCookie());
  const [status, setStatus] = useState(props.status);
  const [isMine, setIsMine] = useState(false);

  const goToUser = (id) => {
    navigate(`/library?userid=${id}`);
  };
  const goToBook = (id) => {
    navigate(`/bookPage?bookId=${id}`);
  };
  const borrowRequest = () => {
    fetch("http://127.0.0.1:8000/create-notification/", {
      method: "POST",
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_book_id: props.bookOwnerId,
        type: "borrow_request",
        message: "",
      }),
    })
      .then((res) => {
        if (res.ok) setStatus(false);
      })
      .catch((error) => {
        console.log("someThing went wrong :", error);
      });
  };

  useEffect(() => {
    if (window.location.href.includes("myLibrary")) {
      setIsMine(true);
    }
  }, []);
  return (
    <FeedCardContainer>
      <LeftBlock>
        <img
          src={props.bookImageUrl || "https://placehold.co/210x300"}
          onClick={() => goToBook(props.bookId)}
        />
      </LeftBlock>
      <RightBlock>
        <Row>
          <Column className="start">
            <h1 className="book-title">{props.bookName}</h1>
            <Row>
              {props.category.map((item, idx) => {
                let lastIdx = props.category.length - 1;
                return (
                  <span className="category">
                    {item}
                    {idx === lastIdx ? "" : ", "}
                  </span>
                );
              })}
            </Row>
          </Column>
          <Row>
            <Column className="star">
              <Star />
            </Column>
            <Column className="start">
              <span className="rate">
                <span className="user-rate">{props.avgRating}</span>/10
              </span>
              <span className="number-of-ratings">{props.numberRating}</span>
            </Column>
          </Row>
        </Row>
        <Row>
          <p className="description">{props.description}</p>
        </Row>
        <Row>
          <Column>
            <Row>
              <Column className="start mr">
                <span className="title">Author</span>
                <span className="value">{props.author}</span>
              </Column>
              <Column className="start mr">
                <span className="title">Publisher</span>
                <span className="value">{props.publisher}</span>
              </Column>
              <Column className="start mr">
                <span className="title">Year</span>
                <span className="value">{props.year}</span>
              </Column>
            </Row>
          </Column>

          {isMine ? (
            <Row className="gap20">
              {" "}
              <Repost>
                <Eye />
                Repost
              </Repost>
              <EditButton>
                <PenIcon />
              </EditButton>
              <DeleteButton>
                <DeleteIcon />
              </DeleteButton>{" "}
            </Row>
          ) : (
            <Row className="gap20">
              <UserImage
                onClick={() => goToUser(props.bookOwnerId)}
                src={props.userImageUrl}
              />
              <BorrowRequest
                className={status ? "" : "borrowed"}
                onClick={borrowRequest}
              >
                {status ? "Borrow Request" : "Already borrowed"}
              </BorrowRequest>
              <Save>
                <Heart />
              </Save>
            </Row>
          )}
        </Row>
      </RightBlock>
    </FeedCardContainer>
  );
};

export default FeedCard;

const FeedCardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  width: 1056px;
  border-radius: 25px;
  border: 1px solid ${colors.lightGray};
  margin-bottom: 15px;
`;
const LeftBlock = styled.div`
  padding: 35px;
  padding-right: 15px;
  img {
    border-radius: 25px;
    height: 300px;
    width: 210px;
    object-fit: cover;
    cursor: pointer;
  }
`;
const RightBlock = styled.div`
  padding: 35px;
  padding-left: 15px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  .book-title {
    font-size: 25px;
    font-weight: bold;
  }
  .category {
    font-size: 12px;
    color: ${colors.secondary};
  }
  .user-rate {
    font-weight: bold;
    font-size: 25px;
    color: black;
  }
  .rate {
    font-size: 20px;
    color: ${colors.lightGray};
  }
  .description {
    font-size: 16px;
    line-height: 1.7;
  }
  .mr {
    margin-right: 40px;
  }
  .gap20 {
    gap: 20px;
  }
  .title {
    font-size: 13px;
    color: #cccccc;
  }
  .value {
    font-size: 16px;
    color: black;
  }
  .number-of-ratings {
    font-size: 14px;
    color: ${colors.lightGray};
  }
  .star {
    padding-bottom: 10px;
    padding-right: 7px;
  }
`;

const UserImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 20px;
  object-fit: cover;
  cursor: pointer;
`;
const BorrowRequest = styled.button`
  font-size: 20px;

  width: 180px;
  height: 60px;
  background-color: ${colors.secondary};
  border-radius: 20px;
  color: white;
  border: none;
  font-weight: 600;
  cursor: pointer;
  &.borrowed {
    color: ${colors.secondary};
    background-color: ${colors.primary};
    cursor: not-allowed;
  }
`;
const Repost = styled.button`
  font-size: 20px;
  position: relative;
  width: 150px;
  height: 60px;
  background-color: ${colors.secondary};
  border-radius: 20px;
  color: white;
  border: none;
  font-weight: 600;
  padding-left: 30px;
  cursor: pointer;
  &.borrowed {
    color: ${colors.secondary};
    background-color: ${colors.primary};
    cursor: not-allowed;
  }
  svg {
    position: absolute;
    top: 19px;
    left: 20px;
  }
`;

const Save = styled.button`
  width: 60px;
  height: 60px;
  border: 1px solid ${colors.primary};
  background-color: white;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  &:hover {
    background-color: ${colors.secondary};
  }
  path {
    fill: white;
  }
`;
export const DeleteButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 15px;
  background-color: ${colors.redBg};
  border: none;
  padding-top: 5px;
  box-shadow: white;
  text-decoration: none;
  cursor: pointer;
  path {
    fill: ${colors.redBoarder};
  }
`;
export const EditButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 15px;
  background-color: ${colors.primary};
  border: none;
  padding-top: 5px;
  box-shadow: white;
  text-decoration: none;
  cursor: pointer;
  path {
    fill: ${colors.secondary};
    stroke: ${colors.secondary};
  }
`;
