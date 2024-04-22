import { useSession } from "next-auth/react";
import { useCallback, useMemo } from "react";

export const useAuthFromNextAuth = () => {
  const session = useSession();

  const { data, status } = session;

  const fetchAccessToken = useCallback(
    async ({ forceRefreshToken }: { forceRefreshToken: boolean }) => {
      if (forceRefreshToken) {
        const response = await fetch("/api/openid/refresh");

        const data = await response.json();
        console.log("fetchAccessToken DATA refresh", data);
        return data;
      } else {
        const response = await fetch("/api/openid/token");
        // Verify if response is null
        if (!response) {
          return null;
        }
        const data = await response.json();
        console.log("fetchAccessToken DATA token", data);
        return data;
      }
    },
    []
  );

  return useMemo(
    () => ({
      isLoading: status === "loading",
      //   isAuthenticated: data && "id_token" in data, //!!data,
      isAuthenticated: !!data, //!!data,
      fetchAccessToken,
    }),
    [fetchAccessToken, data, status]
  );
};
