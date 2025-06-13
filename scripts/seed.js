// scripts/seed.js
require('dotenv').config();
const mongoose = require('mongoose');

/* Inline-Schema, identisch zu Deinem Film-Model (aus models/Film.ts) */
const FilmSchema = new mongoose.Schema(
  {
    person: { type: String, required: true },
    favoriteFilm: { type: String, required: true },
    releaseYear: { type: Number, required: true },
  },
  { timestamps: true }
);

const Film = mongoose.models.Film || mongoose.model('Film', FilmSchema);

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🔌 Verbunden mit Atlas');

    await Film.deleteMany({});
    const dummy = [
      { person: 'Alice', favoriteFilm: 'The Matrix', releaseYear: 1999 },
      { person: 'Bob',   favoriteFilm: 'Interstellar', releaseYear: 2014 },
      { person: 'Carol', favoriteFilm: 'Parasite',     releaseYear: 2019 },
    ];
    const result = await Film.insertMany(dummy);
    console.log(`✅ Eingefügt: ${result.length} Dokumente`);
  } catch (err) {
    console.error('❌ Fehler beim Seeden:', err);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Verbindung geschlossen');
  }
}

run();
// Führe das Skript mit `node scripts/seed.js` aus, um die Datenbank zu befüllen
// Stelle sicher, dass Du eine .env-Datei mit der MONGODB_URI hast