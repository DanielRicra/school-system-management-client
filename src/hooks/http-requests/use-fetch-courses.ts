import useSWR from "swr";
import qs from "query-string";

import apiService, { type HttpServiceError } from "@/services/api";
import type { QueryString } from "@/types";
import type { Course } from "@/services/types";

interface FetchStudentsConfig {
  query: QueryString;
  shouldFetch?: boolean;
}

export function useFetchCourses<T>({
  query,
  shouldFetch = true,
}: FetchStudentsConfig) {
  const queryString = qs.stringify(query, { arrayFormat: "comma" });
  return useSWR<T, HttpServiceError>(
    shouldFetch ? `/courses?${queryString}` : null,
    (url: string) => apiService.get(url)
  );
}

export function useFetchCourse<T>(courseId?: Course["id"]) {
  return useSWR<T, HttpServiceError>(
    courseId ? `/courses/${courseId}` : null,
    (url: string) => apiService.get(url)
  );
}
