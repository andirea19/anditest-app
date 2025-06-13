// pages/film/index.tsx
import dbConnect from "@/lib/dbConnect";
import Film from "@/models/Film";
import type { GetServerSideProps } from "next";

type Props = {
  films: {
    _id: string;
    person: string;
    favoriteFilm: string;
    releaseYear: number;
  }[];
};

export default function FilmPage({ films }: Props) {
  return (
    <main>
      <h1>Filmliste</h1>
      <ul>
        {films.map((f) => (
          <li key={f._id}>
            {f.person}: {f.favoriteFilm} ({f.releaseYear})
          </li>
        ))}
      </ul>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  await dbConnect();
  const films = await Film.find({}).lean();
  return { props: { films: films.map((f) => ({ 
    _id: f._id.toString(),
    person: f.person,
    favoriteFilm: f.favoriteFilm,
    releaseYear: f.releaseYear,
  })) } };
};
