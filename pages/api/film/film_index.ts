// pages/api/film/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import FilmModel from "../../../models/Film";

/**
 * API-Handler für die Abfrage aller Filme und Anlegen eines neuen Films
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "GET": {
      try {
        const film = await FilmModel.find({});
        return res.status(200).json({ success: true, data: film });
      } catch (error) {
        console.error("GET /api/film error:", error);
        return res.status(500).json({ success: false, message: "Fehler beim Laden der Filme" });
      }
    }
    case "POST": {
      try {
        // Erwartet JSON-Body mit { person, favoriteFilm, releaseYear }
        const film = await FilmModel.create(req.body);
        return res.status(201).json({ success: true, data: film });
      } catch (error: any) {
        console.error("POST /api/film error:", error);
        const message = error.message || "Fehler beim Anlegen des Films";
        return res.status(400).json({ success: false, message });
      }
    }
    default: {
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${method} not allowed`);
    }
  }
}
