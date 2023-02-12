import React from "react";
import styled from "styled-components";

const SliderItem = () => {
  return (
    <CardWrapper>
      <Card />
      <BookName>Booooooook Name</BookName>
      <Tags>HISTORY,DRAMA</Tags>
    </CardWrapper>
  );
};

export default SliderItem;

const Card = styled.div`
  width: 180px;
  height: 250px;
  border-radius: 20px;
  border: 1px solid #707070;
  background-color: white;
`;

const BookName = styled.span`
  padding: 12px;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
`;
const Tags = styled.span`
  padding-bottom: 12px;
  font-weight: 600;
  font-size: 12px;
  text-align: center;
  color: #6c5dd4;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 200px;
  overflow: hidden;
  margin-top: 40px;
`;
