"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteData,
  fetchData,
  patchData,
  postData,
  updateData,
} from "../config/api";
import { handleGenericError } from "@/lib/error-handler";
import { toast } from "@/components/ui/use-toast";

export const useFetchData = (endpoint: string, queryKey: string) => {
  return useQuery({
    queryKey: [queryKey, endpoint],
    queryFn: () => fetchData(endpoint),
    refetchOnWindowFocus: false,
  });
};

export const useCreateData = (endpoint: string, queryKey: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const response = await postData(endpoint, data);
      return response;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [queryKey, endpoint] });
      return response;
    },
    onError: (error) => {
      const errorMessage = handleGenericError(error);
      toast(errorMessage);
      throw new Error(errorMessage);
    },
  });
};

export const useUpdateData = (endpoint: string, queryKey: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newData) => {
      const response = await updateData(endpoint, newData);
      return response;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [queryKey, endpoint] });
      return response;
    },
    onError: (error) => {
      const errorMessage = handleGenericError(error);
      // toast.error(errorMessage);
      throw new Error(errorMessage);
    },
  });
};

export const usePatchData = (endpoint: string, queryKey: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const resolvedEndpoint =
        typeof endpoint === "function" ? endpoint(id) : endpoint;
      const response = await patchData(resolvedEndpoint, data);
      return response.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [queryKey, endpoint] });
      return response;
    },
    onError: (error) => {
      const errorMessage = handleGenericError(error);
      toast.error(errorMessage);
      throw new Error(errorMessage);
    },
  });
};


