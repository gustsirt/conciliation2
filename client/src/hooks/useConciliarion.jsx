import { useState } from 'react';
import useFetchService from './useFetchService.jsx';

const useConciliation = (backendFilter01, backendFilter02) => {
  const { postData, deleteData } = useFetchService();
  const [linking, setLinking] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleLink = async () => {
    setLinking(true);
    const body = { configObject: { backendFilter01, backendFilter02 } };
    await postData('api/link/mark', body);
    setLinking(false);
    setRefresh(prev => !prev);
  };

  const handleClean = async () => {
    setLinking(true);
    const body = { configObject: { backendFilter01, backendFilter02 } };
    await deleteData('api/link/mark', body);
    setLinking(false);
    setRefresh(prev => !prev);
  };

  const marking = async (rowSelection1, rowSelection2) => {
    if (rowSelection1.length > 0 || rowSelection2.length > 0) {
      for (const row of rowSelection1) {
        await postData(`api/link/match/${row["_id"]}/${rowSelection2[0]["_id"]}`, {});
      }
      for (const row of rowSelection2) {
        await postData(`api/link/match/${rowSelection1[0]["_id"]}/${row["_id"]}`, {});
      }
      setRefresh(prev => !prev);
    }
  };

  const unmarking = async (rowSelection1, rowSelection2) => {
    if (rowSelection1.length > 0) {
      for (const row of rowSelection1) {
        await deleteData(`api/link/match/${row["_id"]}/1`, {});
      }
    }
    if (rowSelection2.length > 0) {
      for (const row of rowSelection2) {
        await deleteData(`api/link/match/${row["_id"]}/2`, {});
      }
    }
    if (rowSelection1.length > 0 || rowSelection2.length > 0) {
      setRefresh(prev => !prev);
    }
  };

  return {
    linking,
    refresh,
    handleLink,
    handleClean,
    marking,
    unmarking
  };
};

export default useConciliation;