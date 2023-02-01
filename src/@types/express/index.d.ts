declare global {
  namespace Express {
    interface Request {
      page: string | string[] | ParsedQs | ParsedQs[] | number;
      perPage: string | string[] | ParsedQs | ParsedQs[] | number;
      sort: string | string[] | ParsedQs | ParsedQs[] | null;
      order: string | string[] | ParsedQs | ParsedQs[] | null;
    }
  }
}
