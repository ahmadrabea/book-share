import React, { useRef, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header/Header";
import { Column, H2, Row, getCookie } from "../Utils/Utils";
import Footer from "../components/Footer/Footer";
import colors from "../assets/colors";
import ISBNCard from "../components/AddBook/ISBNCard";
import EmptyCard from "../components/AddBook/EmptyCard";
import { useNavigate } from "react-router-dom";

const AddBookPage = () => {
  const [token, setToken] = useState(getCookie());
  const [books, setBooks] = useState();
  const [flag, setFlag] = useState(false);
  const searchRef = useRef();
  const navigate = useNavigate();
  const search = () => {
    fetch(
      `http://127.0.0.1:8000/book-search/?search=${searchRef.current.value}`,
      {
        method: "GET",
        headers: {
          Authorization: `token ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        return data;
      })
      .then((books) => {
        setFlag(!books.length);
      })
      .catch((error) => {
        console.log("someThing went wrong :", error);
      });
  };
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
              <InputField ref={searchRef} />
              <SearchButton onClick={search}>Search</SearchButton>
              <NewButton onClick={() => navigate("/addBookForm")}>
                New
              </NewButton>
            </Row>
            <span className="light">(ISBN , title , author)</span>
            {books &&
              books.map((book) => (
                <ISBNCard
                  key={book.id}
                  title={book.book_name}
                  isbn={book.ISBN}
                  author={book.author}
                  bookId={book.id}
                />
              ))}
            {flag && <EmptyCard />}
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
