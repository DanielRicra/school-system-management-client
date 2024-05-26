import useSWR from "swr";
import qs from "query-string";

import apiService, { type HttpServiceError } from "@/services/api";
import type { QueryString } from "@/types";

interface FetchStudentsConfig {
  query: QueryString;
  shouldFetch?: boolean;
}

export function useFetchClassrooms<T>({
  query,
  shouldFetch = true,
}: FetchStudentsConfig) {
  const queryString = qs.stringify(query, { arrayFormat: "comma" });
  return useSWR<T, HttpServiceError>(
    shouldFetch ? `/classrooms?${queryString}` : null,
    (url: string) => apiService.get(url)
  );
}
