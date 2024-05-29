import { useEffect, useState } from 'react';
import useFetchService from '../../hooks/useFetchService.jsx'
import './generalStyles.scss';
import FilterSelectors from './FilterSelectors.jsx';
import TableBase from './Table00.Base.jsx';
import { objToQueryString } from './auxFunction.jsx';

const TableBaseInitWithFilter = ({ endpoint, columns, filters, filter, setFilter  }) => {
  const { loading, fetchData } = useFetchService();
  const [dataTable, setDataTable] = useState([]);
  const [error, setError] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Carga los datos de la tabla
  useEffect(() => {
    let filterstring = objToQueryString(filter)
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
  }, [filter, endpoint, dataLoaded ]);

  return (
    <div className="table-container">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <>
          {!filters ? null : <FilterSelectors endpoint={endpoint} filters={filters} filter={filter} setFilter={setFilter}/>}
          <TableBase
            data={dataTable}
            columns={columns}/>
        </>
      )}
    </div>
  )
}

export default TableBaseInitWithFilter