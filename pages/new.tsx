// pages/new.tsx
import FilmForm, { FormData as FilmFormData } from "../components/FilmForm";

const NewFilm = () => {
  const filmForm: FilmFormData = {
    person: "",
    favoriteFilm: "",
    releaseYear: new Date().getFullYear(),
  };

  return <FilmForm formId="add-film-form" filmForm={filmForm} forNewFilm />;
};

export default NewFilm;
