import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrap = styled.footer`
  background: #101010;
  color: #aaa;
  padding: 64px 8% 48px;
  margin-top: 120px;
  border-top: 4px solid #d87d4a;
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 36px;
`;
const Nav = styled.nav`
  display: flex;
  gap: 32px;
`;
const NavLinkItem = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 13px;
  letter-spacing: 2px;
  text-transform: uppercase;
  &:hover {
    color: #d87d4a;
  }
`;
const Text = styled.p`
  max-width: 540px;
  line-height: 1.7;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 24px;
`;
const Social = styled.div`
  display: flex;
  gap: 16px;
`;

export default function Footer() {
  return (
    <Wrap>
      <Top>
        <Link to="/">
          <img src="/icons/logo.svg" alt="audiophile" />
        </Link>
        <Nav>
          <NavLinkItem to="/">Home</NavLinkItem>
          <NavLinkItem to="/category/headphones">Headphones</NavLinkItem>
          <NavLinkItem to="/category/speakers">Speakers</NavLinkItem>
          <NavLinkItem to="/category/earphones">Earphones</NavLinkItem>
        </Nav>
      </Top>

      <Text>
        Audiophile is an all in one stop to fulfill your audio needs. We're a
        small team of music lovers and sound specialists who are devoted to
        helping you get the most out of personal audio. Come and visit our demo
        facility - we're open 7 days a week.
      </Text>

      <Bottom>
        <p>Copyright 2026. All Rights Reserved</p>
        <Social>
          <img src="/icons/icon-facebook.svg" alt="facebook" />
          <img src="/icons/icon-twitter.svg" alt="twitter" />
          <img src="/icons/icon-instagram.svg" alt="instagram" />
        </Social>
      </Bottom>
    </Wrap>
  );
}
