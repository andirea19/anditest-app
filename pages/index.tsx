// pages/index.tsx
import Link from "next/link";
import { NextPage } from "next";

const HomePage: NextPage = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-neutral-50">
      <h1 className="text-4xl font-extrabold mb-4">
        Willkommen zur Lieblingsfilm-Umfrage
      </h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-lg">
        Hier kannst du abstimmen, welche Filme am beliebtesten sind.  
        Sieh dir zuerst die Ergebnisse an oder trage direkt deinen eigenen Lieblingsfilm ein!
      </p>
      <div className="flex gap-4">
        <Link
          href="/film"
          className="px-6 py-3 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600"
        >
          Ergebnisse ansehen
        </Link>
       
      </div>
    </main>
  );
};

export default HomePage;
// This is the main entry point for the application.
// It provides a welcoming interface for users to either view existing film results or submit a new favorite <film className="
// "></film>