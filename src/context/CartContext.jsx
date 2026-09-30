import {
  createContext,
  useContext,
  useReducer,
} from "react";

const CartContext = createContext();

const initialState = {
  cart: [],
  coupon: null,
};

// Reducer
function cartReducer(state, action) {
  switch (action.type) {

    // Add product
    case "ADD_TO_CART": {
      const existingProduct = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (existingProduct) {
        return {
          ...state,

          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          ),
        };
      }

      return {
        ...state,

        cart: [
          ...state.cart,
          {
            ...action.payload,
            quantity: 1,
          },
        ],
      };
    }

    // Increase quantity
    case "INCREASE_QUANTITY":
      return {
        ...state,

        cart: state.cart.map((item) =>
          item.id === action.payload
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        ),
      };

    // Decrease quantity
    case "DECREASE_QUANTITY":
      return {
        ...state,

        cart: state.cart
          .map((item) =>
            item.id === action.payload
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
              : item
          )
          .filter((item) => item.quantity > 0),
      };

    // Remove item
    case "REMOVE_ITEM":
      return {
        ...state,

        cart: state.cart.filter(
          (item) => item.id !== action.payload
        ),
      };

    // Apply coupon
    case "APPLY_COUPON":
      return {
        ...state,
        coupon: action.payload,
      };

    // Remove coupon
    case "REMOVE_COUPON":
      return {
        ...state,
        coupon: null,
      };

    default:
      return state;
  }
}

// Provider
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(
    cartReducer,
    initialState
  );

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom Hook
export function useCart() {
  return useContext(CartContext);
}
