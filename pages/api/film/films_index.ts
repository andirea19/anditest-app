import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import FilmModel from "../../../models/Film";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const films = await FilmModel.find({});
  res.status(200).json(films);
}
