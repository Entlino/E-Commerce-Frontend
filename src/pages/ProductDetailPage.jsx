import React, { useState, useEffect } from "react";
// Importiere Link und useParams von react-router-dom
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!productId) {
      setError("Keine Produkt-ID in der URL gefunden.");
      setLoading(false);
      return;
    }

    async function fetchProductDetails() {
      setLoading(true);
      setError(null);
      try {
        const apiUrl = `http://127.0.0.1:8000/api/products/${productId}/`;
        console.log("Fetching product details from:", apiUrl);
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(
            `Produkt nicht gefunden oder Serverfehler! Status: ${response.status}`
          );
        }
        const data = await response.json();
        setProduct(data);
      } catch (e) {
        console.error("Fehler beim Abrufen der Produktdetails:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProductDetails();
  }, [productId]);

  // --- Render based on state ---

  if (loading) {
    // Etwas zentrierter und größerer Lade-Text
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-500">Lade Produktdetails... ⏳</p>
      </div>
    );
  }

  if (error) {
    // Fehlerseite mit Link zurück
    return (
      <div className="container mx-auto p-6 text-center">
        <h2 className="text-2xl text-red-600 mb-4">Fehler: {error} 😭</h2>
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 inline-flex items-center"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Zurück zur Produktübersicht
        </Link>
      </div>
    );
  }

  if (!product) {
    // Fallback falls Produkt null ist, mit Link zurück
    return (
      <div className="container mx-auto p-6 text-center">
        <p className="text-gray-500">Produktinformationen nicht verfügbar.</p>
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 mt-2 inline-block"
        >
          <svg
            className="w-4 h-4 mr-1 inline"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Zurück zur Produktübersicht
        </Link>
      </div>
    );
  }

  // --- Success: Display Product Details ---
  // Hauptcontainer mit responsive Padding und Zentrierung
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      {/* Zurück-Link */}
      <div className="mb-6">
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 inline-flex items-center"
        >
          {/* Kleiner Pfeil Icon */}
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Zurück zur Übersicht
        </Link>
      </div>

      {/* Haupt Produkt-Sektion: Ab lg (=large) zweispaltig */}
      <div className="bg-white rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-8">
        {/* Bild-Platzhalter Bereich (Links auf lg) */}
        <div className="p-4 sm:p-6 lg:p-8 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
          {/* Der eigentliche Platzhalter Kasten */}
          <div className="w-full aspect-square max-w-md bg-gray-300 flex items-center justify-center text-gray-500 font-semibold rounded-md">
            <span>Produktbild Platzhalter</span>
            {/* Später: <img src={product.image_url} alt={product.name} className="w-full h-full object-cover rounded-md"/> */}
          </div>
        </div>

        {/* Detail-Bereich (Rechts auf lg) */}
        {/* Flex-Spalte sorgt dafür, dass der Button unten bleibt */}
        <div className="p-6 lg:p-8 flex flex-col justify-between">
          {/* Oberer Teil: Kategorie, Name, Beschreibung, Lagerbestand */}
          <div>
            {/* Kategorie als Badge */}
            <span className="text-xs uppercase tracking-wide bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold mb-3 inline-block">
              {product.category || "Ohne Kategorie"}
            </span>

            {/* Produktname */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
              {product.name}
            </h1>

            {/* Beschreibung */}
            <p className="text-gray-700 text-base leading-relaxed mb-6">
              {product.description || "Keine weitere Beschreibung."}
            </p>

            {/* Lagerbestand-Info (mit Farbe) */}
            <p
              className={`text-sm font-medium mb-6 ${
                product.stock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.stock > 0
                ? `Sofort verfügbar (${product.stock} Stück)`
                : "Derzeit nicht auf Lager"}
            </p>
          </div>

          {/* Unterer Teil: Preis, Button, Metadaten */}
          <div className="mt-6">
            {/* Preis */}
            <div className="text-4xl font-bold text-gray-900 mb-6">
              {product.price} €
            </div>

            {/* In den Warenkorb Button */}
            <button
              type="button"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ease-in-out transform hover:scale-105"
              onClick={() => addToCart(product)} // <-- NEU: Ruft addToCart mit dem geladenen Produkt auf
            >
              In den Warenkorb
            </button>

            {/* Metadaten (vereinfacht) */}
            <div className="text-xs text-gray-400 mt-4 text-center sm:text-right">
              Produkt ID: {product.id}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
