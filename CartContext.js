// src/context/CartContext.js
import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Optional: Load cart from localStorage on initial load
    try {
      const localData = localStorage.getItem('zardoziCart');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Could not parse cart from localStorage", error);
      return [];
    }
  });

  // Optional: Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('zardoziCart', JSON.stringify(cartItems));
    } catch (error) {
      console.error("Could not save cart to localStorage", error);
    }
    console.log('Cart Items (from context effect):', cartItems); // For debugging
  }, [cartItems]);

  const addItemToCart = useCallback((product, quantityToAdd = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantityToAdd } : item
        );
      }
      // Define the structure of your cart item here
      // Ensure it includes all fields needed by CartPage.js
      return [...prevItems, {
        id: product.id,
        name: product.name,
        price: product.price,
        imageSrc: product.image, // From products.json's 'image' field
        imageAlt: product.name,
        quantity: quantityToAdd,
        // Optional fields that CartPage.js might use:
        href: `/products/${product.id}`, // Example link to a product detail page
        color: product.color || 'N/A',   // If products have color, ensure it's in products.json
        size: product.size || 'N/A',     // If products have size
        brand: product.brand || 'Zardozi80',
        styleInfo: product.styleInfo || `SKU-${product.id}`,
        // For gift options, if you want them global:
        giftBoxAdded: false,
        giftMessage: '',
      }];
    });
  }, []);

  const removeItemFromCart = useCallback((productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  }, []);

  const updateItemQuantity = useCallback((productId, newQuantity) => {
    setCartItems(prevItems => {
      if (newQuantity < 1) {
        return prevItems.filter(item => item.id !== productId); // Remove if quantity is 0 or less
      }
      return prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Functions to handle gift options if they are part of the global cart item
  const toggleGiftOption = useCallback((productId) => {
     setCartItems(prevItems =>
         prevItems.map(item =>
             item.id === productId ? { ...item, giftBoxAdded: !item.giftBoxAdded, giftMessage: !item.giftBoxAdded ? '' : item.giftMessage } : item
         )
     );
  }, []);

  const updateGiftMessage = useCallback((productId, message) => {
     setCartItems(prevItems =>
         prevItems.map(item =>
             item.id === productId ? { ...item, giftMessage: message } : item
         )
     );
  }, []);


  return (
    <CartContext.Provider value={{
        cartItems,
        addItemToCart,
        removeItemFromCart,
        updateItemQuantity,
        clearCart,
        toggleGiftOption,    // Expose gift functions
        updateGiftMessage    // Expose gift functions
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};