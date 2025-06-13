import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Film from '../../../models/Film';          // Modell heisst jetzt Film

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;
  const { method } = req;

  await dbConnect();

  switch (method) {
    /* ========== GET /api/film/[id] ================== */
    case 'GET':
      try {
        const film = await Film.findById(id).lean();
        if (!film) {
          return res
            .status(404)
            .json({ success: false, error: 'Film not found' });
        }
        return res.status(200).json({ success: true, data: film });
      } catch (error) {
        return res
          .status(400)
          .json({ success: false, error: (error as Error).message });
      }

    /* ========== PUT /api/film/[id] ================== */
    case 'PUT':
      try {
        const film = await Film.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!film) {
          return res
            .status(404)
            .json({ success: false, error: 'Film not found' });
        }
        return res.status(200).json({ success: true, data: film });
      } catch (error) {
        return res
          .status(400)
          .json({ success: false, error: (error as Error).message });
      }

    /* ========== DELETE /api/film/[id] =============== */
    case 'DELETE':
      try {
        const { deletedCount } = await Film.deleteOne({ _id: id });
        if (deletedCount === 0) {
          return res
            .status(404)
            .json({ success: false, error: 'Film not found' });
        }
        return res.status(200).json({ success: true });
      } catch (error) {
        return res
          .status(400)
          .json({ success: false, error: (error as Error).message });
      }

    /* ========== Unsupported verb ==================== */
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res
        .status(405)
        .json({ success: false, error: `Method ${method} not allowed` });
  }
}
// This code handles the API requests for a specific film by its ID.
// It supports GET, PUT, and DELETE methods to retrieve, update, and delete a film respectively.
// The code connects to the database, processes the request based on the method, and returns appropriate responses.
// The GET method retrieves a film by its ID, the PUT method updates a film, and the DELETE method removes a film from the database.
// The code also handles errors and returns appropriate status codes and messages for each operation.
// The API is designed to work with a MongoDB database using Mongoose for data modeling.