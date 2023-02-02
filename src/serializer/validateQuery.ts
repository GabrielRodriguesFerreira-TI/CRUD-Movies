import format from "pg-format";

export const validateQuery = (req: any) => {
  let page: number = Number(req.query.page) || 1;
  let perPage: number = Number(req.query.perPage) || 5;
  let sort: string | null = req.query.sort?.toString().toLowerCase() || null;
  let order: string | null = req.query.order?.toString().toUpperCase() || "ASC";

  if (page <= 0) {
    page = 1;
  }

  if (perPage > 5 || perPage <= 0) {
    perPage = 5;
  }

  if (sort !== "price" && sort !== "duration") {
    sort = null;
  }

  if (sort !== null && order !== "DESC") {
    order = "ASC";
  }

  const pageUrl = page;

  page = page * perPage - perPage;

  let queryString: string = "";

  if (sort === null) {
    queryString = format(
      `
         SELECT
              *
         FROM
              movies
         LIMIT %s OFFSET %s;
        `,

      perPage,
      page
    );
  } else {
    queryString = format(
      `
          SELECT
              *
          FROM
              movies
          ORDER BY "%s" %s
          LIMIT %s OFFSET %s;
        `,

      sort,
      order,
      perPage,
      page
    );
  }

  return {
    page: page,
    pageUrl: pageUrl,
    perPage: perPage,
    queryString: queryString,
  };
};
