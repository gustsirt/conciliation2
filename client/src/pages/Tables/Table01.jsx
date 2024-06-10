import useTableConfig from '../../Config/useTableConfig.jsx';
import TableComponent from '../../Component/Tables/TableComponent.jsx';
import CrudTable from '../../Component/CrudTable/CrudTable.jsx';
import './tables.scss';

const Table01 = () => {  
  const { config: tableConfig, rowSelection1 } = useTableConfig('table01')

  return (
    <div className='page-row'>
      <TableComponent
        title="Tabla01: Tarjeta"
        backendConfig = {tableConfig.backend}
        tableOptions  = {tableConfig.tableOptions}
      />
      <CrudTable 
        selectedValue = {tableConfig.crud.selectedValue}
        columns = {tableConfig.tableOptions.columns}
      />
    </div>
  );
};

export default Table01;
