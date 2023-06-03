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
import colors from "../assets/colors";
import { ReactComponent as Star } from "../assets/icons/star.svg";
import { ReactComponent as Location } from "../assets/icons/location.svg";
import { ReactComponent as MailIcon } from "../assets/icons/mail.svg";
import { ReactComponent as CallIcon } from "../assets/icons/call.svg";
import RatingStars from "../components/helper/StarsRating";
import { useRecoilState } from "recoil";
import Atoms from "../Atoms/Atoms";
import FeedCardEmpty from "../components/FeedCard/FeedCardEmpty";
import { useNavigate } from "react-router-dom";

const LibraryPage = () => {
  const [token, setToken] = useState(getCookie());
  const [userData, setUserData] = useState();
  const [userRating, setUserRating] = useState();
  const [cards, setCards] = useState([]);
  const [userId, setUserId] = useState();
  const [filteredCards, setFilteredCards] = useRecoilState(Atoms.cards);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  });

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const userId = urlParams.get("userid");
    setUserId(userId);
    console.log("userID :", userId);
    fetch(`http://127.0.0.1:8000/account/${userId}/`, {
      method: "GET",
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.log("someThing went wrong :", error);
      });
  }, []);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const userId = urlParams.get("userid");
    fetch(`http://127.0.0.1:8000/library/${userId}/get-rating/`, {
      method: "GET",
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserRating(data);
      })
      .catch((error) => {
        console.log("someThing went wrong :", error);
      });
  }, []);

  useEffect(() => {
    document.querySelectorAll(".theStars .star").forEach((star, idx) => {
      if (idx < userRating?.user_rating) {
        star.classList.add("filled");
        star.classList.remove("blank");
      }
    });
  }, [userRating]);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const userId = urlParams.get("userid");
    window.scrollTo(0, 0);
    fetch(`http://127.0.0.1:8000/library/${userId}/`, {
      method: "GET",
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCards(data);
      })
      .catch((error) => {
        console.log("someThing went wrong :", error);
      });
  }, []);
  useEffect(() => {
    setCards(filteredCards);
  }, [filteredCards]);

  const createRate = () => {
    const rating = document.querySelectorAll(".theStars .star.filled").length;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const userId = urlParams.get("userid");

    fetch(`http://127.0.0.1:8000/library/${userId}/create-rating/`, {
      method: "POST",
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating: rating,
      }),
    })
      .then((res) => res.json())
      .then((data) => setUserRating(data))
      .catch((error) => {
        console.log("someThing went wrong :", error);
      });
  };

  return (
    <>
      <Header></Header>
      <Cover>
        <img src={userData?.user_image_url} />
        <H2 className="name">{userData?.full_name}</H2>
        <Row className="buttons">
          <MessageButton href={`mailto:${userData?.email}`}>
            <MailIcon />
          </MessageButton>
          <CallButton href={`tel:${userData?.phone_number}`}>
            <CallIcon />
          </CallButton>
        </Row>
      </Cover>
      <Container>
        <MainWrapper>
          <Row>
            <RatingBox>
              <Row>
                <Column className="star">
                  <Star />
                </Column>
                <Column className="start">
                  <span className="rate">
                    <span className="user-rate">{userRating?.avg_rating}</span>
                    /10
                  </span>

                  <span className="number-of-ratings">
                    {userRating?.number_rating}
                  </span>
                </Column>
              </Row>
              <Row>
                <RatingStars initialRating={0} />
              </Row>
              <RateButton onClick={createRate}>Rate</RateButton>
            </RatingBox>
            <AboutBox>
              <Column className="start">
                <H2>About</H2>

                <p>{userData?.about}</p>
                <Row>
                  <Location />
                  <span>{userData?.address}</span>
                </Row>
              </Column>
            </AboutBox>
          </Row>
        </MainWrapper>

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
              <SearchInput page={"library"} id={userId} />
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
                      bookId={item.id}
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

export default LibraryPage;

const Cover = styled.div`
  background-image: url("/images/Banner.png");
  height: 267px;
  position: relative;
  margin-top: -171px;
  margin-bottom: 100px;
  img {
    position: absolute;
    top: 215px;
    left: 310px;
    height: 100px;
    width: 100px;
    border-radius: 15px;
    aspect-ratio: 1;
    object-fit: cover;
  }
  h2 {
    position: absolute;
    top: 254px;
    left: 431px;
  }
  .buttons {
    position: absolute;
    top: 273px;
    right: 325px;
    gap: 10px;
  }
`;
const MainWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 30px;
  padding: 0 36px;
  width: 1400px;
  @media (max-width: 1350px) {
    flex-direction: column;
    width: 100%;
  }
`;
const RatingBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 20px 10px;
  margin-right: 30px;
  border-radius: 15px;
  border: 1px solid ${colors.lightGray};
  .user-rate {
    font-weight: bold;
    font-size: 25px;
    color: black;
  }
  .rate {
    font-size: 20px;
    color: ${colors.lightGray};
  }
  .value {
    font-size: 16px;
    color: black;
  }
  .number-of-ratings {
    font-size: 14px;
    color: ${colors.lightGray};
  }
  .star {
    padding-bottom: 10px;
    padding-right: 7px;
  }
  .blank {
    width: 22px;
    cursor: pointer;
    &.hovered {
      path {
        fill: #ff764b;
      }
    }
    path {
      fill: ${colors.lightGray};
    }
  }
  .filled {
    width: 22px;
    cursor: pointer;
  }
`;
const AboutBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  padding: 20px 20px;
  width: 1000px;
  max-height: 166px;
  height: 166px;
  min-height: 166px;
  border-radius: 15px;
  border: 1px solid ${colors.lightGray};
  p {
    line-height: 1.7;
    font-size: 14px;
  }
  h2 {
    margin: 10px 0px;
  }
  svg {
    margin-right: 10px;
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
const RateButton = styled.button`
  width: 100px;
  border: none;
  border-radius: 15px;
  color: black;
  background-color: ${colors.lightGray};
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  padding: 12px;
`;
const MessageButton = styled.a`
  width: 100px;
  border: none;
  border-radius: 15px;
  color: black;
  background-color: #f0edfd;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  padding: 10px;
  text-align: center;
`;
const CallButton = styled.a`
  width: 100px;
  border: none;
  border-radius: 15px;
  color: black;
  background-color: #f0edfd;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  padding: 10px;
  text-align: center;
`;
