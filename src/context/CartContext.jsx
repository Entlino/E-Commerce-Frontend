import React, { createContext, useState, useContext, useEffect } from "react"; // useEffect wurde hinzugefügt

// 1. Den Context erstellen (bleibt gleich)
const CartContext = createContext();

// 2. Den Provider erstellen (angepasst für localStorage)
export function CartProvider({ children }) {
  // --- GEÄNDERT: useState Initialisierung ---
  // Liest den initialen Warenkorb aus localStorage oder startet leer
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem("cartItems");
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Konnte Warenkorb nicht aus localStorage laden:", error);
      return [];
    }
  });

  // --- NEU: useEffect Hook zum Speichern in localStorage ---
  // Dieser Effekt wird immer ausgeführt, wenn sich 'cartItems' ändert
  useEffect(() => {
    try {
      // Wandle das cartItems Array in einen JSON-String um und speichere ihn
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      // console.log("Warenkorb in localStorage gespeichert:", cartItems); // Optional: Debugging
    } catch (error) {
      console.error("Konnte Warenkorb nicht in localStorage speichern:", error);
    }
  }, [cartItems]); // Abhängigkeit: Nur ausführen, wenn cartItems sich ändert

  // Die addToCart Funktion bleibt logisch gleich
  const addToCart = (productToAdd) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.id === productToAdd.id
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { product: productToAdd, quantity: 1 }];
      }
    });
    // console.log("Zum Warenkorb hinzugefügt:", productToAdd.name); // Optional: Debugging
  };

  // Später hier hinzufügen: removeFromCart, updateQuantity etc.

  // Wert, der vom Provider bereitgestellt wird (bleibt gleich)
  const value = {
    cartItems,
    addToCart,
    // Später: removeFromCart, updateQuantity ...
  };

  // Der Provider gibt den 'value' an alle seine 'children' weiter (bleibt gleich)
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// 3. Der benutzerdefinierte Hook (bleibt gleich)
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error(
      "useCart muss innerhalb eines CartProvider verwendet werden"
    );
  }
  return context;
}
