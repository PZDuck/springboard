import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addDiscount } from "./actions";
import styled from "styled-components";

const CartList = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
`;

const CartItem = styled.div`
  border: 1px solid black;
  border-radius: 5px;

  span {
    display: block;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 5vw;
  object-fit: contain;
`;

function Cart() {
  const [discount, setDiscount] = useState("");
  const dispatch = useDispatch();
  const {
    cartItems,
    cartValue,
    discountAmount,
    discountApplied,
    products,
  } = useSelector((state) => state);

  const handleChange = (event) => {
    setDiscount(event.target.value);
  };

  const handleDiscount = (event) => {
    event.preventDefault();
    dispatch(addDiscount(discount));
    setDiscount("");
  };

  return Object.keys(cartItems).length === 0 ? (
    <h2>No items in cart yet!</h2>
  ) : (
    <>
      <CartList>
        {Object.keys(cartItems).map((id) => (
          <CartItem>
            <Image src={products[id].image_url} />
            <Link to={`/products/${id}`}>{products[id].name}</Link>
            <span className="price">${products[id].price}</span>
            <span className="qty">Quantity: {cartItems[id]}</span>
          </CartItem>
        ))}
      </CartList>

      <p>
        Total: ${cartValue}
        {discountApplied ? (
          <span className="text-success">
            - You saved {(discountAmount * 100).toFixed(0)}%!
          </span>
        ) : null}
      </p>
      <form onSubmit={handleDiscount} className="form-inline">
        <label htmlFor="discount">Discount:</label>
        <input
          id="discount"
          value={discount}
          onChange={handleChange}
          name="discount"
          type="text"
          className="form-control ml-2 mr-2"
        />
        <button className="btn btn-primary">Apply Discount</button>
      </form>
    </>
  );
}

export default Cart;
