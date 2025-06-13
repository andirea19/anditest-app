// components/FilmForm.tsx
import { useState } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";

export interface FormData {
  person: string;
  favoriteFilm: string;
  releaseYear: number;
}

type Props = {
  formId: string;
  filmForm: FormData;
  forNewFilm?: boolean;
};

const FilmForm = ({ formId, filmForm, forNewFilm = true }: Props) => {
  const router = useRouter();
  const contentType = "application/json";
  const [form, setForm] = useState<FormData>(filmForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [message, setMessage] = useState("");

  const putData = async (data: FormData) => {
    const { id } = router.query;
    try {
      const res = await fetch(`/api/films/${id}`, {
        method: "PUT",
        headers: { "Content-Type": contentType },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(res.statusText);
      const json = await res.json();
      mutate(`/api/films/${id}`, json.data, false);
      router.push("/");
    } catch {
      setMessage("Failed to update film");
    }
  };

  const postData = async (data: FormData) => {
    try {
      const res = await fetch("/api/films", {
        method: "POST",
        headers: { "Content-Type": contentType },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(res.statusText);
      router.push("/");
    } catch {
      setMessage("Failed to add film");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === "releaseYear" ? Number(value) : value,
    }));
  };

  const validate = () => {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (!form.person) errs.person = "Required";
    if (!form.favoriteFilm) errs.favoriteFilm = "Required";
    if (!form.releaseYear || form.releaseYear < 1888) errs.releaseYear = "Invalid year";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    forNewFilm ? postData(form) : putData(form);
  };

  return (
    <form id={formId} onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="person">Person</label>
        <input
          id="person"
          name="person"
          type="text"
          value={form.person}
          onChange={handleChange}
          className="block w-full border rounded p-2"
        />
        {errors.person && <p className="text-red-600">{errors.person}</p>}
      </div>

      <div>
        <label htmlFor="favoriteFilm">Lieblingsfilm</label>
        <input
          id="favoriteFilm"
          name="favoriteFilm"
          type="text"
          value={form.favoriteFilm}
          onChange={handleChange}
          className="block w-full border rounded p-2"
        />
        {errors.favoriteFilm && <p className="text-red-600">{errors.favoriteFilm}</p>}
      </div>

      <div>
        <label htmlFor="releaseYear">Erscheinungsjahr</label>
        <input
          id="releaseYear"
          name="releaseYear"
          type="number"
          value={form.releaseYear}
          onChange={handleChange}
          className="block w-full border rounded p-2"
        />
        {errors.releaseYear && <p className="text-red-600">{errors.releaseYear}</p>}
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Submit
      </button>
      {message && <p className="text-red-600 mt-2">{message}</p>}
    </form>
  );
};

export default FilmForm;
//