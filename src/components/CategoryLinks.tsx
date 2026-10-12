import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Row = styled.section`
  display: flex;
  gap: 30px;
  padding: 120px 8% 0;
`;
const Box = styled.div`
  flex: 1;
  background: #f1f1f1;
  border-radius: 8px;
  padding: 0 24px 24px;
  text-align: center;
  cursor: pointer;
  img {
    width: 160px;
    margin-top: -40px;
  }
  h3 {
    font-size: 15px;
    letter-spacing: 1px;
    margin: 8px 0 12px;
  }
  p {
    color: #777;
    font-size: 13px;
    letter-spacing: 1px;
  }
  p img {
    width: 8px;
    margin: 0 0 0 10px;
  }
  &:hover {
    background: #e5e5e5;
  }
`;

export default function CategoryLinks() {
  const navigate = useNavigate();

  return (
    <Row>
      <Box onClick={() => navigate("/category/headphones")}>
        <img
          src="/images/image-category-thumbnail-headphones.png"
          alt="headphones"
        />
        <h3>HEADPHONES</h3>
        <p>
          SHOP
          <img src="/icons/icon-arrow-right.svg" alt="" />
        </p>
      </Box>
      <Box onClick={() => navigate("/category/speakers")}>
        <img
          src="/images/image-category-thumbnail-speakers.png"
          alt="speakers"
        />
        <h3>SPEAKERS</h3>
        <p>
          SHOP
          <img src="/icons/icon-arrow-right.svg" alt="" />
        </p>
      </Box>
      <Box onClick={() => navigate("/category/earphones")}>
        <img
          src="/images/image-category-thumbnail-earphones.png"
          alt="earphones"
        />
        <h3>EARPHONES</h3>
        <p>
          SHOP
          <img src="/icons/icon-arrow-right.svg" alt="" />
        </p>
      </Box>
    </Row>
  );
}
