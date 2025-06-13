// pages/api/films/index.ts
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Film from "../../../models/Film";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const films = await Film.find({}); // alle Filme aus der DB
        // Füge jedem Objekt einen self-Link hinzu
        const data = films.map((f) => ({
          _id: f._id,
          person: f.person,
          favoriteFilm: f.favoriteFilm,
          releaseYear: f.releaseYear,
          link: `/api/films/${f._id}`,
        }));
        res.status(200).json({ success: true, data });
      } catch (error) {
        res.status(400).json({ success: false, message: "Fehler beim Laden der Filme" });
      }
      break;

    case "POST":
      try {
        const film = await Film.create(req.body); // neuen Film anlegen
        res.status(201).json({ success: true, data: film });
      } catch (error) {
        res.status(400).json({ success: false, message: "Fehler beim Anlegen des Films" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} not allowed`);
      break;
  }
}
