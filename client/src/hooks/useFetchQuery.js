import React, { useEffect, useRef, useState } from "react";

function useFetchQuery(url, refetchKeys = [], onSuccess = () => {}, onError = () => {} ) {

  const [change, setChange] = useState(0);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState({
    isError: false,
    message: "",
    error: null,
  });

  function handleRefetch() {
    setChange((prev) => prev + 1);
  }

  useEffect(() => {
    async function handleDataFech() {
        try {
            setLoading(true);
            const response = await fetch(url);
            const result = await response.json();
            if (result.success === true) {
                setData(result.data);
                setError({
                    isError: false,
                    message: "",
                    error: null,
                });
                await onSuccess();
            } else {
                setError({
                    isError: true,
                    message: result.message,
                    error: result?.error,
                });
                await onError();
            }
        }
        catch (err) {
            console.log(err);
            setError({
                isError: true,
                message: err.message,
                error: err,
            });
            await onError();
        }
        finally {
            setLoading(false);
        }
    }

    handleDataFech();
  }, [...refetchKeys, change]);

  return { loading, data, error, handleRefetch };
}

export default useFetchQuery;
