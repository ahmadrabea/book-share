import React, { useEffect, useState } from "react";
import styled from "styled-components";
import colors from "../../assets/colors";
import { useRecoilState } from "recoil";
import Atoms from "../../Atoms/Atoms";
import { getCookie } from "../../Utils/Utils";

const Select = () => {
  // const [selectedOption, setSelectedOption] = useState("Newest");
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

  useEffect(() => {
    searchHandler();
  }, [selectedOption]);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <SelectInput value={selectedOption} onChange={handleChange}>
      <option value="Newest">Newest</option>
      <option value="Oldest">Oldest</option>
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
