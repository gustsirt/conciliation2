import TableComponent from '../Component/Tables/TableComponent.jsx';
import useTableConfig from '../Config/useTableConfig.jsx';

const Table01 = () => {  
  const { config: tableConfig } = useTableConfig('table01')

  return (
    <TableComponent
      title="Tabla01: Tarjeta"
      backendConfig = {tableConfig.backend}
      tableOptions  = {tableConfig.tableOptions}
    />
  );
};

export default Table01;
