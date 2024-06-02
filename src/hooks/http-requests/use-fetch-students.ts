import qs from "query-string";
import useSWR from "swr";

import apiService, { type HttpServiceError } from "@/services/api";
import type { QueryString } from "@/types";
import type { Student } from "@/services/types";

interface FetchStudentsConfig {
  query: QueryString;
}

function useFetchStudents<T>({ query }: FetchStudentsConfig) {
  const queryString = qs.stringify(query, { arrayFormat: "comma" });

  return useSWR<T, HttpServiceError>(
    `/students?${queryString}`,
    (url: string) => apiService.get(url)
  );
}

export function useFetchStudent<T>(studentId?: Student["id"]) {
  return useSWR<T, HttpServiceError>(
    studentId ? `/students/${studentId}` : null,
    (url: string) => apiService.get(url)
  );
}
