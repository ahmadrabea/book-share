import React from "react";
import styled from "styled-components";
import colors from "../../assets/colors";
import { ReactComponent as Heart } from "../../assets/icons/heart.svg";
import { ReactComponent as Star } from "../../assets/icons/star.svg";
import { Row, Column } from "../../Utils/Utils";
import { useNavigate } from "react-router-dom";

const FeedCard = (props) => {
  const navigate = useNavigate();
  console.log("props");
  console.log(props);
  const goToUser = (id) => {
    navigate(`/library?userid=${id}`);
  };
  return (
    <FeedCardContainer>
      <LeftBlock>
        <img src={props.bookImageUrl || "https://placehold.co/210x300"} />
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
          <Row className="gap20">
            <UserImage
              onClick={() => goToUser(props.bookOwnerId)}
              src={props.userImageUrl}
            />
            <BorrowRequest className={props.status ? "borrowed" : ""}>
              {props.status ? "Already borrowed" : "Borrow Request"}
            </BorrowRequest>
            <Save>
              <Heart />
            </Save>
          </Row>
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
