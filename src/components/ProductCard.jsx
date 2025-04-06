import React from "react";
import { Link } from "react-router-dom"; // Link wird hier benötigt

// Die Komponente erhält das 'product'-Objekt als "Prop" (Eigenschaft)
function ProductCard({ product }) {
  // Das 'key'-Prop wird hier NICHT benötigt, es muss in der .map()-Funktion bleiben!
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition-shadow">
      <Link to={`/products/${product.id}`} className="block mb-2">
        <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600 truncate">
          {product.name}
        </h2>
      </Link>
      <p className="text-gray-600 mb-2 h-12 overflow-hidden text-sm">
        {product.description || "Keine Beschreibung verfügbar."}
      </p>
      <div className="flex justify-between items-center mt-3">
        <span className="text-lg font-bold text-blue-700">
          {product.price} €
        </span>
        <span className="text-sm text-gray-500">
          {product.category || "N/A"}
        </span>
      </div>
    </div>
  );
}

export default ProductCard;
