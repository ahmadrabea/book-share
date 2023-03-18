import React from "react";
import styled from "styled-components";
import colors from "../../assets/colors";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";

const SearchInput = () => {
  return (
    <Container>
      <InputField />
      <IconContainer>
        <SearchIcon />
      </IconContainer>
    </Container>
  );
};

export default SearchInput;

const Container = styled.div`
  width: 310px;
  height: 50px;
  border: 3px solid ${colors.primary};
  border-radius: 15px;
  overflow: hidden;
  display: flex;
`;

const IconContainer = styled.div`
  width: 30%;
  height: 100%;
  position: relative;
  svg {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 5px;
    right: 21px;
    path {
      stroke: ${colors.secondary};
    }
  }
`;
const InputField = styled.input`
  width: 80%;
  height: 100%;
  border: none;
  outline: none;
  border-right: 3px solid ${colors.primary};
  padding-left: 10px;
  font-size: 20px;
`;
