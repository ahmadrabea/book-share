import React from "react";
import ReactDom from "react-dom";
import styled from "styled-components";
import { ReactComponent as Tick } from "../../assets/icons/tick.svg";
import { ReactComponent as Error } from "../../assets/icons/x.svg";

import colors from "../../assets/colors";

export default function Message({ type, text }) {
  // type : true : green , false : red
  return ReactDom.createPortal(
    <>
      {/* <Overlay onClick={clickOverlay} /> */}
      <Container className={type ? "true" : "false"}>
        {type ? (
          <Tick className="icon true" />
        ) : (
          <Error className="icon false" />
        )}
        <span className="info"> {text}</span>
      </Container>
    </>,
    document.getElementById("portal")
  );
}

export const Container = styled.div`
  position: absolute;
  border-radius: 15px;
  background-color: ${colors.primary};
  height: 50px;
  display: flex;
  align-items: center;
  top: 15%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;

  .info {
    padding: 0 10px;
    font-weight: 600;
  }
  .icon {
    height: 100%;
    border-right: 2px solid;
    padding: 0px 10px;
    width: 30px;
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
      top: 10%;
    }
    100% {
      opacity: 1;
      top: 15%;
    }
  }
`;
