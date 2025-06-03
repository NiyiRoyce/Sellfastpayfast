"use client";
import BACKEND_URLS from "../utils/urls";
import { useQuery } from "@tanstack/react-query";
import { instance } from "./config";

export const useGetAllRates = () => {
  return useQuery({
    queryKey: ["getAllRates"],
    queryFn: () =>
      instance
        .get(BACKEND_URLS.rate + `/rates`)
        .then((res: any) => res.data)
        .catch((err: any) => {
          throw err?.response?.data;
        }),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
