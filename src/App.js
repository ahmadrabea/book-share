import styled from "styled-components";
import Header from "./components/Header";
import "./App.css";
import Slider from "./components/Carousel";

function App() {
  return (
    <div>
      <Header></Header>
      <Container>
        <SliderWrapper>
          <Slider title={"Recomended For You"} colorClass="blue" />
          <Slider title={"New Books"} colorClass="orange" />
        </SliderWrapper>
      </Container>
    </div>
  );
}

export default App;

const SliderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding: 0 36px;
  width: 1400px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
