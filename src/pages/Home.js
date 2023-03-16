import React from "react";
import styled from "styled-components";
import Header from "../components/Header/Header";
import Slider from "../components/Carousel/Carousel";
import FeedCard from "../components/FeedCard/FeedCard";

const Home = () => {
  return (
    <>
      <Header></Header>
      <Container>
        <SliderWrapper>
          <Slider title={"Recomended For You"} colorClass="blue" />
          <Slider title={"New Books"} colorClass="orange" />
        </SliderWrapper>

        <FeedCard></FeedCard>
      </Container>
    </>
  );
};

export default Home;

const SliderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding: 0 36px;
  width: 1400px;
  @media (max-width: 1350px) {
    flex-direction: column;
    width: 100%;
  }
`;

const Container = styled.div`
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 100px;
`;
