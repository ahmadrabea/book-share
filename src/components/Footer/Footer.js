import styled from "styled-components";
import { Column, Row } from "../../Utils/Utils";
import { ReactComponent as Facebook } from "../../assets/icons/facebook.svg";
import { ReactComponent as Twitter } from "../../assets/icons/twitter.svg";
import colors from "../../assets/colors";

const Footer = () => {
  return (
    <>
      <FirstRow>
        <Container>
          <Logo>
            <img src="/images/logo.png" alt="book share logo" />
          </Logo>
          <RightBlock>
            <Row>
              <Facebook className="margin" />
              <Twitter />
            </Row>
          </RightBlock>
        </Container>
      </FirstRow>
      <SecondRow>
        <Container>
          <span>Book Share website - © 2023 all rights reserved</span>
          <span>Made by Hamza Za'atra and Ahmad Abu Rabea</span>
        </Container>
      </SecondRow>
    </>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  width: 1400px;
`;

const FirstRow = styled.div`
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  height: 90px;
  background-color: white;
  display: flex;
  justify-content: center;
  margin-top: 20px;

  background-color: ${colors.primary};
  svg {
    margin: 10px;
  }
`;
const SecondRow = styled.div`
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: white;
  display: flex;
  justify-content: center;

  background-color: ${colors.secondary};
  span {
    color: white;
  }
`;

const Logo = styled.a`
  height: 50px;
  display: inline-block;
  display: flex;
  cursor: pointer;
  img {
    display: block;
    width: 100%;
  }
`;

const RightBlock = styled.div`
  display: flex;
`;

export default Footer;

// const Footer = () => {
//   return (
//     <FooterContainer>
//       <Container>
//         <Column>
//           <Row className="first">
//             <Column>
//               <Logo>
//                 <img src="/images/logo.png" alt="book share logo" />
//               </Logo>
//             </Column>
//             <Row>
//               <Facebook className="margin" />
//               <Twitter />
//             </Row>
//           </Row>
//           <Row className="second">
//             <span>Book Share website - © 2023 all rights reserved</span>
//             <span>Made by Hamza Za'atra and Ahmad Abu Rabea</span>
//           </Row>
//         </Column>
//       </Container>
//     </FooterContainer>
//   );
// };

// export default Footer;
