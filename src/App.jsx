import React, { useState, useEffect } from "react";

function App() {
  // --- State-Variablen ---
  // Hier speichern wir die Produktliste, die von der API kommt. Startet als leere Liste.
  const [products, setProducts] = useState([]);
  // Zeigt an, ob wir gerade Daten laden. Startet auf true.
  const [loading, setLoading] = useState(true);
  // Hier speichern wir eventuelle Fehlermeldungen beim Datenabruf. Startet leer (null).
  const [error, setError] = useState(null);

  // --- Datenabruf-Effekt ---
  // useEffect führt Code aus, nachdem die Komponente zum ersten Mal gerendert wurde.
  // Die leere eckige Klammer [] am Ende sorgt dafür, dass es nur EINMAL beim Start passiert.
  useEffect(() => {
    // Wir definieren eine asynchrone Funktion, um die Daten zu holen
    async function fetchProducts() {
      try {
        // Setze Ladezustand auf true (obwohl er schon ist, zur Sicherheit) und lösche alte Fehler
        setLoading(true);
        setError(null);

        // Sende eine GET-Anfrage an unsere Backend-API
        // WICHTIG: Die Adresse muss genau stimmen!
        const response = await fetch("http://127.0.0.1:8000/api/products/");

        // Prüfe, ob die Antwort vom Server erfolgreich war (Status-Code 2xx)
        if (!response.ok) {
          throw new Error(`HTTP Fehler! Status: ${response.status}`);
        }

        // Wandle die JSON-Antwort vom Server in ein JavaScript-Array um
        const data = await response.json();

        // Speichere die erhaltenen Produktdaten in unserem State
        setProducts(data);
      } catch (e) {
        // Falls ein Fehler aufgetreten ist (Netzwerkproblem, Serverfehler etc.)
        console.error("Fehler beim Abrufen der Produkte:", e);
        setError(e.message); // Speichere die Fehlermeldung im State
      } finally {
        // Dieser Block wird immer ausgeführt, egal ob Erfolg oder Fehler
        setLoading(false); // Setze Ladezustand auf false
      }
    }

    fetchProducts(); // Führe die Funktion zum Datenholen aus
  }, []); // Leeres Array = Nur einmal beim ersten Rendern ausführen

  // --- Darstellung (Conditional Rendering) ---
  // Was soll angezeigt werden, abhängig vom Zustand?

  // 1. Wenn wir noch laden:
  if (loading) {
    return <div className="p-4 text-center">Lade Produkte... ⏳</div>;
  }

  // 2. Wenn ein Fehler aufgetreten ist:
  if (error) {
    return (
      <div className="p-4 text-center text-red-600">
        Fehler beim Laden: {error} 😭
      </div>
    );
  }

  // 3. Wenn alles gut ging und keine Fehler/Laden mehr: Zeige die Produkte!
  return (
    <div className="p-6 max-w-2xl mx-auto">
      {" "}
      {/* Tailwind: Padding, max. Breite, zentriert */}
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Unser Shop
      </h1>{" "}
      {/* Tailwind */}
      <ul className="space-y-3">
        {" "}
        {/* Tailwind: Vertikaler Abstand zwischen Listenelementen */}
        {products.length > 0 ? (
          // Wenn Produkte vorhanden sind, liste sie auf
          products.map((product) => (
            <li key={product.id} className="p-3 bg-gray-100 rounded shadow">
              {" "}
              {/* Wichtig: key für jedes Element! Tailwind */}
              <strong className="text-lg font-semibold">
                {product.name}
              </strong>{" "}
              - {product.price} €
              <p className="text-sm text-gray-600 mt-1">
                {product.description} (Kategorie: {product.category || "N/A"})
              </p>{" "}
              {/* Zeige Kategorie oder N/A */}
            </li>
          ))
        ) : (
          // Wenn keine Produkte vorhanden sind (aber kein Fehler/Laden)
          <p className="text-center text-gray-500">Keine Produkte gefunden.</p>
        )}
      </ul>
    </div>
  );
}

export default App;
