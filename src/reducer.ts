import data from "./data.json";

export type Product = (typeof data)[number];
export type CartItem = Product & { qty: number };

export type State = {
  cart: CartItem[];
  cartOpen: boolean;
  orderDone: boolean;
};

export type Action =
  | { type: "TOGGLE_CART" }
  | { type: "CLOSE_CART" }
  | { type: "ADD_TO_CART"; product: Product; qty: number }
  | { type: "CHANGE_QTY"; id: number; change: number }
  | { type: "CLEAR_CART" }
  | { type: "FINISH_ORDER" }
  | { type: "CLOSE_ORDER" };

export const startState: State = {
  cart: [],
  cartOpen: false,
  orderDone: false,
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "TOGGLE_CART":
      return { ...state, cartOpen: !state.cartOpen };
    case "CLOSE_CART":
      return { ...state, cartOpen: false };

    case "ADD_TO_CART": {
      const found = state.cart.find((item) => item.id === action.product.id);
      if (found) {
        const newCart = state.cart.map((item) =>
          item.id === found.id ? { ...item, qty: item.qty + action.qty } : item,
        );
        return { ...state, cart: newCart, cartOpen: true };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.product, qty: action.qty }],
        cartOpen: true,
      };
    }

    case "CHANGE_QTY": {
      const newCart = state.cart
        .map((item) =>
          item.id === action.id
            ? { ...item, qty: item.qty + action.change }
            : item,
        )
        .filter((item) => item.qty > 0);
      return { ...state, cart: newCart };
    }

    case "CLEAR_CART":
      return { ...state, cart: [] };
    case "FINISH_ORDER":
      return { ...state, orderDone: true };
    case "CLOSE_ORDER":
      return { ...state, orderDone: false, cart: [] };
    default:
      return state;
  }
}
