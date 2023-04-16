import React, { useState } from "react";
import { ReactComponent as Star } from "../../assets/icons/star.svg";

function StarIcon({ filled, onClick }) {
  return (
    <Star className={`star ${filled ? "filled" : "blank"}`} onClick={onClick} />
  );
}

function RatingStars({ initialRating }) {
  const [rating, setRating] = useState(initialRating);
  const stars = [];
  for (let i = 0; i < 10; i++) {
    stars.push(
      <StarIcon key={i} filled={i < rating} onClick={() => setRating(i + 1)} />
    );
  }

  return <div>{stars}</div>;
}

export default RatingStars;
