import React from "react";
import styled from "styled-components";
import Header from "../components/Header/Header";
import { Column, H2, Row } from "../Utils/Utils";
import Footer from "../components/Footer/Footer";
import colors from "../assets/colors";
import ISBNCard from "../components/AddBook/ISBNCard";

const AddBookPage = () => {
  return (
    <>
      <Header></Header>
      <Container>
        <Wrapper>
          <Column className="start full">
            <H2>Add Book</H2>
            <span className="sub">1- Find your book :</span>
            <span className="light">
              if you don't find your book , you can add a new book
            </span>
            <Row>
              <InputField />
              <SearchButton>Search</SearchButton>
              <NewButton>New</NewButton>
            </Row>
            <span className="light">(ISBN , title , author)</span>

            <ISBNCard />
            <ISBNCard />
          </Column>
        </Wrapper>
      </Container>

      <Footer />
    </>
  );
};

export default AddBookPage;

const Container = styled.div`
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 25px;
  .mb50 {
    margin-bottom: 70px;
  }
  .full {
    width: 100%;
  }
  .sub {
    font-size: 25px;
  }
  .light {
    color: ${colors.lightGray};
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

const Wrapper = styled.div`
  padding: 0 36px;
  width: 1400px;
  display: flex;
  justify-content: center;
`;

const InputField = styled.input`
  width: 420px;
  height: 30px;
  padding: 10px;
  border: 2px solid ${colors.lightGray};
  border-radius: 15px;
  font-size: 20px;
  &:focus {
    outline-color: ${colors.secondary};
  }
  &.big {
    height: 155px;
  }
`;

const SearchButton = styled.button`
  font-size: 20px;
  width: 120px;
  height: 50px;
  background-color: ${colors.secondary};
  border-radius: 20px;
  color: white;
  border: none;
  cursor: pointer;
  margin-left: 20px;
  margin-right: 20px;
`;
const NewButton = styled.button`
  font-size: 20px;
  width: 120px;
  height: 50px;
  background-color: ${colors.greenBg};
  border-radius: 20px;
  color: ${colors.greenBoarder};
  border: none;
  cursor: pointer;
`;
