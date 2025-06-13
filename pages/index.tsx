// pages/index.tsx
import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import FilmModel from "../models/Film";
import { GetServerSideProps } from "next";

// Serialisierte Film-Daten, die an die UI übergeben werden
export interface SerializedFilm {
  _id: string;
  person: string;
  favoriteFilm: string;
  releaseYear: number;
}

type Props = {
  films: SerializedFilm[];
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  await dbConnect();

  // Alle Filme aus der DB holen
  const result = await FilmModel.find({});

  // Dokumente in reine JS-Objekte mit String-IDs umwandeln
  const films: SerializedFilm[] = result.map((doc) => ({
    _id: doc._id.toString(),
    person: doc.person,
    favoriteFilm: doc.favoriteFilm,
    releaseYear: doc.releaseYear,
  }));

  return { props: { films } };
};

const IndexPage = ({ films }: Props) => {
  return (
    <main className="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {films.map((film) => (
        <article
          key={film._id}
          className="bg-white shadow rounded-lg p-4 flex flex-col justify-between"
        >
          <div>
            <h2 className="text-xl font-semibold mb-2">{film.favoriteFilm}</h2>
            <p className="text-gray-700 mb-1">
              <span className="font-medium">Person:</span> {film.person}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Erscheinungsjahr:</span> {film.releaseYear}
            </p>
          </div>
          <div className="mt-4 flex space-x-2">
            <Link href={`/${film._id}/edit`}>
              <a className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                Edit
              </a>
            </Link>
            <Link href={`/${film._id}`}>
              <a className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
                View
              </a>
            </Link>
          </div>
        </article>
      ))}
    </main>
  );
};

export default IndexPage;
