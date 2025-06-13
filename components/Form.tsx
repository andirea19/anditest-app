import { useState } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";

interface FormData {
  person: string;
  favoriteFilm: string;
  releaseYear: number;
}

interface ErrorState {
  person?: string;
  favoriteFilm?: string;
  releaseYear?: string;
}

type Props = {
  formId: string;
  filmForm: FormData;
  forNewFilm?: boolean;
};

const FilmForm = ({ formId, filmForm, forNewFilm = true }: Props) => {
  const router = useRouter();
  const contentType = "application/json";
  const [errors, setErrors] = useState<ErrorState>({});
  const [message, setMessage] = useState("");

  const [form, setForm] = useState<FormData>({
    person: filmForm.person,
    favoriteFilm: filmForm.favoriteFilm,
    releaseYear: filmForm.releaseYear,
  });

  /* PUT edits einen bestehenden Film */
  const putData = async (form: FormData) => {
    const { id } = router.query;
    try {
      const res = await fetch(`/api/film/${id}`, {
        method: "PUT",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(res.status.toString());
      const { data } = await res.json();
      mutate(`/api/film/${id}`, data, false);
      router.push("/");
    } catch {
      setMessage("Failed to update film");
    }
  };

  /* POST legt einen neuen Film an */
  const postData = async (form: FormData) => {
    try {
      const res = await fetch("/api/films", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(res.status.toString());
      router.push("/");
    } catch {
      setMessage("Failed to add film");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "releaseYear" ? Number(value) : value,
    }));
  };

  const formValidate = () => {
    const err: ErrorState = {};
    if (!form.person) err.person = "Person is required";
    if (!form.favoriteFilm) err.favoriteFilm = "Film title is required";
    if (!form.releaseYear || form.releaseYear < 1888)
      err.releaseYear = "Enter a valid year (>=1888)";
    return err;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = formValidate();
    if (Object.keys(validation).length === 0) {
      forNewFilm ? postData(form) : putData(form);
    } else {
      setErrors(validation);
    }
  };

  return (
    <>
      <form id={formId} onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="person" className="block">Person</label>
          <input
            type="text"
            name="person"
            value={form.person}
            onChange={handleChange}
            required
            className="mt-1 block w-full border rounded px-2 py-1"
          />
          {errors.person && <p className="text-red-600">{errors.person}</p>}
        </div>

        <div>
          <label htmlFor="favoriteFilm" className="block">Lieblingsfilm</label>
          <input
            type="text"
            name="favoriteFilm"
            value={form.favoriteFilm}
            onChange={handleChange}
            required
            className="mt-1 block w-full border rounded px-2 py-1"
          />
          {errors.favoriteFilm && <p className="text-red-600">{errors.favoriteFilm}</p>}
        </div>

        <div>
          <label htmlFor="releaseYear" className="block">Erscheinungsjahr</label>
          <input
            type="number"
            name="releaseYear"
            value={form.releaseYear}
            onChange={handleChange}
            required
            min={1888}
            max={new Date().getFullYear()}
            className="mt-1 block w-full border rounded px-2 py-1"
          />
          {errors.releaseYear && <p className="text-red-600">{errors.releaseYear}</p>}
        </div>

        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Submit
        </button>
      </form>

      {message && (
        <p className="mt-4 text-red-600">{message}</p>
      )}
    </>
  );
};

export default FilmForm;
