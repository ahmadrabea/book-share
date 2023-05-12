import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header/Header";
import Slider from "../components/Carousel/Carousel";
import FeedCard from "../components/FeedCard/FeedCard";
import { Column, H2, Row, getCookie } from "../Utils/Utils";
import SearchInput from "../components/SearchInput/SearchInput";
import Select from "../components/Select/Select";
import StatusFilter from "../components/StatusFilter/StatusFilter";
import CategoryFilter from "../components/CategoryFilter/CategoryFilter";
import { ReactComponent as Arrow } from "../assets/icons/arrow.svg";
import Footer from "../components/Footer/Footer";
import { useRecoilState } from "recoil";
import Atoms from "../Atoms/Atoms";
import FeedCardEmpty from "../components/FeedCard/FeedCardEmpty";

const Home = () => {
  const [token, setToken] = useState(getCookie());
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useRecoilState(Atoms.cards);
  const dummyArray = [0, 0, 0, 0];

  useEffect(() => {
    console.log("scrolled");
    fetch("http://127.0.0.1:8000/list/", {
      method: "GET",
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCards(data);
      })
      .then(() => window.scrollTo(0, 0))
      .catch((error) => {
        console.log("someThing went wrong :", error);
      });
  }, []);

  useEffect(() => {
    setCards(filteredCards);
  }, [filteredCards]);

  // const applyFilterHandler = (categoryId) => {

  // };
  return (
    <>
      <Header></Header>
      <Container>
        <SliderWrapper>
          <Slider
            title={"Recommended For You"}
            colorClass="blue"
            type={"recommended"}
          />
          <Slider title={"Top Rated"} colorClass="orange" type={"topRated"} />
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
              <SearchInput page={"home"} />
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
              {!cards.length ? (
                <FeedCardEmpty />
              ) : (
                cards.map((item) => {
                  return (
                    <FeedCard
                      key={item.id}
                      category={item.book_id.categories_name}
                      avgRating={item.book_id.avg_rating}
                      numberRating={item.book_id.number_rating}
                      bookName={item.book_id.book_name}
                      publisher={item.book_id.publisher}
                      author={item.book_id.author}
                      description={item.book_id.description}
                      year={item.book_id.year}
                      bookOwnerId={item.book_owner_id.id}
                      fullName={item.book_owner_id.full_name}
                      userImageUrl={item.book_owner_id.user_image_url}
                      bookImageUrl={item.book_image_url}
                      status={item.status}
                    />
                  );
                })
              )}
              {/* <h3>See more</h3>
              <Arrow /> */}
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
