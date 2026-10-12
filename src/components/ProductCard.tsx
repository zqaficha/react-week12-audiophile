import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import type { Product } from "../reducer";
import ProductImage from "./ProductImage";

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

const Card = styled.div`
  display: flex;
  gap: 64px;
  align-items: center;
  margin-bottom: 80px;
  &:nth-child(even) {
    flex-direction: row-reverse;
  }
`;
const Picture = styled.div`
  flex: 1;
`;
const Text = styled.div`
  flex: 1;
`;
const New = styled.p`
  color: #d87d4a;
  letter-spacing: 8px;
  font-size: 14px;
  margin-bottom: 16px;
`;
const Name = styled.h2`
  font-size: 36px;
  margin-bottom: 24px;
`;
const Desc = styled.p`
  color: #777;
  line-height: 1.6;
  margin-bottom: 24px;
`;

export default function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();

  return (
    <Card>
      <Picture>
        <ProductImage slug={product.slug} height={450} />
      </Picture>
      <Text>
        {product.new && <New>NEW PRODUCT</New>}
        <Name>{product.name}</Name>
        <Desc>{product.description}</Desc>
        <Button onClick={() => navigate(`/product/${product.slug}`)}>
          See product
        </Button>
      </Text>
    </Card>
  );
}
