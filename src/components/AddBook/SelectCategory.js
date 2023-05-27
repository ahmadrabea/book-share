import React, { useEffect, useState } from "react";
import styled from "styled-components";
import colors from "../../assets/colors";
import { getCookie } from "../../Utils/Utils";
import { useRecoilState } from "recoil";
import Atoms from "../../Atoms/Atoms";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputLabel = styled.label`
  margin-bottom: 8px;
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 442px;
  height: 72px;
  padding: 10px;
  border: 2px solid #c6c6c6;
  border-radius: 15px;
  font-size: 20px;
  cursor: pointer;
  background-color: white;
  color: black;
  opacity: 0.7;
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 999;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 4px 4px;
  background-color: #fff;
  max-height: 200px;
  overflow: scroll;
  overflow-x: hidden;
  &.hidden {
    display: none;
  }
`;

const DropdownItem = styled.li`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
  z-index: 999;
`;

const SelectedItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 8px;
  gap: 5px;
  max-width: 440px;
`;

const SelectedItem = styled.span`
  font-size: 14px;
  color: ${colors.secondary};
`;

const SelectCategory = (props) => {
  const [bookCategories, setBookCategories] = useRecoilState(
    Atoms.bookCategories
  );
  const [token, setToken] = useState(getCookie());
  const [categories, setCategories] = useState([]);

  const [isListHidden, setIsListHidden] = useState(true);

  const handleCategorySelect = (category) => {
    setCategories((prevCategories) =>
      prevCategories.filter((c) => c !== category)
    );
    props.setSelectedCategories((prevSelectedCategories) => [
      ...prevSelectedCategories,
      category,
    ]);
    setIsListHidden(true);

    setBookCategories((prevBookCategories) => [
      ...prevBookCategories,
      category.id,
    ]);
  };

  const handleDisplayList = () => {
    setIsListHidden(!isListHidden);
  };
  useEffect(() => {
    fetch("https://octopus-app-lk2sv.ondigitalocean.app/categories/", {
      method: "GET",
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log("someThing went wrong :", error);
      });
  }, []);

  return (
    <InputContainer>
      <DropdownContainer>
        <DropdownButton onClick={handleDisplayList}>
          {categories?.length === 0
            ? "No Categories Available"
            : "Select a Category"}
          <i className="material-icons">˅</i>
        </DropdownButton>
        {categories?.length > 0 && (
          <DropdownList className={isListHidden ? "hidden" : ""}>
            {categories.map((item) => (
              <DropdownItem
                key={item.id}
                onClick={() => handleCategorySelect(item)}
              >
                {item.category}
              </DropdownItem>
            ))}
          </DropdownList>
        )}
      </DropdownContainer>
      {props.selectedCategories?.length > 0 && (
        <SelectedItemsContainer>
          {props.selectedCategories.map((item) => (
            <SelectedItem key={item.id}>{item.category} , </SelectedItem>
          ))}
        </SelectedItemsContainer>
      )}
    </InputContainer>
  );
};

export default SelectCategory;
