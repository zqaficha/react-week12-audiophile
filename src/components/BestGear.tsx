import styled from "styled-components";

const Gear = styled.section`
  display: flex;
  gap: 64px;
  align-items: center;
  padding: 120px 8% 0;
`;
const Text = styled.div`
  flex: 1;
  h2 {
    font-size: 40px;
    margin-bottom: 24px;
  }
  span {
    color: #d87d4a;
  }
  p {
    color: #777;
    line-height: 1.7;
  }
`;
const Photo = styled.img`
  flex: 1;
  width: 50%;
  border-radius: 8px;
  object-fit: cover;
`;

export default function BestGear() {
  return (
    <Gear>
      <Text>
        <h2>
          Bringing you the <span>best</span> audio gear
        </h2>
        <p>
          Located at the heart of New York City, Audiophile is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </p>
      </Text>
      <Photo src="/images/image-best-gear.jpg" alt="best gear" />
    </Gear>
  );
}
