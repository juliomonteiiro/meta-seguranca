// CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    // Função para adicionar item ao carrinho
    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const itemIndex = prevItems.findIndex((item) => item.id === product.id);

            if (itemIndex >= 0) {
                // Se o item já existir, incrementar a quantidade
                const updatedItems = [...prevItems];
                updatedItems[itemIndex].quantity += product.quantity; // Acrescenta a nova quantidade
                return updatedItems;
            }
            // Se o item não existir, adicionamos como novo item
            return [...prevItems, { ...product, quantity: product.quantity }];
        });
    };

    // Função para remover o item do carrinho
    const removeFromCart = (productId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId)); // Remove o item completamente
    };

    // Função para atualizar a quantidade de um item
    const updateQuantity = (productId, newQuantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
