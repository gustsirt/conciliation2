import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAppStore } from '../Store/useAppStore.jsx';

const useFetchService = () => {
  const { baseUrl } = useAppStore()
  const queryClient = useQueryClient()

  
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const [loading, setLoading] = useState(false);

  const fetchData = (endpoint) => {
    return useQuery([endpoint], async () => {
      const { data } = await axios.get(`${baseUrl}/${endpoint}`);
      return data;
    });
  };

  const postData = (endpoint, body) => {
    return useMutation(
      async () => {
        const { data } = await axios.post(`${baseUrl}/${endpoint}`, body);
        return data;
      },{
        onSuccess: () => {
          queryClient.invalidateQueries([endpoint]);
      }}
  )};

  const putData = (endpoint, body) => {
    return useMutation(
      async () => {
        const { data } = await axios.put(`${baseUrl}/${endpoint}`, body);
        return data;
      },{
        onSuccess: () => {
          queryClient.invalidateQueries([endpoint]);
        }}
  )};

  const deleteData = (endpoint, body = {}) => {
    return useMutation(
      async () => {
        const { data } = await axios.delete(`${baseUrl}/${endpoint}`, { data: body });
        return data;
      },{
        onSuccess: () => {
          queryClient.invalidateQueries([endpoint]);
      }}
  )};

  return { fetchData, postData, putData, deleteData };
};

export default useFetchService;
