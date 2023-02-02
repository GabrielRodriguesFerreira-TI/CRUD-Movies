import { movies } from "../database";
import { iMovies } from "../interfaces/tables";
import { typeOf } from "./typeOf";

export const validateMovieData = (payload: iMovies): iMovies => {
  const payloadKeys: string[] = Object.keys(payload);
  const requiredKeys: string[] = ["name", "duration", "price"];
  const requiredKeysMore: string[] = [
    "name",
    "description",
    "duration",
    "price",
  ];

  const hasRequiredKeys: boolean = payloadKeys.every((key: string) => {
    return requiredKeysMore.includes(key);
  });

  const hasRequiredKeysLess: boolean = requiredKeys.every((key: string) => {
    return payloadKeys.includes(key);
  });

  if (!hasRequiredKeysLess) {
    throw new Error('The list fields are: "name", "duration", "price"');
  }

  if (!hasRequiredKeys) {
    throw new Error(
      'The list fields are: "name", "description", "duration", "price"'
    );
  }

  movies.forEach((element) => {
    const result = element.name.includes(payload.name);

    if (result) {
      throw new Error("Movie already exists.");
    }
  });

  if (!typeOf("string", payload.name)) {
    throw new Error("The movie name need to be a string");
  }

  if (payload.description) {
    if (!typeOf("string", payload.description)) {
      throw new Error("The movie description need to be a string");
    }
  }

  if (!typeOf("number", payload.duration)) {
    throw new Error("The movie duration need to be a number");
  }

  if (!typeOf("number", payload.price)) {
    throw new Error("The movie price need to be a number");
  }

  return payload;
};
