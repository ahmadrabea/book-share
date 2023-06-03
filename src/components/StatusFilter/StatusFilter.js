import React, { useEffect, useState } from "react";
import styled from "styled-components";
import colors from "../../assets/colors";
import { ReactComponent as Arrow } from "../../assets/icons/arrow.svg";
import { H2, Row, getCookie } from "../../Utils/Utils";
import { useRecoilState } from "recoil";
import Atoms from "../../Atoms/Atoms";

const StatusFilter = () => {
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useRecoilState(
    Atoms.SelectedStatus
  );

  const token = getCookie();
  const [selectedCategoryId, setSelectedCategoryId] = useRecoilState(
    Atoms.categoryId
  );
  const [filteredCards, setFilteredCards] = useRecoilState(Atoms.cards);

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
  }, [selectedStatus]);

  const toggleAccordion = () => {
    setIsStatusOpen(!isStatusOpen);
  };
  const CheckInput = ({ value }) => {
    const handleClick = (e) => {
      setSelectedStatus(value === selectedStatus ? null : value);
    };
    return (
      <CheckBoxInput
        checked={value === selectedStatus}
        onClick={(e) => handleClick(e)}
      />
    );
  };
  return (
    <Container>
      <Row className="bb p20">
        <H2>Status</H2>
        <IconContainer
          onClick={toggleAccordion}
          className={isStatusOpen ? "" : "closed"}
        >
          <Arrow />
        </IconContainer>
      </Row>
      <Row>
        <CheckBoxContainer className={isStatusOpen ? "" : "closed"}>
          <Row className="start p7">
            <CheckInput value="borrowed" />
            {/* <CheckBoxInput /> */}
            <label>Borrowed</label>
          </Row>
          <Row className="start p7">
            <CheckInput value="notBorrowed" />
            <label>Not Borrowed</label>
          </Row>
        </CheckBoxContainer>
      </Row>
    </Container>
  );
};

export default StatusFilter;

const Container = styled.div`
  width: 310px;
  border: 3px solid ${colors.primary};
  border-radius: 15px;
  overflow: hidden;
  .bb {
    border-bottom: 2px solid ${colors.primary};
  }
  .p20 {
    padding: 20px;
  }
  .p7 {
    padding: 7px;
  }
  h2 {
    margin: 0;
  }
`;

const CheckBoxContainer = styled.div`
  height: 80px;
  padding-left: 10px;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  &.closed {
    height: 0;
  }
`;

const CheckBoxInput = styled.input.attrs({ type: "checkbox" })`
  width: 17px;
  height: 17px;
  cursor: pointer;
`;
const IconContainer = styled.div`
  width: 30px;
  height: 30px;
  position: relative;
  cursor: pointer;
  svg {
    position: absolute;
    top: 9px;
    left: 7px;
    rotate: 180deg;
    transition: all 0.2s ease-in-out;
  }
  &.closed {
    svg {
      rotate: 0deg;
    }
  }
`;
