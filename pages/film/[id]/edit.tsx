// pages/film/[id]/edit.tsx
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import dbConnect from "@/lib/dbConnect";
import Film from "@/models/Film";
import FilmForm, { FormData } from "@/components/FilmForm";

interface EditProps {
  filmData: FormData & { _id: string };
}

const EditFilmPage: NextPage<EditProps> = ({ filmData }) => {
  return (
    <>
      <Head>
        <title>Edit {filmData.person}’s Favorite Film</title>
      </Head>
      <main className="mx-auto max-w-xl p-8">
        <h1 className="text-2xl font-bold mb-6">
          Editiere Favoriten-Film von {filmData.person}
        </h1>
        <FilmForm
          formId={`edit-film-${filmData._id}`}
          filmForm={filmData}
          forNewFilm={false}
        />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<EditProps> = async ({ params }) => {
  await dbConnect();

  const doc = await Film.findById(params?.id).lean();
  if (!doc || Array.isArray(doc)) {
    return { notFound: true };
  }

  // _id to string, rest zum FormData mappen
  const filmData: EditProps["filmData"] = {
    _id: (doc._id as { toString: () => string }).toString(),
    person: doc.person,
    favoriteFilm: doc.favoriteFilm,
    releaseYear: doc.releaseYear,
  };

  return { props: { filmData } };
};

export default EditFilmPage;
