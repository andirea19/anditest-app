# Film-App Next.js und MongooseDB

Diese Next.js–App soll Lieblingsfilm sammeln. Sie verwendet MongoDB (MongoDB Atlas) als Datenbank und Vercel für das Hosting.

## Features

* **Filme eintragen**: Benutzer:innen können Namen, Filmtitel und das Erscheinungsjahr angeben.
* **Filme anzeigen**: Zeigt alle angegebenen Filme.
* **Dark/Light Mode**: Umschaltbar über Navbar-Button, Zustand wird in `localStorage` gespeichert.
* **Responsive Layout** mit Tailwind CSS.

## Setup & Entwicklung

1. **Repository klonen**

   ```bash
   git clone https://github.com/modelabs/film-app-nextjs-mongodb.git dein-repo
   cd dein-repo
   ```

2. **Umgebungsvariablen**
   Kopiere `.env.example` nach `.env.local` und setz:

   ```ini
   MONGODB_URI="<your-mongodb-connection-string>"
   ```

3. **Abhängigkeiten installieren**

   ```bash
   npm install
   # oder yarn/pnpm install
   ```

4. **Hot-Reload**

   ```bash
   npm run dev
   # http://localhost:3000
   Unterbrechen mit Strg+C
   ```

## Ordnerstruktur

```
├─ pages/
│  ├─ index.tsx        # Startseite
│  └─ film/
│     ├─ index.tsx     # Liste der Filme
│     ├─ new.tsx       # Neuen Film 
│     └─ [id]/
│        └─ edit.tsx   # tbd: Film bearbeiten
├─ pages/api/
│  └─ film/
│     ├─ index.ts      # Filme auflisten und hinzufügen
│     └─ [id].ts       # GET/PUT/DELETE einzelner Filme
├─ components/
│  └─ FilmForm.tsx     # Formular-Komponente für neue Filme
├─ models/
│  └─ Film.ts          # Mongoose-Schema
├─ lib/
│  └─ dbConnect.ts     # MongoDB-Verbindungscaching
├─ styles/
│  ├─ globals.css      # Tailwind + Custom CSS
│  └─ tailwind.config.js
└─ scripts/
   └─ seed.js          # Dummy-Daten Seeding für MongoDB
```

## Environment & Deployment

* **MongoDB Atlas**: IP-Whitelist auf `0.0.0.0/0` oder spezifische Adresse.
* **Vercel**: Deploy über GitHub-Integration, Secret `MONGODB_URI` setzen.
* **Azure App Service**: GitHub Actions–Workflow verwenden, `AZURE_WEBAPP_NAME` & Publish-Profile als Secrets.

## Snippets

* `npm run dev` – Development-Server
* `npm run build` – Production-Build
* `npm run start` – Production-Server
* `npm run seed` – Seed-Skript für Dummy-Filme

## Weitere Informationen
* **Next.js Dokumentation**: [nextjs.org/docs](https://nextjs.org/docs)
* **MongoDB Dokumentation**: [mongodb.com/docs](https://www.mongodb.com/docs/)
* **Mongoose Dokumentation**: [mongoosejs.com/docs](https://mongoosejs.com/docs/)
* **Tailwind CSS Dokumentation**: [tailwindcss.com/docs](https://tailwindcss.com/docs)
* **Vercel Dokumentation**: [vercel.com/docs](https://vercel.com/docs)
* **Azure App Service Dokumentation**: [docs.microsoft.com/azure/app-service](https://docs.microsoft.com/azure/app-service/)
