import React from "react";
import styled from "styled-components";
import Header from "../components/Header/Header";
import Slider from "../components/Carousel/Carousel";
import FeedCard from "../components/FeedCard/FeedCard";
import { Column, H2, Row } from "../Utils/Utils";
import SearchInput from "../components/SearchInput/SearchInput";
import Select from "../components/Select/Select";
import StatusFilter from "../components/StatusFilter/StatusFilter";
import CategoryFilter from "../components/CategoryFilter/CategoryFilter";
import { ReactComponent as Arrow } from "../assets/icons/arrow.svg";
import Footer from "../components/Footer/Footer";

const Home = () => {
  const dummyArray = [0, 0, 0, 0];
  return (
    <>
      <Header></Header>
      <Container>
        <SliderWrapper>
          <Slider title={"Recomended For You"} colorClass="blue" />
          <Slider title={"New Books"} colorClass="orange" />
        </SliderWrapper>

        <Wrapper>
          <Row className="start">
            <Column>
              <H2 style={{ width: "340px" }}>Filter Option</H2>
            </Column>
            <Column>
              <H2>Books</H2>
            </Column>
          </Row>
          <Row>
            <Column>
              <SearchInput />
            </Column>
            <Column>
              <Select />
            </Column>
          </Row>
          <Row className="alignedStart" style={{ marginTop: "20px" }}>
            <Column>
              <StatusFilter />
              <CategoryFilter />
            </Column>
            <Column>
              {dummyArray.map((item, index) => {
                return <FeedCard key={index} />;
              })}
              <h3>See more</h3>
              <Arrow />
            </Column>
          </Row>
        </Wrapper>
        {/* <FeedCard></FeedCard> */}
      </Container>

      <Footer />
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
  gap: 25px;
`;

const Wrapper = styled.div`
  padding: 0 36px;
  width: 1400px;
`;
