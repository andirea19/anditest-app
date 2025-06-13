// pages/api/film/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
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
        const films = await Film.find({});
        const data = films.map((f: any) => ({
          _id: f._id,
          person: f.person,
          favoriteFilm: f.favoriteFilm,
          releaseYear: f.releaseYear,
          link: `/api/film/${f._id}`,
        }));
        return res.status(200).json({ success: true, data });
      } catch {
        return res
          .status(400)
          .json({ success: false, message: "Fehler beim Laden der Filme" });
      }

    case "POST":
      try {
        const film = await Film.create(req.body);
        return res.status(201).json({ success: true, data: film });
      } catch {
        return res
          .status(400)
          .json({ success: false, message: "Fehler beim Anlegen des Films" });
      }

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res
        .status(405)
        .end(`Method ${method} not allowed`);
  }
}
