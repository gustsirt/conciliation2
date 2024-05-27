import { useEffect, useState } from 'react';
import SimpleTablePaginada from './SimpleTablePaginada.jsx'
import useFetchService from '../../hooks/useFetchService.jsx'
import PropTypes from 'prop-types';
import './initiatetablesimple.scss';
import FilterSelectors from './FilterSelectors.jsx';


const InitiateTableSimple = ({ endpoint, columns, handleCellClick, selectedValue, filters, filter, setFilter, refresh  }) => {
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
  }, [filter, endpoint, dataLoaded, refresh ]);

  function objToQueryString(obj) {
    if (Object.keys(obj).length === 0) {
      return '';
    }

    const keyValuePairs = [];
    
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (Array.isArray(value)) {
          value.forEach(val => {
            keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
          });
        } else {
          keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
        }
      }
    }

    return '?' + keyValuePairs.join('&');
  }

  return (
    <div className="table-container">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <>
          {!filters ? null : <FilterSelectors endpoint={endpoint} filters={filters} filter={filter} setFilter={setFilter}/>}
          <SimpleTablePaginada
            data={dataTable}
            columns={columns}
            handleCellClick={handleCellClick}
            selectedValue={selectedValue} />
        </>
      )}
    </div>
  )
}

InitiateTableSimple.propTypes = {
  endpoint: PropTypes.string,
  columns: PropTypes.array.isRequired,
  handleCellClick: PropTypes.func,
  selectedValue: PropTypes.object,
  allowedColumns: PropTypes.array,
};
export default InitiateTableSimple