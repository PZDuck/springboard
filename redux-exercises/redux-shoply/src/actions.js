import { ADD_ITEM, REMOVE_ITEM, DISCOUNT } from "./actionTypes";

export function addItem(id) {
  return {
    type: ADD_ITEM,
    id,
  };
}

export function removeItem(id) {
  return {
    type: REMOVE_ITEM,
    id,
  };
}

export function addDiscount(discount) {
  return { type: DISCOUNT, discount };
}
