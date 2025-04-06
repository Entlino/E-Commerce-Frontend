import React from "react";
// Wir brauchen wieder den Link und unseren useCart Hook
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function CartPage() {
  // Hole die aktuellen Warenkorb-Artikel und (später vielleicht nützlich) Funktionen
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  // Berechnung der Gesamtsumme (optional für jetzt, aber nützlich)
  const total = cartItems.reduce((sum, item) => {
    // Stelle sicher, dass Preis und Menge Zahlen sind
    const price = parseFloat(item.product.price) || 0;
    const quantity = parseInt(item.quantity, 10) || 0;
    return sum + price * quantity;
  }, 0); // Starte die Summe bei 0

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Warenkorb</h1>

      {/* Prüfen, ob der Warenkorb leer ist */}
      {cartItems.length === 0 ? (
        <div className="text-center p-10 bg-gray-50 rounded-lg">
          <p className="text-xl text-gray-500 mb-4">Dein Warenkorb ist leer.</p>
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white py-2 px-5 rounded hover:bg-blue-700 transition-colors"
          >
            Weiter einkaufen
          </Link>
        </div>
      ) : (
        // Wenn Artikel vorhanden sind:
        <div className="space-y-4">
          {" "}
          {/* Abstand zwischen den Artikeln */}
          {cartItems.map((item) => (
            // Neuer Code-Teil in der Map für ein Item:
            <div
              key={item.product.id}
              className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white border rounded-lg shadow-sm gap-4"
            >
              {" "}
              {/* Flex-col für kleine Schirme */}
              {/* Produktinfos & Bild */}
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <div className="w-16 h-16 bg-gray-200 rounded flex-shrink-0"></div>
                <div>
                  <Link
                    to={`/products/${item.product.id}`}
                    className="text-lg font-semibold text-gray-800 hover:text-blue-600"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-sm text-gray-500">
                    {item.product.price} € / Stück
                  </p>
                  {/* Entfernen-Button (für kleine Schirme hier, für große rechts) */}
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-500 hover:text-red-700 text-sm mt-1 sm:hidden" // Nur auf kleinen Schirmen sichtbar
                  >
                    Entfernen
                  </button>
                </div>
              </div>
              {/* Mengensteuerung & Preis */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-4 w-full sm:w-auto">
                {/* Mengensteuerung */}
                <div className="flex items-center border rounded">
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity - 1)
                    }
                    className="px-3 py-1 text-lg font-semibold hover:bg-gray-100 rounded-l"
                    disabled={item.quantity <= 1} // Deaktiviert bei Menge 1
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-md font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity + 1)
                    }
                    className="px-3 py-1 text-lg font-semibold hover:bg-gray-100 rounded-r"
                  >
                    +
                  </button>
                </div>
                {/* Subtotal */}
                <div className="text-lg font-semibold text-gray-900 w-24 text-right">
                  {(parseFloat(item.product.price) * item.quantity).toFixed(2)}{" "}
                  €
                </div>
                {/* Entfernen-Button (für große Schirme hier) */}
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-red-500 hover:text-red-700 text-sm hidden sm:inline-block" // Nur auf sm und größer sichtbar
                >
                  Entfernen
                </button>
              </div>
            </div>
          ))}
          {/* Gesamtübersicht */}
          <div className="mt-6 pt-4 border-t">
            <div className="flex justify-end">
              <span className="text-xl font-bold text-gray-900">
                Gesamt: {total.toFixed(2)} €
              </span>
            </div>
            <div className="flex justify-end mt-4">
              <button className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 transition-colors">
                Zur Kasse (Demo)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
