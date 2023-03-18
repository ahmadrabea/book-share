import React from "react";
import styled from "styled-components";
import colors from "../../assets/colors";

const Select = () => {
  return (
    <SelectInput>
      <option selected>Newest</option>
      <option>Oldest</option>
    </SelectInput>
  );
};

export default Select;

const SelectInput = styled.select`
  width: 140px;
  height: 50px;
  border: 3px solid ${colors.primary};
  border-radius: 15px;
  overflow: hidden;
  padding: 5px;
  padding-right: 10px;
  font-size: 20px;
`;
