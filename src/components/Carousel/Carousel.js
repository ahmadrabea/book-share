import Carousel from "@itseasy21/react-elastic-carousel";
import styled from "styled-components";
import SliderItem from "./SliderItem";

import React, { useEffect, useState } from "react";
import { getCookie } from "../../Utils/Utils";

const Slider = ({ title, colorClass, type, bookId, setFlag }) => {
  const [token, setToken] = useState(getCookie());
  const [cards, setCards] = useState([]);

  useEffect(() => {
    let url;
    if (type === "recommended") {
      url = "http://127.0.0.1:8000/recommended-for-you/";
    } else if (type === "topRated") {
      url = "http://127.0.0.1:8000/top-rated/";
    } else if (type === "same") {
      url = `http://127.0.0.1:8000/book/${bookId}/same-book/`;
    } else if (type === "more") {
      url = `http://127.0.0.1:8000/book/${bookId}/more-like`;
    }

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCards(data);
      })
      .then(() => console.log(cards))
      .catch((error) => {
        console.log("someThing went wrong :", error);
      });
  }, [bookId]);
  return (
    <>
      {cards.length ? (
        <CarouselContainer className={colorClass}>
          <Title>{title}</Title>
          <Carousel itemsToShow={3}>
            {cards.map((item) => (
              <SliderItem
                title={item.book_name}
                cover={item.image_url}
                category={item.categories__category}
                key={item.user_book_id}
                bookId={item.user_book_id}
                setFlag={setFlag}
              />
            ))}
          </Carousel>
        </CarouselContainer>
      ) : (
        <p></p>
      )}
    </>
  );
};

export default Slider;

const CarouselContainer = styled.div`
  background-size: cover;
  padding-top: 40px;
  background-color: #6c5dd480;
  padding: 40px 20px 20px;
  border-radius: 60px;
  border: 1px solid transparent;
  width: 46%;
  position: relative;
  @media (max-width: 1350px) {
    width: 100%;
  }
  &.orange {
    background-image: url("/images/bg1.png");
  }
  &.blue {
    background-image: url("/images/bg2.png");
  }
  .rec-arrow-left {
    position: absolute;
    z-index: 1;
    top: 210px;
    left: 15px;
    background-color: white;
    padding-top: 3px;
    padding-right: 4px;
  }
  .rec-arrow-right {
    position: absolute;
    z-index: 1;
    top: 210px;
    right: 15px;
    background-color: white;
    padding-top: 3px;
    padding-left: 4px;
  }
  .rec-pagination {
    display: none;
  }
`;
const Title = styled.span`
  font-size: 30px;
  font-weight: 700;
  padding: 35px;
`;
