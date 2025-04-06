// *** BESSERER ANSATZ für main.jsx ***
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

import App from "./App.jsx"; // Unser Layout mit Header und Outlet
import ProductListPage from "./pages/ProductListPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* Die App-Komponente ist jetzt die Eltern-Route für alle anderen */}
          <Route path="/" element={<App />}>
            {/* Index Route: Was wird angezeigt, wenn der Pfad genau "/" ist? */}
            <Route index element={<ProductListPage />} />
            {/* Andere Kind-Routen */}
            <Route path="products/:productId" element={<ProductDetailPage />} />
            <Route path="cart" element={<CartPage />} />
            {/* Hier könnten später 404-Routen etc. hin: <Route path="*" element={<NotFoundPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>
);
