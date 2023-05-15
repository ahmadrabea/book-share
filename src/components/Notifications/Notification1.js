import React from "react";
import styled from "styled-components";
import { ReactComponent as Tick } from "../../assets/icons/tick.svg";
import { ReactComponent as Error } from "../../assets/icons/x.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";

import colors from "../../assets/colors";

export default function Notification1({ type, content }) {
  // type : true : green , false : red
  return (
    <>
      <Container className={type ? "true" : "false"}>
        {type ? (
          <Tick className="icon true" />
        ) : (
          <Error className="icon false" />
        )}
        <span className="info">{`Your request to borrow ${content.book_name} has been ${content.type}ed`}</span>
        <DeleteButton>
          <DeleteIcon />
        </DeleteButton>
      </Container>
    </>
  );
}

export const Container = styled.div`
  position: relative;
  border-radius: 15px;
  background-color: ${colors.primary};
  display: flex;
  align-items: center;
  min-width: 1400px;
  margin-bottom: 20px;
  overflow: hidden;

  .info {
    font-weight: 600;
    font-size: 25px;
    padding: 30px;
    width: 100%;
    background-color: white;
  }
  .icon {
    height: 100%;
    border-right: 2px solid;
    padding: 0px 10px;
    min-width: 50px;
  }
  .true {
    border-color: ${colors.greenBoarder};
  }
  .false {
    border-color: ${colors.redBoarder};
  }
  &.true {
    background-color: ${colors.greenBg};
    border: 2px solid ${colors.greenBoarder};
  }
  &.false {
    background-color: ${colors.redBg};
    border: 2px solid ${colors.redBoarder};
  }
  animation: fade-in 0.5s ease-in-out;
  @keyframes fade-in {
    0% {
      opacity: 0;
      margin-top: 20px;
    }
    100% {
      opacity: 1;
      margin-top: 0;
    }
  }
`;
export const DeleteButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 15px;
  background-color: ${colors.redBg};
  position: absolute;
  top: 15px;
  right: 15px;
  border: none;
  padding-top: 5px;
  cursor: pointer;
`;
