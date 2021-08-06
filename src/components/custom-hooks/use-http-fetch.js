import {useState} from 'react'

const useHttpFetch = async (fetchData) => {

    const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  let data = '';


    setIsLoading(true);
    setError(null);
    try {
        const response = await fetch(
            fetchData.url,
            {
              method: fetchData.method ? fetchData.method : 'GET',
              body: fetchData.request ? JSON.stringify({ text: fetchData.request }) : null,
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const responseData = await response.json();
      data = responseData;
      


    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);

return (
    {
        isLoading,
        error,
        data,
    }
)

}

export default useHttpFetch;