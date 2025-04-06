import React from "react";
// Stelle sicher, dass hier KEIN 'import './App.css';' oder ähnliches mehr steht!

function App() {
  return (
    // Wir wenden hier direkt Tailwind-Klassen an:
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      {/* p-6: Innenabstand
        bg-gray-100: Hellgrauer Hintergrund
        min-h-screen: Mindesthöhe des ganzen Bildschirms
        flex flex-col items-center justify-center: Zentriert den Inhalt vertikal und horizontal
      */}
      <h1 className="text-3xl font-bold text-blue-700 mb-4">
        {/* text-3xl: Grosse Schrift
          font-bold: Fett
          text-blue-700: Dunkelblaue Schrift
          mb-4: Abstand nach unten
        */}
        Mein Shop Frontend (Test)
      </h1>
      <p className="text-gray-700">
        {/*
          text-gray-700: Mittelgraue Schrift
        */}
        Wenn du das siehst und die Überschrift blau & fett ist, funktioniert
        Tailwind!
      </p>
    </div>
  );
}

export default App;
