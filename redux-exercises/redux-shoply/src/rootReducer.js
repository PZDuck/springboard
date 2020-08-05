import { ADD_ITEM, REMOVE_ITEM, DISCOUNT } from "./actionTypes";
import data from "./data.json";

const discounts = {
  REMOVE10: 0.1,
  REMOVE20: 0.2,
  REMOVE30: 0.3,
};

const INITIAL_STATE = {
  products: data.products,
  cartItems: {},
  cartValue: 0,
  discountApplied: false,
  discountAmount: 0,
};

function rootReducer(state = INITIAL_STATE, action) {
  console.log("STORE CREATED", state);
  switch (action.type) {
    case ADD_ITEM: {
      const cart = { ...state.cartItems };

      cart[action.id] ? (cart[action.id] += 1) : (cart[action.id] = 1);

      let total = Object.keys(cart).reduce(
        (acc, currItem) =>
          (acc += state.products[currItem].price * cart[currItem]),
        0
      );

      return {
        ...state,
        cartItems: cart,
        cartValue: total.toFixed(2),
      };
    }

    case REMOVE_ITEM: {
      const cart = { ...state.cartItems };

      if (!cart[action.id]) return state;
      cart[action.id]--;

      if (cart[action.id] === 0) {
        delete cart[action.id];
      }

      let total = Object.keys(cart).reduce(
        (acc, currItem) =>
          (acc += state.products[currItem].price * cart[currItem]),
        0
      );

      return {
        ...state,
        cartItems: cart,
        cartValue: total,
      };
    }

    case DISCOUNT: {
      const cart = { ...state.cartItems };

      if (state.discountApplied === false && discounts[action.discount]) {
        const discountAmount = discounts[action.discount];

        let total =
          Object.keys(cart).reduce(
            (acc, currItem) =>
              (acc += state.products[currItem].price * cart[currItem]),
            0
          ) *
          (1 - discountAmount);

        return {
          ...state,
          cartValue: total.toFixed(2),
          discountApplied: true,
          discountAmount,
        };
      }
      return state;
    }

    default:
      return state;
  }
}

export default rootReducer;
