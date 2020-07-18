import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

import AddItemForm from "./AddItemForm";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

function Menu({ items, type, addItem }) {
  return (
    <section className="col-md-4">
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">Menu</CardTitle>
          <CardText>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </CardText>
          <ListGroup>
            {items.map((item) => (
              <Link to={`/${type}/${item.id}`} key={item.id}>
                <ListGroupItem>{item.name}</ListGroupItem>
              </Link>
            ))}
          </ListGroup>
        </CardBody>
      </Card>
      <AddItemForm
        type={type === "snacks" ? "snacks" : "drinks"}
        addItem={addItem}
      />
    </section>
  );
}

export default Menu;
