// pages/index.tsx
import Link from "next/link";
import { NextPage } from "next";

const HomePage: NextPage = () => {
  return (
    <main
      className="
        flex flex-col items-center justify-center min-h-screen p-8
        bg-neutral-50 text-gray-800
        dark:bg-gray-900 dark:text-gray-200
      "
    >
      <h1 className="text-4xl font-extrabold mb-4">
        Willkommen zur Lieblingsfilm-Umfrage
      </h1>
      <p className="text-lg mb-8 text-center max-w-lg">
        Hier kannst du abstimmen, welche Filme am beliebtesten sind.  
        Sieh dir zuerst die Ergebnisse an oder trage direkt deinen eigenen Lieblingsfilm ein!
      </p>
      <div className="flex gap-4">
        <Link
          href="/film"
          className="
            px-6 py-3 rounded-lg shadow
            bg-orange-500 text-white
            hover:bg-orange-600
            dark:bg-orange-600 dark:hover:bg-orange-500
          "
        >
          Ergebnisse ansehen
        </Link>
        
      </div>
    </main>
  );
};

export default HomePage;
// This is the main landing page for the film survey application.
// It provides a brief introduction and links to view results or add a new favorite film.