import FilterSelectors_Unit from './FilterSelectors_Unit'
import './filterSelectors.scss'

const FilterSelectors = ({endpoint, filters, filter, setFilter}) => {
  return (
    <div className='filterSelectors'>
      {!filters ? null : filters.map((option, index) => (
        <FilterSelectors_Unit endpoint={endpoint} field={option} filter={filter} setFilter={setFilter} key={index}/>
      ))}
    </div>
  )
}

export default FilterSelectors