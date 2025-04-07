import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard"; // Pfad prüfen!
// KEIN useCart hier nötig, ausser du brauchst es spezifisch für die Liste

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");

  useEffect(() => {
    console.log(
      "ProductListPage: useEffect wird ausgeführt. Filter:",
      categoryFilter
    ); // Angepasster Log

    async function fetchProducts() {
      setLoading(true);
      setError(null);
      // Basis-URL für die API
      let apiUrl = "http://127.0.0.1:8000/api/products/";

      // Wenn ein categoryFilter vorhanden ist, füge ihn zur URL hinzu
      if (categoryFilter) {
        apiUrl += `?category=${categoryFilter}`;
      }
      console.log("ProductListPage: Fetching from:", apiUrl); // Zeigt die finale URL

      try {
        const response = await fetch(apiUrl); // Nutze die (ggf. geänderte) URL
        // ... Rest der Fetch-Logik (response.ok, data, setProducts etc.) bleibt gleich ...
        if (!response.ok) {
          throw new Error(`HTTP Fehler! Status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (e) {
        console.error("ProductListPage: Fehler beim Fetch:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
    // NEUE Abhängigkeit: useEffect erneut ausführen, wenn sich der Filter ändert!
  }, [categoryFilter]);

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
