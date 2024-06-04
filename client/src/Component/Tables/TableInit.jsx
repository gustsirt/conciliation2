import { useEffect, useState } from 'react';
import useFetchService from '../../hooks/useFetchService.jsx'
import './generalStyles.scss';
import FilterBESelectors from './FilterBESelectors.jsx';
import TableBase from './TableDef.jsx';
import { objToQueryString } from './Helper/objToQueryString.jsx';

const TableInit = ({ backend, tableOptions }) => {
  const { loading, fetchData } = useFetchService();
  const [data, setData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [error, setError] = useState(null);

  // Carga los datos de la tabla
  useEffect(() => {
    async function fetchDataAndSetData() {
      try {
        let filterstring = objToQueryString(backend.filter)
        const resp = await fetchData(backend.endpoint+filterstring);
        if (!resp.isError) {
          setData(resp.data);
          setDataLoaded(true);
        } else {
          setError("Error al cargar la tabla. " + resp.data);
        }
      } catch (error) {
        setError("Se ha producido un error. " + error);
      }
    }
    fetchDataAndSetData();
  }, [backend.filter, backend.refresh]);

  return (
    <div className="table-container">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <>
          <div>
            {backend.allowedFilters &&
              <FilterBESelectors
                endpoint={backend.endpoint}
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