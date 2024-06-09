import React, { useContext, useEffect, useState } from 'react';
import useFetchService from '../../hooks/useFetchService.jsx';
import FilterBESelectors from './FilterBESelectors.jsx';
import TableBase from './TableDef.jsx';
import { objToQueryString } from './Helper/objToQueryString.jsx';
import FileUpload from '../FileUpload/FileUpload.jsx';
import './generalStyles.scss';
import { ContextConfig } from '../../Context/ContextConfig.jsx';

const TableComponent = ({ backendConfig, tableOptions, title }) => {
  const {refresh, setRefresh} = useContext(ContextConfig)
  const { loading, fetchData } = useFetchService();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataAndSetData = async () => {
      try {
        const filterString = objToQueryString(backendConfig.filter);
        const response = await fetchData(backendConfig.endpoint + filterString);
        if (!response.isError) {
          setData(response.data);
        } else {
          setError(`Error al cargar la tabla. ${response.data}`);
        }
      } catch (error) {
        setError(`Se ha producido un error. ${error.message}`);
      }
    };
    fetchDataAndSetData();
  }, [backendConfig.filter, refresh, backendConfig.endpoint]);

  // TODO posiblemente reemplazar importando e contexto
  const handleDataRefresh = () => {
    setRefresh(prev => !prev);
  };

  return (
    <div>
      <h1 className='title'>{title}</h1>
      <div className="table-container">
        {loading ? (

          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <>
            {backendConfig.allowedFilters && (
              <FilterBESelectors
                endpoint={backendConfig.endpointfilter}
                filters={backendConfig.allowedFilters}
                filter={backendConfig.filter}
                setFilter={backendConfig.setFilter}
              />
            )}
            <TableBase
              data={data}
              options={tableOptions}
            />
          </>
        )}
      </div>
      {
        backendConfig.allowedUpload && (
          <FileUpload
            endpoint={backendConfig.endpoint + "fromfile/"}
            onDataUploaded={handleDataRefresh}
          />
        )
      }
    </div>
  );
};

export default TableComponent;