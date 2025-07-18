import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const response = await axios.get('http://localhost:5000/cart');
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  useEffect(() => {
    fetchCart();  
  }, []);

  const addToCart = async (product) => {
    try {
      const existingProduct = cart.find((item) => item.id === product.id);
      if (existingProduct) {
        await axios.put(`http://localhost:5000/cart/${product.id}`, {
          ...existingProduct,
          quantity: existingProduct.quantity + 1,
        });
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        const newProduct = { ...product, quantity: 1 };
        await axios.post('http://localhost:5000/cart', newProduct);
        setCart((prevCart) => [...prevCart, newProduct]);
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const removeFromCart = async (product) => {
    try {
      await axios.delete(`http://localhost:5000/cart/${product.id}`);
      setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };

  const decreaseQuantity = async (product) => {
    try {
      const existingProduct = cart.find((item) => item.id === product.id);
      if (existingProduct && existingProduct.quantity > 1) {
        await axios.put(`http://localhost:5000/cart/${product.id}`, {
          ...existingProduct,
          quantity: existingProduct.quantity - 1,
        });
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        );
      } else {
        // Prevent going below 1
        console.warn("Quantity cannot be less than 1.");
      }
    } catch (error) {
      console.error('Error decreasing product quantity:', error);
    }
  };

  const isInCart = (productId) => cart.some((item) => item.id === productId);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, decreaseQuantity, isInCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
