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
import BookCard from "../components/FeedCard/BookCard";
import { useNavigate, useParams } from "react-router-dom";

const BookPage = () => {
  //   const bookInfo = {
  //     id: 1,
  //     book_id: {
  //       id: 1,
  //       avg_rating: "0",
  //       number_rating: "0",
  //       categories_name: ["tech", "AI"],
  //       book_name: "Hands-On Machine Learning",
  //       author: "Aurelien Geron",
  //       publisher: "O'Reilly Media",
  //       description:
  //         "Hands-On Machine Learning with ScikitLearn, Keras, and TensorFlow is a book written by Aurélien Géron. The book provides a comprehensive introduction to machine learning and deep learning technique",
  //       ISBN: 1254982,
  //       year: 2022,
  //     },
  //     book_owner_id: {
  //       id: 4,
  //       full_name: "Ali Samr",
  //       user_image_url: "https://octopus-app-lk2sv.ondigitalocean.app/media/default_user.png",
  //     },
  //     book_image_url: "https://octopus-app-lk2sv.ondigitalocean.app/media/default_book.png",
  //     status: true,
  //   };
  const [token, setToken] = useState(getCookie());
  const [bookRating, setBookRating] = useState();
  const [bookId, setBookId] = useState();
  const [bookInfo, setBookInfo] = useState();
  const [flagg, setFlagg] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  });
  //   const { bookId } = useParams();
  const setFlag = () => {
    setFlagg(!flagg);
  };
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const bookId = urlParams.get("bookId");
    setBookId(bookId);
    console.log("userID :", bookId);
    fetch(`https://octopus-app-lk2sv.ondigitalocean.app/book/${bookId}/`, {
      method: "GET",
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBookInfo(data);
      })
      .then(() => window.scrollTo(0, 0))
      .catch((error) => {
        console.log("someThing went wrong :", error);
      });
  }, [flagg]);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const bookId = urlParams.get("bookId");
    fetch(
      `https://octopus-app-lk2sv.ondigitalocean.app/book/${bookId}/get-rating/`,
      {
        method: "GET",
        headers: {
          Authorization: `token ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setBookRating(data);
      })
      .catch((error) => {
        console.log("someThing went wrong :", error);
      });
  }, [flagg]);

  const createRate = () => {
    const rating = document.querySelectorAll(".theStars .star.filled").length;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const bookId = urlParams.get("bookId");
    fetch(
      `https://octopus-app-lk2sv.ondigitalocean.app/book/${bookId}/create-rating/`,
      {
        method: "POST",
        headers: {
          Authorization: `token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: rating,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => setBookRating(data))
      .catch((error) => {
        console.log("someThing went wrong :", error);
      });
  };

  return (
    <>
      <Header></Header>

      <Container>
        <MainWrapper></MainWrapper>

        <Wrapper>
          <Row className="alignedStart" style={{ marginTop: "20px" }}>
            <Column>
              {bookInfo && bookRating && (
                <BookCard
                  bookId={bookInfo.id}
                  category={bookInfo.book_id.categories_name}
                  avgRating={bookRating.avg_rating}
                  numberRating={bookRating.number_rating}
                  bookName={bookInfo.book_id.book_name}
                  publisher={bookInfo.book_id.publisher}
                  author={bookInfo.book_id.author}
                  description={bookInfo.book_id.description}
                  year={bookInfo.book_id.year}
                  bookOwnerId={bookInfo.book_owner_id.id}
                  fullName={bookInfo.book_owner_id.full_name}
                  userImageUrl={bookInfo.book_owner_id.user_image_url}
                  bookImageUrl={bookInfo.book_image_url}
                  status={bookInfo.status}
                  createRate={createRate}
                />
              )}
              {/* <h3>See more</h3>
              <Arrow /> */}
            </Column>
          </Row>
        </Wrapper>
        {/* <FeedCard></FeedCard> */}

        {bookId && (
          <SliderWrapper>
            <Slider
              title={"Same book in other libraries"}
              colorClass="orange"
              type={"same"}
              bookId={bookId}
              setFlag={setFlag}
              flag={flagg}
            />
            <Slider
              title={"More like this"}
              colorClass="blue"
              type={"more"}
              bookId={bookId}
              setFlag={setFlag}
              flag={flagg}
            />
          </SliderWrapper>
        )}
      </Container>

      <Footer />
    </>
  );
};

export default BookPage;

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
const MessageButton = styled.button`
  width: 100px;
  border: none;
  border-radius: 15px;
  color: black;
  background-color: #f0edfd;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  padding: 10px;
`;
const CallButton = styled.button`
  width: 100px;
  border: none;
  border-radius: 15px;
  color: black;
  background-color: #f0edfd;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  padding: 10px;
`;
