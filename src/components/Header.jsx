import React, { useState, useEffect } from "react"; // useState, useEffect hinzufügen
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Header() {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // NEUE STATES für Kategorien
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      setLoadingCategories(true);
      setErrorCategories(null);
      try {
        const response = await fetch("http://127.0.0.1:8000/api/categories/");
        if (!response.ok) {
          throw new Error(`HTTP Fehler! Status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data); // Speichere die Kategorien
      } catch (error) {
        console.error("Fehler beim Abrufen der Kategorien:", error);
        setErrorCategories(error.message);
      } finally {
        setLoadingCategories(false);
      }
    }
    fetchCategories();
  }, []);
  return (
    // Der äußere Header-Container
    <header className="bg-white shadow-md sticky top-0 z-10">
      {/* ===== TEIL 1: Hauptnavigation (DARF NICHT FEHLEN!) ===== */}
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo/Brand */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 hover:text-blue-800"
        >
          MeinShop
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium ${
                isActive ? "text-blue-600 bg-blue-50" : ""
              }`
            }
            end
          >
            Shop
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium ${
                isActive ? "text-blue-600 bg-blue-50" : ""
              }`
            }
          >
            Warenkorb
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {totalItems}
              </span>
            )}
          </NavLink>
          {/* Hier könnten später Login/Logout Links hin */}
        </div>
      </nav>
      {/* ===== ENDE TEIL 1 ===== */}

      {/* ===== TEIL 2: Kategorie-Anzeige (Hast du hinzugefügt) ===== */}
      <div className="bg-gray-100 border-t border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center space-x-4 overflow-x-auto">
          <span className="font-semibold text-sm text-gray-600 flex-shrink-0">
            Kategorien:
          </span>
          {loadingCategories && (
            <span className="text-sm text-gray-500">Lade...</span>
          )}
          {errorCategories && (
            <span className="text-sm text-red-500">Fehler!</span>
          )}
          {!loadingCategories &&
            !errorCategories &&
            categories.length === 0 && (
              <span className="text-sm text-gray-500">Keine gefunden.</span>
            )}
          {!loadingCategories && !errorCategories && categories.length > 0 && (
            <ul className="flex space-x-4">
              {categories.map((category) => (
                <li key={category.id}>
                  {/* Link zur Startseite, aber mit category Query Parameter */}
                  <Link
                    to={`/?category=${category.id}`} // Ziel: /?category=1 oder /?category=2 etc.
                    className="text-sm text-gray-700 hover:text-blue-600 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {/* ===== ENDE TEIL 2 ===== */}
    </header> // Ende des äußeren Header-Containers
  );
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      {/* Hauptnavigation (wie bisher) */}
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* ... Logo ... */}
        {/* ... Nav Links (Shop, Warenkorb) ... */}
      </nav>

      {/* NEUE Kategorie-Anzeige */}
      <div className="bg-gray-100 border-t border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center space-x-4 overflow-x-auto">
          <span className="font-semibold text-sm text-gray-600 flex-shrink-0">
            Kategorien:
          </span>
          {loadingCategories && (
            <span className="text-sm text-gray-500">Lade...</span>
          )}
          {errorCategories && (
            <span className="text-sm text-red-500">Fehler!</span>
          )}
          {!loadingCategories &&
            !errorCategories &&
            categories.length === 0 && (
              <span className="text-sm text-gray-500">Keine gefunden.</span>
            )}
          {!loadingCategories && !errorCategories && categories.length > 0 && (
            <ul className="flex space-x-4">
              {categories.map((category) => (
                <li key={category.id}>
                  {/* Später wird das ein Link zum Filtern */}
                  <span className="text-sm text-gray-700 hover:text-blue-600 cursor-pointer">
                    {category.name}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {/* ENDE NEUE Kategorie-Anzeige */}
    </header>
  );
}

export default Header;
