import { createContext, useState } from "react";

export const CartContext = createContext({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export default function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = () => {};
  const removeFromCart = () => {};
  const clearCart = () => {};

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
