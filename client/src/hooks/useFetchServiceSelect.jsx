import { useState, useContext } from 'react';
import { ContextConfig } from '../Context/ContextConfig.jsx';

const useFetchServiceSelect = () => {
  const { baseUrl } = useContext(ContextConfig); // Obtener la baseUrl del contexto

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const [loading, setLoading] = useState(false);

  const fetchUniqueData = async (endpoint, field) => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/${endpoint}unique/${field}`);
      if(response.status >= 400) throw Error;
      setLoading(false);
      return await response.json();
    } catch (error) {
      setLoading(false);
      return { isError: true, message: "Ocurrió un error", error };
    }
  };

  return { loading, fetchUniqueData };
};

export default useFetchServiceSelect;
