import qs from "query-string";
import useSWR from "swr";

import apiService, { type HttpServiceError } from "@/services/api";
import type { QueryString } from "@/types";

interface FetchStudentsConfig {
  query: QueryString;
}

function useFetchStudents<T>({ query }: FetchStudentsConfig) {
  const queryString = qs.stringify(query, { arrayFormat: "comma" });

  return useSWR<T, HttpServiceError>(
    `/student?${queryString}`,
    (url: string) => apiService.get(url),
    {
      onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
        const { status } = error;
        if (status === 404 || status === 400 || status === 403) return;

        if (retryCount >= 3) return;

        setTimeout(() => revalidate({ retryCount }), 5000);
      },
      revalidateOnFocus: false,
    }
  );
}

export default useFetchStudents;
