import { Request, Response } from "express";
import { ProductResult, iMovies } from "./interfaces/tables";
import { validateMovieData } from "./serializer/validateMovie";
import { client, movies } from "./database";
import format from "pg-format";
import { validateQuery } from "./serializer/validateQuery";

export const createMovie = async (
  req: Request,
  res: Response
): Promise<Response<iMovies, Record<string, iMovies>>> => {
  try {
    const validate: iMovies = validateMovieData(req.body);
    const queryString: string = format(
      `
         INSERT INTO "movies" (%I)
         VALUES (%L)
         RETURNING *;
        `,

      Object.keys(validate),
      Object.values(validate)
    );
    const queryResult: ProductResult = await client.query(queryString);
    movies.push(validate);
    return res.status(201).json(queryResult.rows);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(409).json({ message: error.message });
    }
    return res.status(500).json({ message: "error" });
  }
};

export const getAllMovies = async (
  req: Request,
  res: Response
): Promise<Response<iMovies, Record<string, iMovies>>> => {
  try {
    const query = validateQuery(req);

    let queryResult = await client.query(query.queryString);

    const baseUrl: string = `http://localhost:3000/movies/`;
    const previusPage: string | null =
      query.page <= 0
        ? null
        : `${baseUrl}?page=${Number(query.pageUrl) - 1}&perPage=${
            query.perPage
          }`;

    const nextPage: string | null =
      queryResult.rowCount === query.perPage
        ? `${baseUrl}?page=${Number(query.pageUrl) + 1}&perPage=${
            query.perPage
          }`
        : null;

    const pagination = {
      previusPage,
      nextPage,
      count: queryResult.rowCount,
      data: queryResult.rows,
    };
    return res.status(200).json(pagination);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(409).json({ message: error.message });
    }
    return res.status(500).json({ message: "error" });
  }
};

export const updateMovie = async (
  req: Request,
  res: Response
): Promise<Response<iMovies, Record<string, iMovies>>> => {
  try {
    const parms = req.params.id;

    const queryString = format(
      `
      UPDATE movies
      SET
      (%I) = ROW(%L)
      WHERE id = '%s'
      RETURNING *;
      `,
      Object.keys(req.body),
      Object.values(req.body),
      parms
    );

    const queryResult = await client.query(queryString);

    return res.status(200).json(queryResult.rows[0]);
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (
        error.message ===
        `duplicate key value violates unique constraint "movies_name_key"`
      ) {
        return res.status(409).json({ message: "Movie alredy exists" });
      }
      return res.status(409).json({ message: error.message });
    }
    return res.status(500).json({ message: "error" });
  }
};

export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const parms = req.params.id;

    const queryString = format(
      `
      DELETE FROM movies
      WHERE id = '%s'
      `,
      parms
    );

    await client.query(queryString);

    res.status(204).send();
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(409).json({ message: error.message });
    }
    return res.status(500).json({ message: "error" });
  }
};
