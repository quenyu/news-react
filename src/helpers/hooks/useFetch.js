import { useEffect, useState } from "react"

export const useFetch = (fetchFunction, params) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const stringParams = params ? new URLSearchParams(params).toString() : '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const result = await fetchFunction(params);

        setData(result);
      } catch (error) {
        setError(error)
        console.log("ERROR", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData();
  }, [fetchFunction, stringParams])

  return { data, isLoading, error }
}