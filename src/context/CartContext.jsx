import React, { createContext, useState, useContext } from "react";

// 1. Den Context erstellen
const CartContext = createContext();

// 2. Den Provider erstellen (eine Komponente, die den Zustand verwaltet und bereitstellt)
export function CartProvider({ children }) {
  // Hier speichern wir die Artikel im Warenkorb
  // Format: Array von Objekten, z.B. [{ product: { id: 1, name: 'Apfel', ... }, quantity: 2 }, ...]
  const [cartItems, setCartItems] = useState([]);

  // Funktion, um ein Produkt hinzuzufügen
  const addToCart = (productToAdd) => {
    setCartItems((prevItems) => {
      // Prüfen, ob das Produkt schon im Warenkorb ist
      const existingItem = prevItems.find(
        (item) => item.product.id === productToAdd.id
      );

      if (existingItem) {
        // Wenn ja: Menge um 1 erhöhen
        return prevItems.map((item) =>
          item.product.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Wenn nein: Produkt mit Menge 1 hinzufügen
        return [...prevItems, { product: productToAdd, quantity: 1 }];
      }
    });
    console.log("Zum Warenkorb hinzugefügt:", productToAdd.name); // Fürs Debugging
  };

  // Später hier hinzufügen: removeFromCart, updateQuantity etc.

  // Wert, der vom Provider bereitgestellt wird: die Artikel und die Funktion zum Hinzufügen
  const value = {
    cartItems,
    addToCart,
    // Später: removeFromCart, updateQuantity ...
  };

  // Der Provider gibt den 'value' an alle seine 'children' (Kind-Komponenten) weiter
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// 3. Ein benutzerdefinierter Hook, um den Context einfacher zu nutzen
// Statt useContext(CartContext) schreibt man einfach useCart()
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error(
      "useCart muss innerhalb eines CartProvider verwendet werden"
    );
  }
  return context;
}
