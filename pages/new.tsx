// pages/new.tsx
import { NextPage } from "next";
import FilmForm, { FormData as FilmFormData } from "../components/FilmForm";

const NewFilm: NextPage = () => {
  const initialForm: FilmFormData = {
    person: "",
    favoriteFilm: "",
    releaseYear: new Date().getFullYear(),
  };

  return (
    <main
      className="
        flex items-center justify-center min-h-screen p-8
        bg-neutral-50 text-gray-800
        dark:bg-gray-900 dark:text-gray-200
      "
    >
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">Neuen Film eintragen</h1>
        <FilmForm
          formId="add-film-form"
          filmForm={initialForm}
          forNewFilm
        />
      </div>
    </main>
  );
};

export default NewFilm;
export type { FilmFormData };