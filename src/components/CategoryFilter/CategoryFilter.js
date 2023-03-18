import React, { useState } from "react";
import styled from "styled-components";
import colors from "../../assets/colors";
import { ReactComponent as Arrow } from "../../assets/icons/arrow.svg";
import { H2, Row } from "../../Utils/Utils";

const CategoryFilter = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const toggleAccordion = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };
  return (
    <Container>
      <Row className="bb p20">
        <H2>Category</H2>
        <IconContainer
          onClick={toggleAccordion}
          className={isCategoryOpen ? "" : "closed"}
        >
          <Arrow />
        </IconContainer>
      </Row>
      <Row>
        <FiltersContainer className={isCategoryOpen ? "" : "closed"}>
          <Category>Drama</Category>
          <Category>History</Category>
          <Category>Tech</Category>
          <Category>economy</Category>
          <Category>economy</Category>
          <Category>Drama</Category>
          <Category>Drama</Category>
          <Category>History</Category>
          <Category>economy</Category>
          <Category>Drama</Category>
          <Category>Tech</Category>
          <Category>economy</Category>
          <Category>Drama</Category>
          <Category>History</Category>
          <Category>Tech</Category>
          <Category>economy</Category>
          <Category>economy</Category>
          <Category>Drama</Category>
          <Category>Drama</Category>
          <Category>economy</Category>
          <Category>Drama</Category>
          <Category>History</Category>
          <Category>Tech</Category>
          <Category>economy</Category>
          <Category>Drama</Category>
          <Category>History</Category>
          <Category>Tech</Category>
          <Category>economy</Category>
          <Category>Drama</Category>
          <Category>History</Category>
          <Category>Tech</Category>
          <Category>economy</Category>
        </FiltersContainer>
      </Row>
    </Container>
  );
};

export default CategoryFilter;

const Container = styled.div`
  width: 310px;
  border: 3px solid ${colors.primary};
  border-radius: 15px;
  overflow: hidden;
  margin-top: 20px;
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

const FiltersContainer = styled.div`
  padding-left: 10px;
  height: 265px;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  display: flex;
  flex-wrap: wrap;
  &.closed {
    height: 0;
  }
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

const Category = styled.div`
  height: 17px;
  border: 1px solid ${colors.secondary};
  border-radius: 9px;
  padding: 3px;
  margin: 3px;
  cursor: pointer;
  color: ${colors.secondary};
`;
