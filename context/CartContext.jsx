"use client";

import { Children, createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // set data to localStorage
  useEffect(() => {
    const cartLocal = JSON.parse(localStorage.getItem("cart"));
    if (cartLocal) {
      setCart(cartLocal);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(product) {
    setCart((prev) => {
      const selectedProduct = prev.find((item) => item._id === product._id);

      if (!selectedProduct) {
        return [...prev, { ...product, quantity: 1 }];
      } else {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
    });
  }

  function removeFromCart(productId) {
    setCart((prev) => prev.filter((product) => product._id !== productId));
  }

  function updateQuantity(productId, newQuantity) {
    setCart((prev) =>
      prev.map((product) =>
        product._id === productId
          ? { ...product, quantity: newQuantity }
          : product,
      ),
    );
  }

  function getTotal() {
    let totalPrice = 0;
    cart.map((product) => (totalPrice = totalPrice + product.price * product.quantity));
    return totalPrice;
  }

  function NumberOfProducts(){
    let number = 0;
    cart.map(product => number = number + product.quantity);
    return number;
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart , updateQuantity , getTotal , clearCart , NumberOfProducts }}
    >
      {children}
    </CartContext.Provider>
  );
}
