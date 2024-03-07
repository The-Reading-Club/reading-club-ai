import useSWR from "swr";
import fetcher from "../fetcher";
import { useQuery } from "@tanstack/react-query";

export const _useUsers = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/users", fetcher, {
    // revalidateOnReconnect: true,
    revalidateOnMount: true,
  });

  console.log("data", data);
  console.log("error", error);
  console.log("isLoading", isLoading);
  console.log("mutate", mutate);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useUsers = () => {
  const { data, error, isLoading, isFetching, refetch } = useQuery(
    {
      queryKey: ["users"],
      queryFn: () => fetcher("/api/users"),
      staleTime: 0, // Consider data stale immediately
      // cacheTime: 5 * 60 * 1000, // Cache time of 5 minutes
      // https://tanstack.com/query/v5/docs/framework/react/guides/migrating-to-v5#rename-cachetime-to-gctime
      gcTime: 0, // Garbage collection time of 5 minutes
      refetchOnWindowFocus: "always", // Refetch on window focus
    }
    // "users",
    // () => fetcher("/api/users")
    // // {
    // //   // React Query automatically refetches on mount and reconnect.
    // //   // If you need to adjust this behavior, explore options like `staleTime` and `cacheTime`.
    // // }
  );

  console.log("data", data);
  console.log("error", error);
  console.log("isLoading", isLoading); // isLoading is true only when the query has not completed at least once
  console.log("isFetching", isFetching); // isFetching is true whenever the query is fetching, including background refetches
  console.log("refetch", refetch); // Function to manually refetch the data

  // React Query does not have a direct equivalent to SWR's mutate function.
  // If you need to manually update the query data, use the `queryClient.setQueryData` method outside of this hook.
  // For manual refetching, use the `refetch` function provided by useQuery.

  return {
    data,
    error,
    isLoading: isLoading || isFetching, // Consider both loading and fetching states as loading if needed
    refetch, // Exposing refetch for manual data refresh
  };
};

export const useUser = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    userId ? `/api/users/${userId}` : null,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const _useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useCurrentUser = () => {
  const { data, error, isLoading, isFetching, refetch } = useQuery(
    {
      queryKey: ["current-user-reactquery"],
      queryFn: () => fetcher("/api/current"),
      staleTime: 0, // Consider data stale immediately
      // cacheTime: 5 * 60 * 1000, // Cache time of 5 minutes
      // https://tanstack.com/query/v5/docs/framework/react/guides/migrating-to-v5#rename-cachetime-to-gctime
      gcTime: 0, // Garbage collection time of 5 minutes
      refetchOnWindowFocus: "always", // Refetch on window focus
    }
    // "current",
    // () => fetcher("/api/current")
    // // {
    // //   // React Query automatically refetches on mount and reconnect.
    // //   // If you need to adjust this behavior, explore options like `staleTime` and `cacheTime`.
    // // }
  );

  return {
    data: data?.currentUser,
    error,
    isLoading: isLoading || isFetching, // Consider both loading and fetching states as loading if needed
    refetch, // Exposing refetch for manual data refresh
  };
};
