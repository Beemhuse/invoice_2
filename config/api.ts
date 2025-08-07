import { api } from "./_config";

export const fetchData = async <T = any>(
  endpoint: string,
  params?: Record<string, string | number | boolean>
): Promise<T> => {
  const response = await api.get<T>(endpoint, { params });
  return response.data;
};

// POST request (JSON or multipart)
export const postData = async <T = any>(
  endpoint: string,
  data: any,
): Promise<T> => {
  const response = await api.post<T>(endpoint, data);
  return response.data;
};

// PUT request
export const updateData = async <T = any>(
  endpoint: string,
  data: any
): Promise<T> => {
  const response = await api.put<T>(endpoint, data);
  return response.data;
};

// PATCH request
export const patchData = async <T = any>(
  endpoint: string,
  data: any
): Promise<T> => {
  const response = await api.patch<T>(endpoint, data);
  return response.data;
};

// DELETE request (no body)
export const deleteData = async <T = any>(
  endpoint: string
): Promise<T> => {
  const response = await api.delete<T>(endpoint);
  return response.data;
};


