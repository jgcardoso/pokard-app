import React from 'react'
import axios from 'axios'

const useFetch = () => {
  const [data, setData] = React.useState(null);
  const [dataLength, setDataLength] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(null);

  const request = React.useCallback(async (url, options, reload) => {
    let response;

    try {
      setError(null);
      if(!reload.data) setLoading(true);

      const params = {
        page: options.page,
        pageSize: options.pageSize
      };

      //https://api.pokemontcg.io/v2/cards
      response = await axios.get(url, { params });
      

      if(!reload.data) setData(response.data.data);
      if(reload.data) {
        setData([...reload.data, ...response.data.data]);
      }

      setDataLength(response.data.totalCount);

    } catch (error) {
      setError('Error: ' + error.message)
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    {
      data,
      dataLength,
      loading,
      error,
      request
    }
  )
};

export default useFetch;