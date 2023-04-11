import styled from "styled-components";

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  &.start {
    justify-content: flex-start;
  }
  &.alignedStart {
    align-items: flex-start;
  }
  &.end {
    justify-content: flex-end;
  }
`;
export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  &.start {
    align-items: flex-start;
  }
`;

export const H2 = styled.h2`
  color: black;
  font-size: 30px;
  font-weight: bold;
`;
