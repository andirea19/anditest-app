// pages/index.tsx
import Link from "next/link";

const HomePage = () => (
  <div className="min-h-screen bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 p-8">
    <header className="max-w-4xl mx-auto text-center mb-16">
      <h1 className="text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
        Willkommen bei FilmGalerie
      </h1>
      <p className="text-lg text-indigo-100 mb-6">
        Entdecke deine Lieblingsfilme und entdecke neue Klassiker.
      </p>
      <Link
        href="/films"
        className="inline-block px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:bg-indigo-50"
      >
        Alle Filme anzeigen
      </Link>
    </header>

    <section className="max-w-4xl mx-auto bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-8 shadow-lg mb-16">
      <h2 className="text-3xl font-bold text-white mb-4">Neueste Filme</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Hier kannst du deine echten Film-Daten einbinden */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white bg-opacity-80 rounded-lg p-4 flex flex-col justify-between"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Film {i}
            </h3>
            <p className="text-gray-600">Person: Beispieldaten</p>
            <p className="text-gray-600">Jahr: 2023</p>
            <Link
              href="/films"
              className="mt-4 text-indigo-600 hover:underline"
            >
              Mehr erfahren
            </Link>
          </div>
        ))}
      </div>
    </section>

    <footer className="text-center text-indigo-100">
      © {new Date().getFullYear()} FilmGalerie. Alle Rechte vorbehalten.
    </footer>
  </div>
);

export default HomePage;
// pages/index.tsx
// pages/index.tsx