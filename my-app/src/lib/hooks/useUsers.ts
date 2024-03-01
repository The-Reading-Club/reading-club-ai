import useSWR from "swr";
import fetcher from "../fetcher";

export const useUsers = () => {
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

export const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
