import { useCallback, useState } from "react";

export default function useHttp(fetchFn, initialValue) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [fetchedData, setFetchedData] = useState(initialValue);

  const executeFetch = useCallback(async () => {
    setIsFetching(true);
    try {
      const data = await fetchFn();
      setFetchedData(data);
      setError(null); // Resetting error state on successful fetch
    } catch (error) {
      setError({ message: error.message || "Failed to fetch data." });
    }
    setIsFetching(false);
  }, [fetchFn]);

  return { isFetching, fetchedData, error, executeFetch, setFetchedData };
}
