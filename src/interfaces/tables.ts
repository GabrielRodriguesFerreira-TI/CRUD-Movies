import { QueryResult } from "pg";

export interface iMovies {
  id: number;
  name: string;
  description?: string | undefined;
  duration: number;
  price: number;
}

export interface ParsedQs {
  [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[];
}

export type ProductCreate = Omit<iMovies, "id">;
export type ProductResult = QueryResult<iMovies>;
