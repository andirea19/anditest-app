// scripts/seed.ts
import mongoose from "mongoose";
import Film from "../models/Film";
import dbConnect from "../lib/dbConnect";

async function run() {
  await dbConnect();

  // Lösche alte Daten (optional)
  await Film.deleteMany({});

  // Dummy-Daten
  const films = [
    {
      person: "Alice Müller",
      favoriteFilm: "Inception",
      releaseYear: 2010,
    },
    {
      person: "Bob Schmidt",
      favoriteFilm: "The Matrix",
      releaseYear: 1999,
    },
    {
      person: "Clara Weber",
      favoriteFilm: "Interstellar",
      releaseYear: 2014,
    },
  ];

  // Insert
  await Film.insertMany(films);
  console.log("✅ Dummy-Daten eingefügt");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
