import React, { useRef, useState } from "react";
import styled from "styled-components";
import colors from "../../assets/colors";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { useRecoilState } from "recoil";
import Atoms from "../../Atoms/Atoms";
import { getCookie } from "../../Utils/Utils";

const SearchInput = (props) => {
  const searchInputRef = useRef();

  const token = getCookie();
  const [selectedCategoryId, setSelectedCategoryId] = useRecoilState(
    Atoms.categoryId
  );
  const [filteredCards, setFilteredCards] = useRecoilState(Atoms.cards);
  const [selectedStatus, setSelectedStatus] = useRecoilState(
    Atoms.SelectedStatus
  );
  const [selectedOption, setSelectedOption] = useRecoilState(Atoms.order);
  const [searchTerm, setSearchTerm] = useRecoilState(Atoms.searchTerm);

  const searchHandler = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const userId = urlParams.get("userid");
    let url = window.location.href.includes("home")
      ? `http://127.0.0.1:8000/list/?`
      : `http://127.0.0.1:8000/library/${userId}?`;
    if (selectedCategoryId) {
      url += `book_id__categories=${selectedCategoryId}&`;
    }
    if (selectedStatus) {
      let status;
      if (selectedStatus === "borrowed") {
        status = 0;
      } else if (selectedStatus === "notBorrowed") {
        status = 1;
      }
      url += `status=${status}&`;
    }

    if (searchTerm) {
      url += `search=${searchTerm}&`;
    }
    if (selectedOption) {
      if (selectedOption === "Newest") url += `ordering=-created_at`;
      if (selectedOption === "Oldest") url += `ordering=created_at`;
    }

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFilteredCards(data);
      })
      .catch((error) => {
        console.log("someThing went wrong :", error);
      });
  };
  return (
    <Container>
      <InputField
        ref={searchInputRef}
        onChange={() => setSearchTerm(searchInputRef.current.value)}
      />
      <IconContainer onClick={searchHandler}>
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
  cursor: pointer;
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
