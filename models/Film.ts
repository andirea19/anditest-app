import mongoose, { Document, Schema } from "mongoose";

export interface Film extends Document {
  person: string;
  favoriteFilm: string;
  releaseYear: number;
}

/* FilmSchema entspricht dann einer Collection „films“ */
const FilmSchema: Schema<Film> = new Schema({
  person: {
    type: String,
    required: [true, "Bitte gib den Namen der Person an"],
    maxlength: [100, "Der Name darf nicht länger als 100 Zeichen sein"],
  },
  favoriteFilm: {
    type: String,
    required: [true, "Bitte gib einen Lieblingsfilm an"],
    maxlength: [200, "Filmtitel darf nicht länger als 200 Zeichen sein"],
  },
  releaseYear: {
    type: Number,
    required: [true, "Bitte gib das Erscheinungsjahr an"],
    min: [1888, "Erscheinungsjahr muss ab 1888 liegen"], // erster Film ab 1888
    max: [new Date().getFullYear(), "Erscheinungsjahr darf nicht in der Zukunft liegen"],
  },
});

export default mongoose.models.Film || mongoose.model<Film>("Film", FilmSchema);
