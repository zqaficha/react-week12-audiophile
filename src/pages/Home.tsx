import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProductImage from "../components/ProductImage";
import CategoryLinks from "../components/CategoryLinks";
import BestGear from "../components/BestGear";

const Button = styled.button`
  background: #d87d4a;
  color: white;
  border: none;
  padding: 15px 32px;
  font-size: 13px;
  letter-spacing: 1px;
  text-transform: uppercase;
  &:hover {
    background: #fbaf85;
  }
`;

const Hero = styled.section`
  background: #101010;
  color: white;
  padding: 80px 8%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
`;
const HeroText = styled.div`
  flex: 1;
`;
const HeroImage = styled.div`
  width: 380px;
`;
const Small = styled.p`
  color: #777;
  letter-spacing: 10px;
  font-size: 14px;
  margin-bottom: 24px;
`;
const Big = styled.h1`
  font-size: 56px;
  max-width: 400px;
  margin-bottom: 24px;
`;
const Text = styled.p`
  color: #bbb;
  max-width: 380px;
  line-height: 1.6;
  margin-bottom: 32px;
`;

const Promo = styled.section`
  background: #d87d4a;
  color: white;
  margin: 120px 8% 0;
  padding: 48px 80px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const PromoTitle = styled.h2`
  font-size: 48px;
  max-width: 300px;
  margin-bottom: 24px;
`;

const Pair = styled.section`
  display: flex;
  gap: 30px;
  margin: 32px 8% 0;
`;
const Half = styled.div`
  flex: 1;
`;
const ZX7 = styled.div`
  flex: 1;
  background: #f1f1f1;
  border-radius: 8px;
  padding: 80px 64px;
  h2 {
    margin-bottom: 32px;
  }
`;

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Hero>
        <HeroText>
          <Small>NEW PRODUCT</Small>
          <Big>XX99 Mark II Headphones</Big>
          <Text>
            Experience natural, lifelike audio and exceptional build quality
            made for the passionate music enthusiast.
          </Text>
          <Button onClick={() => navigate("/product/xx99-mark-two-headphones")}>
            See product
          </Button>
        </HeroText>
        <HeroImage>
          <ProductImage slug="xx99-mark-two-headphones" height={450} />
        </HeroImage>
      </Hero>

      <CategoryLinks />

      <Promo>
        <div>
          <PromoTitle>ZX9 Speaker</PromoTitle>
          <Button
            style={{ background: "#101010" }}
            onClick={() => navigate("/product/zx9-speaker")}
          >
            See product
          </Button>
        </div>
        <div style={{ width: 280 }}>
          <ProductImage slug="zx9-speaker" height={320} />
        </div>
      </Promo>

      <Pair>
        <ZX7>
          <h2>ZX7 SPEAKER</h2>
          <Button
            style={{
              background: "none",
              border: "1px solid #101010",
              color: "#101010",
            }}
            onClick={() => navigate("/product/zx7-speaker")}
          >
            See product
          </Button>
        </ZX7>
        <Half>
          <ProductImage slug="yx1-earphones" height={320} />
        </Half>
      </Pair>

      <BestGear />
    </>
  );
}
