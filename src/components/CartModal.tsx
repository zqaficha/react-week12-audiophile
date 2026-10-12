import type { Dispatch } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import type { Action, CartItem } from "../reducer";
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

const Background = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
  display: flex;
  justify-content: flex-end;
  padding: 100px 8% 0;
`;
const Box = styled.div`
  background: white;
  width: 380px;
  height: fit-content;
  padding: 32px;
  border-radius: 8px;
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;
const Info = styled.div`
  flex: 1;
  font-size: 14px;
`;
const Small = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  background: #f1f1f1;
`;
const Remove = styled.button`
  background: none;
  border: none;
  text-decoration: underline;
  color: #777;
`;
const Total = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 24px 0;
  font-weight: bold;
`;

type Props = { cart: CartItem[]; dispatch: Dispatch<Action> };

export default function CartModal({ cart, dispatch }: Props) {
  const navigate = useNavigate();
  let total = 0;
  for (const item of cart) total += item.price * item.qty;

  return (
    <Background onClick={() => dispatch({ type: "TOGGLE_CART" })}>
      <Box onClick={(e) => e.stopPropagation()}>
        <Top>
          <h3>CART ({cart.length})</h3>
          <Remove onClick={() => dispatch({ type: "CLEAR_CART" })}>
            Remove all
          </Remove>
        </Top>

        {cart.length === 0 && <p>კალათა ცარიელია</p>}

        {cart.map((item) => (
          <Row key={item.id}>
            <div style={{ width: 56 }}>
              <ProductImage slug={item.slug} height={56} />
            </div>
            <Info>
              <b>{item.name}</b>
              <p>$ {item.price}</p>
            </Info>
            <Small
              onClick={() =>
                dispatch({ type: "CHANGE_QTY", id: item.id, change: -1 })
              }
            >
              -
            </Small>
            <span>{item.qty}</span>
            <Small
              onClick={() =>
                dispatch({ type: "CHANGE_QTY", id: item.id, change: 1 })
              }
            >
              +
            </Small>
          </Row>
        ))}

        <Total>
          <span>TOTAL</span>
          <span>$ {total}</span>
        </Total>
        {cart.length > 0 && (
          <Button
            style={{ width: "100%" }}
            onClick={() => {
              dispatch({ type: "CLOSE_CART" });
              navigate("/checkout");
            }}
          >
            Checkout
          </Button>
        )}
      </Box>
    </Background>
  );
}
