import { NextFunction, Request, Response } from "express";
import { QueryResult } from "pg";
import format from "pg-format";
import { client } from "../database";
import { iMovies } from "../interfaces/tables";

export const verifyIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<iMovies, Record<string, iMovies>>> => {
  const parms = req.params.id;

  try {
    const queryString = format(
      `
        SELECT *
        FROM movies
        WHERE id = %s;
      `,
      parms
    );

    const queryResult: QueryResult = await client.query(queryString);
    if (queryResult.rowCount === 0) {
      return res.status(404).json({ message: "movie not found" });
    } else {
      return next();
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(409).json({ message: error.message });
    }
    res.status(500).json({ message: "error" });
  }
};
