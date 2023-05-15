import React from "react";
import { Row } from "../../Utils/Utils";
import styled from "styled-components";
import colors from "../../assets/colors";

const EmptyCard = (props) => {
  return (
    <Wrapper>
      <Row>
        <span className="content">No Results Found</span>
      </Row>
    </Wrapper>
  );
};

export default EmptyCard;

const Wrapper = styled.div`
  margin-top: 15px;
  padding: 15px;
  border: 1px solid ${colors.lightGray};
  border-radius: 15px;
  width: 100%;
  .content {
    color: ${colors.secondary};
    font-size: 23px;
  }
`;

const AddButton = styled.button`
  font-size: 20px;
  width: 100px;
  height: 50px;
  background-color: ${colors.greenBg};
  border-radius: 20px;
  color: ${colors.greenBoarder};
  border: none;
  cursor: pointer;
`;
