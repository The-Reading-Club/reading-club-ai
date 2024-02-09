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
        return data;
      } else {
        const response = await fetch("/api/openid/token");
        const data = await response.json();
        return data;
      }
    },
    []
  );

  return useMemo(
    () => ({
      isLoading: status === "loading",
      isAuthenticated: !!data,
      fetchAccessToken,
    }),
    [fetchAccessToken, data, status]
  );
};
