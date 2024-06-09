import qs from "query-string";
import useSWR from "swr";

import apiService, { type HttpServiceError } from "@/services/api";

export function useFetchUsersWithoutStudent<T>(fullName?: string) {
  const queryString = qs.stringify({ full_name: fullName });

  return useSWR<T, HttpServiceError>(
    `/users/without-student?${queryString}`,
    (url: string) => apiService.get(url)
  );
}

export function useFetchUsersWithoutTeacher<T>(fullName?: string) {
  const queryString = qs.stringify({ full_name: fullName });

  return useSWR<T, HttpServiceError>(
    `/users/without-teacher?${queryString}`,
    (url: string) => apiService.get(url)
  );
}
