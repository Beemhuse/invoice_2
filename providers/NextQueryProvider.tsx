"use client";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

let queryClient: QueryClient | null = null;

interface NextQueryProviderProps {
  children: React.ReactNode;
}

export default function NextQueryProvider({ children }: NextQueryProviderProps) {
  if (!queryClient) {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 6000,
          retry: 2,
        },
      },
    });
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster />
      </QueryClientProvider>
  );
}
