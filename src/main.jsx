import React from "react";
import ReactDOM from "react-dom/client";
// React Router importieren
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
// ... andere imports
import { CartProvider } from "./context/CartContext"; // <-- NEU
import "./index.css";
// Platzhalter für die zukünftige Detailseiten-Komponente
// Wir erstellen diese Datei erst im nächsten Schritt!
// import ProductDetailPage from './pages/ProductDetailPage.jsx';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* CartProvider umschliesst jetzt alles */}
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>
);
