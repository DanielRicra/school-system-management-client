import qs from "query-string";
import useSWR from "swr";

import apiService, { type HttpServiceError } from "@/services/api";
import type { QueryString } from "@/types";
import type { Teacher } from "@/services/types";

interface FetchTeachersConfig {
  query: QueryString;
}

export function useFetchTeachers<T>({ query }: FetchTeachersConfig) {
  const queryString = qs.stringify(query, { arrayFormat: "comma" });

  return useSWR<T, HttpServiceError>(
    `/teachers?${queryString}`,
    (url: string) => apiService.get(url)
  );
}

export function useFetchTeacher<T>(teacherId?: Teacher["id"]) {
  return useSWR<T, HttpServiceError>(
    teacherId ? `/teachers/${teacherId}` : null,
    (url: string) => apiService.get(url)
  );
}

export function useFetchTeacherCourses<T>(teacherId?: Teacher["id"] | string) {
  return useSWR<T, HttpServiceError>(
    teacherId ? `/teachers/${teacherId}/courses` : null,
    (url: string) => apiService.get(url)
  );
}
