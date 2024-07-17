import { useState, useContext } from 'react';
import { ContextConfig } from '../Context/ContextConfig.jsx';

const useFetchService = () => {
  const { baseUrl } = useContext(ContextConfig);

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const [loading, setLoading] = useState(false);

  const fetchData = async (endpoint, filters = "") => {
    try {
      setLoading(true);
      if (filters != "") {
        const queryString = new URLSearchParams(filters).toString();
        filters = "?"+queryString
      }
      const response = await fetch(`${baseUrl}/${endpoint}${filters}`, {
        method: 'GET',
        headers
      });
      if(response.status >= 400) throw Error;
      setLoading(false);
      return await response.json();
    } catch (error) {
      setLoading(false);
      return { isError: true, message: "Ocurrió un error", error };
    }
  };

  const postData = async (endpoint, body) => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });
      if(response.status >= 400) throw Error;
      setLoading(false);
      return await response.json();
    } catch (error) {
      setLoading(false);
      return { isError: true, message: "Ocurrió un error", error };
    }
  };

  const putData = async (endpoint, body) => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/${endpoint}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(body),
      });
      if(response.status >= 400) throw Error;
      setLoading(false);
      return await response.json();
    } catch (error) {
      setLoading(false);
      return { isError: true, message: "Ocurrió un error", error };
    }
  };

  const deleteData = async (endpoint) => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/${endpoint}`, {
        method: 'DELETE',
        headers,
      });
      if(response.status >= 400) throw Error;
      setLoading(false);
      return await response.json();
    } catch (error) {
      setLoading(false);
      return { isError: true, message: "Ocurrió un error", error };
    }
  };

  return { loading, fetchData, postData, putData, deleteData };
};

export default useFetchService;
