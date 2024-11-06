import React, { useState } from 'react'

function useFetch(url) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState({
      isError: false,
      message: "",
    });

    async function handleDeleteData() {
      try{
        setLoading(true);
        const response = await fetch(url, {
          method: "DELETE",
        });
        const result = await response.json()

        if(result.success === true){
          setData(result.data);
          setError({
            isError: false,
            message: "",
          })
        }
        else{
          setError({
            isError: true,
            message: result.message,
          })
        }
      }
      catch(err){
        console.log(err);
        setError({
          isError: true,
          message: err.message,
        })
      }
      finally{
        setLoading(false);
      }
    }

    async function handleDataFech() {
      try{
        setLoading(true);
        const response = await fetch(url);
        const result = await response.json()

        if(result.success === true){
          setData(result.data);
          setError({
            isError: false,
            message: "",
          })
        }
        else{
          setError({
            isError: true,
            message: result.message,
          })
        }
      }
      catch(err){
        console.log(err);
        setError({
          isError: true,
          message: err.message,
        })
      }
      finally{
        setLoading(false);
      }
    }
    

    return {
      loading,
      data,
      error,
      handleDataFech,
      handleDeleteData
    }

}

export default useFetch
