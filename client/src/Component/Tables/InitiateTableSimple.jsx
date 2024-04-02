import { useEffect, useState } from 'react';
import SimpleTablePaginada from './SimpleTablePaginada.jsx'
import useFetchService from '../../hooks/useFetchService.jsx'
import PropTypes from 'prop-types';
import './initiatetablesimple.scss';


const InitiateTableSimple = ({ endpoint, columns, handleCellClick }) => {
  const { loading, fetchData} = useFetchService();
  const [dataTable, setDataTable] = useState([]);
  const [error, setError] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  
  useEffect( () => {
    async function fetchDataAndSetDataTable () {
      try {
        const resp = await fetchData(endpoint);
        if (!resp.isError) {
          setDataTable(resp.data);
          setDataLoaded(false);
        } else {
          setError("Error al cargar la tabla. " + resp.data);
        }
      } catch (error) {
        setError("Se ha producido un error. " + error);
      }
    }

    if (!dataLoaded) {
      fetchDataAndSetDataTable();
    }
  }, [endpoint, dataLoaded]);




  return (
    <div className="table-container">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <SimpleTablePaginada data={dataTable} columns={columns} handleCellClick={handleCellClick}/>
      )}
    </div>
  )
}

InitiateTableSimple.propTypes = {
  endpoint: PropTypes.string,
  columns: PropTypes.array.isRequired,
};
export default InitiateTableSimple