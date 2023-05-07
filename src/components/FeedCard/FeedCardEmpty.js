import React from "react";
import styled from "styled-components";
import colors from "../../assets/colors";
import { H2 } from "../../Utils/Utils";

const FeedCardEmpty = () => {
  return (
    <FeedCardContainer>
      <H2 className="no-results">No Results Found</H2>
    </FeedCardContainer>
  );
};

export default FeedCardEmpty;

const FeedCardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 1056px;
  border-radius: 25px;
  border: 1px solid ${colors.lightGray};
  margin-bottom: 15px;
  .no-results {
    color: ${colors.secondary};
  }
`;
