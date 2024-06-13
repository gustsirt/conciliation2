import useTableConfig from '../../Config/useTableConfig.jsx';
import TableComponent from '../../Component/Tables/TableComponent.jsx';
import CrudTable from '../../Component/CrudTable/CrudTable.jsx';
import './tables.scss';
import { useEffect } from 'react';

const Table01 = () => {
  const { config } = useTableConfig()
  const tableConfig = config.table01

  return (
    <div className='page-row'>
      <TableComponent
        title="Tabla01: Tarjeta"
        backendConfig = {tableConfig.backend}
        tableOptions  = {tableConfig.tableOptions}
      />
      <CrudTable 
        selectedValue = {tableConfig.crud.selectedValue}
        setSelectedValue = {tableConfig.crud.setSelectedValue}
        dataSchema = {tableConfig.crud.dataSchema}
      />
    </div>
  );
};

export default Table01;
