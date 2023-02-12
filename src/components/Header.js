import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <Nav>
      <Container>
        <Logo>
          <img src="/images/logo.png" alt="book share logo" />
        </Logo>
        <RightBlock>
          <Links>
            <a href="#">Home</a>
            <a href="#">Your library</a>
          </Links>
          <Buttons>
            <Notification>
              <FontAwesomeIcon icon={faBell} />
            </Notification>
            <UserAccount>
              <img src="/images/userAccount.jpg"></img>
            </UserAccount>
            <AddBook>
              <FontAwesomeIcon icon={faBookmark} />
              Add book
            </AddBook>
          </Buttons>
        </RightBlock>
      </Container>
    </Nav>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  width: 1400px;
`;

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: white;
  display: flex;
  justify-content: center;

  z-index: 100;
  border-bottom: solid 2px #00000029;
`;

const Logo = styled.a`
  height: 50px;
  display: inline-block;
  display: flex;
  img {
    display: block;
    width: 100%;
  }
`;

const RightBlock = styled.div`
  display: flex;
`;
const Links = styled.div`
  display: flex;
  align-items: center;

  a {
    text-decoration: none;
    padding: 7px 20px;
    color: black;
    font-size: 20px;
    font-weight: 600;
    :last-child {
      border-right: 1px solid #00000029;
      margin-right: 20px;
    }
  }
`;
const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;
const Notification = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 15px;
  border: none;
  background-color: #f0edfd;
  svg {
    color: #6c5dd4;
    font-size: 25px;
  }
`;
const UserAccount = styled.div`
  width: 50px;
  height: 50px;
  img {
    border-radius: 15px;
    width: 100%;
  }
`;
const AddBook = styled.button`
  height: 50px;
  padding: 0px 20px;
  border-radius: 15px;
  color: white;
  background-color: #6c5dd4;
  box-shadow: 0px 1px 10px #6c5dd480;
  border: none;
  font-size: 16px;
  font-weight: 500;
  svg {
    padding-right: 5px;
  }
`;

export default Header;
