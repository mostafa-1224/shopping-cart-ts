import React, { createContext, useContext, useReducer } from 'react';

export interface Product {
  id: number;
  thumbnail: string;
  title: string;
  brand?: string;
  category?: string;
  description: string;
  rating?: number;
  price: number;
  discountPercentage?: number;
  count: number;
}

// interface CartState extends <Product> {}
type  CartState = Product[]

interface CartAction {
  type: string;
  payload: Product;
}

const ADD_PRODUCT = "ADD_PRODUCT";
const DELETE_PRODUCT = "DELETE_PRODUCT";
const EMPTY_CART = "EMPTY_CART";
const INCREASE_PRODUCT = "INCREASE_PRODUCT";
const DECREASE_PRODUCT = "DECREASE_PRODUCT";

const CartContext = createContext<{state: CartState, dispatch:React.Dispatch<CartAction>}>({state: [], dispatch: () => {}});

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case ADD_PRODUCT: {
      const index = state.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        let tempState = state;
        tempState[index].count += 1;
        return [
          ...tempState
        ];
      } else {
        action.payload.count = 1;
        return [
          ...state,
          action.payload
        ];
      }
    }
    case DELETE_PRODUCT: {
      const index = state.findIndex(item => item.id === action.payload.id);
      let tempState = state;
      tempState.splice(index, 1);
      return [
        ...tempState
      ];
    }
    case INCREASE_PRODUCT: {
      const index = state.findIndex(item => item.id === action.payload.id);
      let tempState = state;
      tempState[index].count += 1;
      return [
        ...tempState
      ];
    }
    case DECREASE_PRODUCT: {
      const index = state.findIndex(item => item.id === action.payload.id);
      let tempState = state;
      if (tempState[index].count > 1) {
        tempState[index].count -= 1;
        return [
          ...tempState
        ];
      }else {
        tempState.splice(index, 1);
        return [
          ...tempState
        ];
      }
    }
    case EMPTY_CART:
      return [];
    default:
      return state;
  }
};

interface CartContextProviderProps {
  children: React.ReactNode;
}

const CartContextProvider: React.FC<CartContextProviderProps> = ({ children }) => {

  const [state, dispatch] = useReducer(cartReducer, []);

  const cartContextStore = { state, dispatch }

  return <CartContext.Provider value={cartContextStore}>{children}</CartContext.Provider>
}

export const useCartContext = () => useContext(CartContext)

export default CartContextProvider;