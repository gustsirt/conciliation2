import { useEffect, useState } from 'react';
import useFetchServiceSelect from '../../hooks/useFetchServiceSelect';

const FilterBESelectors_Unit = ({endpoint, field, filter, setFilter}) => {
  const { loading, fetchUniqueData } = useFetchServiceSelect();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await fetchUniqueData(endpoint, field);
        if (!resp.isError) {
          setData(resp.data);
        } else {
          setError("Error al cargar la tabla. " + resp.data);
        }
      } catch (error) {
        setError("Se ha producido un error. " + error);
      }
    }

      fetchData();
  }, [field]);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setFilter(prevFilter => {
      if (selectedValue === '') {
        const { [field]: omit, ...newFilter } = prevFilter;
        return newFilter;
      } else {
        return { ...prevFilter, [field]: selectedValue }
      }
    })
  }

  return (
    <div className='filterUnit'>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : field ? (
        <select className='select' id={`select_${field}`} onChange={handleSelectChange} value={filter[field] || ''}>
          <option value="">{field}</option>
          {!data ? null : data.map((option, index)=>(<option key={index} value={option}>{option}</option>))}
        </select>)
        : null
      }
    </div>
  )
}

export default FilterBESelectors_Unit