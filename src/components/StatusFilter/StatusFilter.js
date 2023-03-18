import React, { useState } from "react";
import styled from "styled-components";
import colors from "../../assets/colors";
import { ReactComponent as Arrow } from "../../assets/icons/arrow.svg";
import { H2, Row } from "../../Utils/Utils";

const StatusFilter = () => {
  const [isStatusOpen, setIsStatusOpen] = useState(true);
  const toggleAccordion = () => {
    setIsStatusOpen(!isStatusOpen);
  };
  return (
    <Container>
      <Row className="bb p20">
        <H2>Status</H2>
        <IconContainer
          onClick={toggleAccordion}
          className={isStatusOpen ? "" : "closed"}
        >
          <Arrow />
        </IconContainer>
      </Row>
      <Row>
        <CheckBoxContainer className={isStatusOpen ? "" : "closed"}>
          <Row className="start p7">
            <CheckBoxInput />
            <label>Borrowed</label>
          </Row>
          <Row className="start p7">
            <CheckBoxInput />
            <label>Not Borrowed</label>
          </Row>
        </CheckBoxContainer>
      </Row>
    </Container>
  );
};

export default StatusFilter;

const Container = styled.div`
  width: 310px;
  border: 3px solid ${colors.primary};
  border-radius: 15px;
  overflow: hidden;
  .bb {
    border-bottom: 2px solid ${colors.primary};
  }
  .p20 {
    padding: 20px;
  }
  .p7 {
    padding: 7px;
  }
  h2 {
    margin: 0;
  }
`;

const CheckBoxContainer = styled.div`
  height: 80px;
  padding-left: 10px;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  &.closed {
    height: 0;
  }
`;

const CheckBoxInput = styled.input.attrs({ type: "checkbox" })`
  width: 17px;
  height: 17px;
`;
const IconContainer = styled.div`
  width: 30px;
  height: 30px;
  position: relative;
  cursor: pointer;
  svg {
    position: absolute;
    top: 9px;
    left: 7px;
    rotate: 180deg;
    transition: all 0.2s ease-in-out;
  }
  &.closed {
    svg {
      rotate: 0deg;
    }
  }
`;
