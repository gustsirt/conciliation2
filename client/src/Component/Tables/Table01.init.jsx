import { useEffect, useState } from 'react';
import useFetchService from '../../hooks/useFetchService.jsx'
import './generalStyles.scss';
import TableWithGlobalFilter from './Table01.withGlobalFilter.jsx';
import { objToQueryString } from './auxFunction.jsx';


const Table01Init = ({ endpoint, columns, handleCellClick, selectedValue, filter, refresh  }) => {
  const { loading, fetchData } = useFetchService();
  const [dataTable, setDataTable] = useState([]);
  const [error, setError] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [tempFilter, setTempFilter] = useState({}); // sin uso

  // Carga los datos de la tabla
  useEffect(() => {
    const greatfilter = {...filter, ...tempFilter}
    console.log(greatfilter);
    let filterstring = objToQueryString(greatfilter)
    async function fetchDataAndSetDataTable() {
      try {
        const resp = await fetchData(endpoint+filterstring);
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
  }, [filter, endpoint, dataLoaded, refresh ]);

  return (
    <div className="table-container">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <>
          <TableWithGlobalFilter
            data={dataTable}
            columns={columns}
            handleCellClick={handleCellClick}
            selectedValue={selectedValue} />
        </>
      )}
    </div>
  )
}

export default Table01Init