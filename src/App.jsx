import React from "react";
// Outlet wird von React Router benötigt, um Kind-Routen zu rendern
import { Outlet } from "react-router-dom";
import Header from "./components/Header"; // Unseren neuen Header importieren

function App() {
  // App ist jetzt nur noch der Rahmen: Header + Seiteninhalt
  return (
    <div className="flex flex-col min-h-screen">
      {" "}
      {/* Stellt sicher, dass der Footer (falls einer kommt) unten ist */}
      <Header />
      <main className="flex-grow">
        {" "}
        {/* Hauptinhalt wächst */}
        {/* Hier rendert React Router die passende Seiten-Komponente (ProductListPage, ProductDetailPage, CartPage) */}
        <Outlet />
      </main>
      {/* Hier könnte später ein Footer hin */}
      {/* <footer className="bg-gray-200 p-4 text-center text-sm text-gray-600">© 2025 Mein Shop</footer> */}
    </div>
  );
}

export default App;
