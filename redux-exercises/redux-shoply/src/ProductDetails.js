import React from "react";
import { Link, useParams } from "react-router-dom";
import { addItem, removeItem } from "./actions";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

const ItemCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 33vw;
  margin: 0 auto;
`;

const ItemCardBody = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 105, 125, 0.8);
  border-radius: 0 0 10px 10px;
  color: white;
  padding: 0 1rem;
  width: 100%;
  border: 1px solid rgb(255, 105, 125);
  border-top: 0;

  h2 {
    margin-bottom: 0;
  }

  span {
    padding-bottom: 0.5rem;
    border-bottom: 1px solid white;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 20vw;
  object-fit: contain;
  padding: 0 1rem;
  border-radius: 10px 10px 0 0;
  border: 1px solid rgb(255, 105, 125);
`;

const ReturnBtn = styled(Link)`
  display: inline-block;
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: black;
  border: 1px solid rgb(255, 105, 125);
  border-radius: 3px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: rgb(255, 105, 125);
  }
`;

function ProductDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const add = () => dispatch(addItem(id));
  const remove = () => dispatch(removeItem(id));
  const { image_url, name, price, description } = useSelector((state) => ({
    ...state.products[id],
  }));

  return (
    <>
      <ItemCard>
        <Image src={image_url} alt={name} />
        <ItemCardBody>
          <h2>{name}</h2>
          <span className="price">${price}</span>
          <p className="description">{description}</p>
          <button onClick={add}>Add</button>
          <button onClick={remove}>Remove</button>
        </ItemCardBody>
      </ItemCard>

      <ReturnBtn to="/">Go back</ReturnBtn>
    </>
  );
}

export default ProductDetails;
