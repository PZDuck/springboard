import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ListItem = styled.div`
  margin: 1.5rem;
  width: 23%;
  border-radius: 10px;
  transition: all 0.2s ease-in-out;
  padding: 1rem 0;

  a {
    text-decoration: none;
    font-size: 24px;
    color: black;
  }

  &:hover {
    background-color: rgb(255, 105, 125);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 10vw;
  object-fit: contain;
`;

function ProductList() {
  const products = useSelector((state) => state.products);
  const productCards = Object.keys(products).map((id) => (
    <ListItem key={id}>
      <Link to={`/products/${id}`}>
        <Image src={products[id].image_url}></Image>
        {products[id].name}
      </Link>
    </ListItem>
  ));

  return (
    <div>
      <h4>Look at all of our beautiful products!</h4>
      <List>{productCards}</List>
    </div>
  );
}

export default ProductList;
