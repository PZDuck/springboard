import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  position: relative;
  top: 0;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  background-color: skyblue;

  ul {
    list-style-type: none;
    display: flex;
    padding: 1.5rem;

    li {
      margin: 0 0.5rem;
    }
  }
`;

const NavLogo = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 24px;
  padding: 2rem;
`;

const NavCart = styled(Link)`
  text-decoration: none;
  color: white;
  border: 1px solid white;
  padding: 0.1rem 0.5rem;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: palevioletred;
    border-color: palevioletred;
  }
`;

function NavBar() {
  const itemCount = useSelector((state) =>
    Object.keys(state.cartItems).reduce(
      (acc, item) => (acc += state.cartItems[item]),
      0
    )
  );
  const cartValue = useSelector((state) => state.cartValue);

  return (
    <Nav>
      <NavLogo to="/">SHOPLY!</NavLogo>
      <ul className="navbar-nav flex-row">
        <li className="nav-item pr-3">
          <span className="navbar-text text-light">
            {itemCount} items (${cartValue})
          </span>
        </li>
        <li className="nav-item">
          <NavCart to="/cart">See Cart</NavCart>
        </li>
      </ul>
    </Nav>
  );
}

export default NavBar;
