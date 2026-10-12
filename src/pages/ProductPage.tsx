import { useReducer, type Dispatch } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import products from "../data.json";
import type { Action } from "../reducer";
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

const Wrap = styled.div`
  padding: 40px 8% 0;
`;
const Back = styled.button`
  background: none;
  border: none;
  color: #777;
  margin-bottom: 32px;
`;
const Top = styled.div`
  display: flex;
  gap: 64px;
  align-items: center;
`;
const Half = styled.div`
  flex: 1;
`;
const New = styled.p`
  color: #d87d4a;
  letter-spacing: 8px;
  font-size: 14px;
  margin-bottom: 16px;
`;
const Price = styled.p`
  font-weight: bold;
  margin: 24px 0;
  font-size: 18px;
`;
const Desc = styled.p`
  color: #777;
  line-height: 1.6;
  margin-top: 24px;
`;
const Buy = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;
const Counter = styled.div`
  background: #f1f1f1;
  display: flex;
  gap: 20px;
  padding: 15px 20px;
  button {
    background: none;
    border: none;
    font-size: 16px;
  }
`;
const Middle = styled.div`
  display: flex;
  gap: 120px;
  margin-top: 100px;
`;
const Features = styled.div`
  flex: 2;
  p {
    color: #777;
    line-height: 1.7;
    white-space: pre-line;
    margin-top: 24px;
  }
`;
const Includes = styled.div`
  flex: 1;
  li {
    list-style: none;
    margin-top: 12px;
    color: #777;
  }
  b {
    color: #d87d4a;
    margin-right: 16px;
  }
`;
const Others = styled.div`
  margin-top: 100px;
  text-align: center;
`;
const OthersRow = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 40px;
`;
const OtherItem = styled.div`
  flex: 1;
  h3 {
    margin: 24px 0;
  }
`;

function qtyReducer(qty: number, action: "plus" | "minus") {
  if (action === "plus") return qty + 1;
  return qty > 1 ? qty - 1 : 1;
}

export default function ProductPage({
  dispatch,
}: {
  dispatch: Dispatch<Action>;
}) {
  const [qty, qtyDispatch] = useReducer(qtyReducer, 1);
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.slug === slug);

  if (!product) return <Wrap>პროდუქტი ვერ მოიძებნა</Wrap>;

  return (
    <Wrap>
      <Back onClick={() => navigate(-1)}>← Go back</Back>

      <Top>
        <Half>
          <ProductImage slug={product.slug} height={500} />
        </Half>
        <Half>
          {product.new && <New>NEW PRODUCT</New>}
          <h1>{product.name}</h1>
          <Desc>{product.description}</Desc>
          <Price>$ {product.price}</Price>
          <Buy>
            <Counter>
              <button onClick={() => qtyDispatch("minus")}>-</button>
              <span>{qty}</span>
              <button onClick={() => qtyDispatch("plus")}>+</button>
            </Counter>
            <Button
              onClick={() => dispatch({ type: "ADD_TO_CART", product, qty })}
            >
              Add to cart
            </Button>
          </Buy>
        </Half>
      </Top>

      <Middle>
        <Features>
          <h2>FEATURES</h2>
          <p>{product.features}</p>
        </Features>
        <Includes>
          <h2>IN THE BOX</h2>
          <ul>
            {product.includes.map((i) => (
              <li key={i.item}>
                <b>{i.quantity}x</b>
                {i.item}
              </li>
            ))}
          </ul>
        </Includes>
      </Middle>

      <Others>
        <h2>YOU MAY ALSO LIKE</h2>
        <OthersRow>
          {product.others.map((o) => (
            <OtherItem key={o.slug}>
              <ProductImage slug={o.slug} height={300} />
              <h3>{o.name}</h3>
              <Button onClick={() => navigate(`/product/${o.slug}`)}>
                See product
              </Button>
            </OtherItem>
          ))}
        </OthersRow>
      </Others>

      <CategoryLinks />
      <BestGear />
    </Wrap>
  );
}
