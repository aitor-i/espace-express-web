import { useState } from "react";

export interface IFetchParams {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: { [key: string]: string };
  body?: {};
}

export const useFetch = <T>() => {
  const [fetchingStatus, setFetchingStatus] = useState<
    "idle" | "loading" | "succeeded" | "failed"
  >("idle");
  const [response, setResponse] = useState<T>();

  const fetcher = async ({ url, method, headers, body }: IFetchParams) => {
    try {
      setFetchingStatus("loading");
      const res: T = await (
        await fetch(url, {
          method: method,
          body: JSON.stringify(body),
          headers: headers,
        })
      ).json();
      setResponse(res);
      setFetchingStatus("succeeded");
    } catch (error) {
      setFetchingStatus("failed");
    }
  };

  return { fetchingStatus, response, fetcher };
};
