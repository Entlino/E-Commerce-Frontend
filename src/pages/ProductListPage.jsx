import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard"; // Pfad prüfen!
// KEIN useCart hier nötig, ausser du brauchst es spezifisch für die Liste

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("ProductListPage: useEffect wird ausgeführt."); // <-- LOG 1

    async function fetchProducts() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://127.0.0.1:8000/api/products/");
        console.log("ProductListPage: Fetch Response Status:", response.status); // <-- LOG 2
        if (!response.ok) {
          throw new Error(`HTTP Fehler! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("ProductListPage: Empfangene Daten:", data); // <-- LOG 3
        setProducts(data);
      } catch (e) {
        console.error("ProductListPage: Fehler beim Fetch:", e); // <-- LOG 4
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // ... Loading / Error return bleibt gleich ...

  // Erfolgsfall return (kopiert von App.jsx, ohne Header/Warenkorb-Anzeige):
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Unser Shop
      </h1>
      {/* Produkt-Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            Keine Produkte gefunden.
          </p>
        )}
      </div>
    </div>
  );
}
export default ProductListPage;
