import React from "react";
import styled from "styled-components";
import colors from "../../assets/colors";
import { ReactComponent as Heart } from "../../assets/icons/heart.svg";
import { ReactComponent as Star } from "../../assets/icons/star.svg";
import { Row, Column } from "../../Utils/Utils";

const FeedCard = () => {
  return (
    <FeedCardContainer>
      <LeftBlock>
        <img src="https://placehold.co/210x300" />
      </LeftBlock>
      <RightBlock>
        <Row>
          <Column className="start">
            <h1 className="book-title">Book Title</h1>
            <span className="category">Drama,History</span>
          </Column>
          <Row>
            <Column className="star">
              <Star />
            </Column>
            <Column className="start">
              <span className="rate">
                <span className="user-rate">9.0</span>/10
              </span>
              <span className="number-of-ratings">10K</span>
            </Column>
          </Row>
        </Row>
        <Row>
          <p className="description">
            A Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
          </p>
        </Row>
        <Row>
          <Column>
            <Row>
              <Column className="start mr">
                <span className="title">Author</span>
                <span className="value">Ahmad Abu Rabea</span>
              </Column>
              <Column className="start mr">
                <span className="title">Publisher</span>
                <span className="value">University of Jordan</span>
              </Column>
              <Column className="start mr">
                <span className="title">Year</span>
                <span className="value">2019</span>
              </Column>
            </Row>
          </Column>
          <Row className="gap20">
            <UserImage src={"/images/face.jpeg"} />
            <BorrowRequest>Borrow Request</BorrowRequest>
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
  cursor: pointer;
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
