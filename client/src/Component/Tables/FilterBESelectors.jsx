import FilterBESelectors_Unit from './FilterBESelectors_Unit'
import './filterBESelectors.scss'

const FilterBESelectors = ({endpoint, filters, filter, setFilter}) => {
  return (
    <div className='filterSelectors'>
      {!filters ? null : filters.map((option, index) => (
        <FilterBESelectors_Unit
          endpoint={endpoint}
          field={option}
          filter={filter}
          setFilter={setFilter}
          key={index}
        />
      ))}
    </div>
  )
}

export default FilterBESelectors