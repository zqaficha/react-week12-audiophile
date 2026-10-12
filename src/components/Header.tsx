import type { Dispatch } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import type { Action } from "../reducer";

const Bar = styled.header`
  background: #101010;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 8%;
  border-bottom: 1px solid #333;
`;
const Nav = styled.nav`
  display: flex;
  gap: 32px;
`;
const Item = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-size: 13px;
  letter-spacing: 2px;
  text-transform: uppercase;
  &:hover {
    color: #d87d4a;
  }
  &.active {
    color: #d87d4a;
  }
`;
const CartButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

type Props = { dispatch: Dispatch<Action>; cartCount: number };

export default function Header({ dispatch, cartCount }: Props) {
  return (
    <Bar>
      <Link to="/">
        <img src="/icons/logo.svg" alt="audiophile" />
      </Link>
      <Nav>
        <Item to="/" end>
          Home
        </Item>
        <Item to="/category/headphones">Headphones</Item>
        <Item to="/category/speakers">Speakers</Item>
        <Item to="/category/earphones">Earphones</Item>
      </Nav>
      <CartButton onClick={() => dispatch({ type: "TOGGLE_CART" })}>
        <img src="/icons/icon-cart.svg" alt="cart" />
        {cartCount}
      </CartButton>
    </Bar>
  );
}
