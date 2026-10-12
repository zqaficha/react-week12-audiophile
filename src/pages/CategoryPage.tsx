import { useParams } from "react-router-dom";
import styled from "styled-components";
import products from "../data.json";
import ProductCard from "../components/ProductCard";
import CategoryLinks from "../components/CategoryLinks";
import BestGear from "../components/BestGear";

const Title = styled.div`
  background: #101010;
  color: white;
  text-align: center;
  padding: 64px 0;
  font-size: 32px;
  text-transform: uppercase;
  letter-spacing: 2px;
`;
const List = styled.div`
  padding: 80px 8% 0;
`;

export default function CategoryPage() {
  const { category } = useParams();

  const filtered = products
    .filter((p) => p.category === category)
    .sort((a, b) => Number(b.new) - Number(a.new));

  return (
    <>
      <Title>{category}</Title>
      <List>
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </List>

      <CategoryLinks />
      <BestGear />
    </>
  );
}
