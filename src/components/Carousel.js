import Carousel from "@itseasy21/react-elastic-carousel";
import styled from "styled-components";
import SliderItem from "./SliderItem";

import React from "react";

const Slider = ({ title }) => {
  return (
    <CarouselContainer>
      <Title>{title}</Title>
      <Carousel itemsToShow={3}>
        <SliderItem></SliderItem>
        <SliderItem></SliderItem>
        <SliderItem></SliderItem>
        <SliderItem></SliderItem>
        <SliderItem></SliderItem>
        <SliderItem></SliderItem>
        <SliderItem></SliderItem>
        <SliderItem></SliderItem>
        <SliderItem></SliderItem>
        <SliderItem></SliderItem>
        <SliderItem></SliderItem>
        <SliderItem></SliderItem>
      </Carousel>
    </CarouselContainer>
  );
};

export default Slider;

const CarouselContainer = styled.div`
  padding-top: 40px;
  background-color: #6c5dd480;
  padding: 40px 20px 20px;
  border-radius: 30px;
  border: 1px solid transparent;
  width: 46%;
  position: relative;
  .rec-arrow-left {
    position: absolute;
    z-index: 1;
    top: 210px;
    left: 15px;
    background-color: white;
  }
  .rec-arrow-right {
    position: absolute;
    z-index: 1;
    top: 210px;
    right: 15px;
    background-color: white;
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
