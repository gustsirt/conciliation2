import { useEffect, useState } from 'react';
import useFetchService from '../../hooks/useFetchService.jsx'
import './generalStyles.scss';
import FilterBESelectors from './Helper/FilterBESelectors.jsx';
import TableBase from './TableDef.jsx';
import { objToQueryString } from './Helper/objToQueryString.jsx';

// ! SE USA SOLAMENTE EN COMPARE 2 pero debe ser reemplazada por TABLECOMPONENT

const TableInit = ({ backend, tableOptions }) => {
  const { loading, fetchData } = useFetchService();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  // Carga los datos de la tabla
  useEffect(() => {
    const fetchDataAndSetData = async () => {
      try {
        const filterstring = objToQueryString(backend.filter);
        const resp = await fetchData(backend.endpoint + filterstring);
        if (!resp.isError) {
          setData(resp.data);
        } else {
          setError(`Error al cargar la tabla. ${resp.data}`);
        }
      } catch (error) {
        setError(`Se ha producido un error. ${error.message}`);
      }
    };
    fetchDataAndSetData();
  }, [backend.filter, backend.refresh, backend.endpoint]);

  return (
    <div className="table-container">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <div>
            {backend.allowedFilters &&
              <FilterBESelectors
                endpoint={backend.endpointfilter}
                filters={backend.allowedFilters}
                filter={backend.filter}
                setFilter={backend.setFilter}
              />
            }
            <div>
            </div>
          </div>
          <TableBase
            data={data}
            options={tableOptions}
            />
        </>
      )}
    </div>
  )
}

export default TableInit