import React from "react";
import { Link, NavLink } from "react-router-dom"; // NavLink für aktiven Stil
import { useCart } from "../context/CartContext";

function Header() {
  const { cartItems } = useCart();
  // Zähle die *Gesamtanzahl* der Artikel (nicht nur verschiedene Produkte)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      {" "}
      {/* Sticky Header */}
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
            end // Wichtig, damit "/" nicht immer aktiv ist
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
            {/* Warenkorb-Anzahl als Badge */}
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {totalItems}
              </span>
            )}
          </NavLink>
          {/* Hier könnten später Login/Logout Links hin */}
        </div>
      </nav>
    </header>
  );
}

export default Header;
