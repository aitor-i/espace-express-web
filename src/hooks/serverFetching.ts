import { cache } from "react";

export const serverFetching = cache(
  (url: string, headers?: Headers, method?: "GET" | "POST" | "PUT") => {
    const endpoint = new URL(url);

    return fetch(endpoint, { headers, method })
      .then((res) => res.json())
      .catch((err) => null);
  }
);
