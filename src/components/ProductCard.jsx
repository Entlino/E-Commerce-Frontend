import React from "react";
import { Link } from "react-router-dom"; // Link wird hier benötigt

// Die Komponente erhält das 'product'-Objekt als "Prop" (Eigenschaft)
function ProductCard({ product }) {
  return (
    // Die äußere Kachel: Etwas anderer Schatten, abgerundete Ecken, Flexbox-Layout (Spalte)
    <div className="border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out bg-white overflow-hidden flex flex-col">
      {/* 1. Bild-Platzhalter */}
      {/* Ein einfacher grauer Kasten oben, der ein Bild simuliert */}
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400 font-medium">
        {/* Hier könnte später ein <img> Tag mit product.image_url hin */}
        <span>Produktbild</span>
      </div>

      {/* 2. Inhaltsbereich */}
      {/* Padding, Flexbox-Spalte und flex-grow, damit der Button nach unten gedrückt wird */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Produktname als Link */}
        {/* mb-1 = kleinerer Abstand nach unten */}
        <Link
          to={`/products/${product.id}`}
          className="block mb-1"
          title={product.name}
        >
          <h2 className="text-lg font-semibold text-gray-900 hover:text-blue-700 truncate transition-colors duration-200">
            {product.name}
          </h2>
        </Link>

        {/* Beschreibung */}
        {/* mb-3 = größerer Abstand nach unten, flex-grow sorgt, dass dieser Bereich wächst */}
        <p className="text-sm text-gray-600 mb-3 flex-grow min-h-[40px]">
          {" "}
          {/* Minimale Höhe für Konsistenz */}
          {product.description || "Keine Beschreibung verfügbar."}
        </p>

        {/* Preis und Kategorie */}
        {/* mb-3, etwas andere Textgrößen/-farben, Kategorie als "Badge" */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-xl font-bold text-gray-800">
            {product.price} €
          </span>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
            {product.category || "N/A"}
          </span>
        </div>

        {/* 3. Button-Platzhalter */}
        {/* mt-auto drückt den Button nach unten, wenn flex-grow verwendet wird */}
        <button
          type="button"
          className="mt-auto w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
          // Die Funktion kommt erst viel später hinzu!
          // onClick={() => alert('Warenkorb-Funktion fehlt noch!')}
        >
          In den Warenkorb
        </button>
      </div>
    </div>
  );
}
export default ProductCard;
