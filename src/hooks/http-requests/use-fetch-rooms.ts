import qs from "query-string";
import useSWR from "swr";

import apiService, { type HttpServiceError } from "@/services/api";
import type { QueryString } from "@/types";

interface FetchRoomsConfig {
  query: QueryString;
}

export function useFetchRooms<T>({ query }: FetchRoomsConfig) {
  const queryString = qs.stringify(query, { arrayFormat: "comma" });

  return useSWR<T, HttpServiceError>(`/rooms?${queryString}`, (url: string) =>
    apiService.get(url)
  );
}
