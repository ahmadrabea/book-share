import styled from "styled-components";

export const setCookie = (token) => {
  document.cookie = `token=${token}`;
};

// Get the token from the cookie
export function getCookie() {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("=");
    if (cookie[0] === "token") {
      return cookie[1];
    }
  }
  return null;
}
// Delete the cookie by setting its expiry date to a date in the past
export function deleteCookie() {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  &.start {
    justify-content: flex-start;
  }
  &.alignedStart {
    align-items: flex-start;
  }
  &.end {
    justify-content: flex-end;
  }
`;
export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  &.start {
    align-items: flex-start;
  }
`;

export const H2 = styled.h2`
  color: black;
  font-size: 30px;
  font-weight: bold;
`;
