# Mein Shop Projekt - Frontend

Dies ist das Frontend für das 'Mein Shop' E-Commerce Projekt (Stand: 16. April 2025). Es wurde mit React (unter Verwendung von Vite) und Tailwind CSS v3 erstellt. Das Frontend kommuniziert mit der zugehörigen Backend-API, um Produktdaten anzuzeigen und zukünftige Shop-Funktionen zu ermöglichen.

** Backend Repository:** [https://github.com/Entlino/E-Commerce-Backend](https://github.com/Entlino/E-Commerce-Backend)

## Features (Aktueller Stand)

- Zeigt eine **Liste aller Produkte** an, die von der Backend-API (`/api/products/`) abgerufen werden.
- Beinhaltet eine einfache **Lade- und Fehleranzeige** während des Datenabrufs.
- Basiert auf **React** mit **Vite** für eine schnelle Entwicklungsumgebung.
- Nutzt **Tailwind CSS v3** für das Styling.

## Technologie-Stack

- **Framework/Library:** React
- **Build-Tool:** Vite
- **Styling:** Tailwind CSS v3
- **Sprache:** JavaScript (JSX)
- **Paketmanager:** npm

## Voraussetzungen

Bevor du beginnst, stelle sicher, dass Folgendes auf deinem System installiert ist:

- Node.js (LTS-Version empfohlen, z.B. v18 oder höher - Deine v22.11.0 ist perfekt) ([Download](https://nodejs.org/))
- npm (kommt mit Node.js)
- Git ([Download](https://git-scm.com/))

## Installation & Setup

Folge diesen Schritten, um das Frontend lokal aufzusetzen:

1.  **Repository klonen:**
    ```bash
    git clone [https://github.com/Entlino/E-Commerce-Frontend.git](https://github.com/Entlino/E-Commerce-Frontend.git)
    ```
2.  **In den Ordner wechseln:**
    ```bash
    cd E-Commerce-Frontend
    # (oder wie dein lokaler Ordner heisst)
    ```
3.  **Abhängigkeiten installieren:**
    ```bash
    npm install
    ```
    _(Dies installiert React, Tailwind und alle anderen in `package.json` definierten Pakete)._

## Entwicklungs-Server starten

**WICHTIG:** Das Frontend benötigt das laufende Backend, um Produktdaten abrufen zu können! Stelle sicher, dass der **Backend-Server zuerst gestartet** wurde (siehe README des Backend-Repos) und unter `http://127.0.0.1:8000/` läuft.

1.  **Frontend Dev-Server starten:**
    ```bash
    npm run dev
    ```
2.  Öffne die im Terminal angezeigte Adresse in deinem Webbrowser (normalerweise `http://localhost:5173/`).

Du solltest nun die Anwendung sehen, die die Produktliste vom Backend anzeigt.

## Tests ausführen 

Aktuell sind noch keine automatisierten Tests implementiert. Wenn Tests hinzugefügt werden (z.B. mit Jest und React Testing Library), können sie typischerweise so ausgeführt werden:

```bash
npm test

```

(Das Hinzufügen von Tests wird dringend empfohlen!)

Konfiguration
Die URL für die Backend-API (http://127.0.0.1:8000/api/products/) ist derzeit fest im Code (src/App.jsx) hinterlegt. Für mehr Flexibilität könnte dies später in eine Umgebungsvariable (z.B. über eine .env-Datei mit VITE_API_URL=...) ausgelagert werden.

Lizenz
Dieses Projekt steht unter der MIT Lizenz.
