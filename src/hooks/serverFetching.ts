import { cache } from "react";

export const serverFetching = cache((url: string) => {
  const endpoint = new URL(url);

  return fetch(endpoint)
    .then((res) => res.json())
    .catch((err) => null);
});
