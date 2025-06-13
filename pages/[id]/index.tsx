// pages/[id].tsx
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dbConnect from "../../lib/dbConnect";
import FilmModel from "../../models/Film";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery {
  id: string;
}

export interface SerializedFilm {
  _id: string;
  person: string;
  favoriteFilm: string;
  releaseYear: number;
}

type Props = {
  film: SerializedFilm;
};

const FilmPage = ({ film }: Props) => {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    try {
      await fetch(`/api/films/${film._id}`, {
        method: "DELETE",
      });
      router.push("/");
    } catch {
      setMessage("Failed to delete the film.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">{film.favoriteFilm}</h2>
        <p className="text-gray-700 mb-2">
          <span className="font-medium">Person:</span> {film.person}
        </p>
        <p className="text-gray-700 mb-4">
          <span className="font-medium">Erscheinungsjahr:</span> {film.releaseYear}
        </p>

        <div className="flex space-x-2">
          <Link href={`/${film._id}/edit`}>
            <a className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Edit
            </a>
          </Link>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
        {message && <p className="mt-4 text-red-600">{message}</p>}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({ params }: GetServerSidePropsContext<Params>) => {
  await dbConnect();

  if (!params?.id) {
    return { notFound: true };
  }

  const doc = await FilmModel.findById(params.id).lean();
  if (!doc || Array.isArray(doc)) {
    return { notFound: true };
  }

  const film: SerializedFilm = {
    _id: (doc._id as { toString: () => string }).toString(),
    person: doc.person,
    favoriteFilm: doc.favoriteFilm,
    releaseYear: doc.releaseYear,
  };

  return { props: { film } };
};

export default FilmPage;