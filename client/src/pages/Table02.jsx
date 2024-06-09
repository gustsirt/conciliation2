import TableComponent from '../Component/Tables/TableComponent.jsx';
import useTableConfig from '../Config/useTableConfig.jsx';

const Table02 = () => {
  const { config: tableConfig } = useTableConfig('table02')

  return (
    <TableComponent
      title="Tabla02: Cupones"
      backendConfig={tableConfig.backend}
      tableOptions={tableConfig.tableOptions}
    />
  )
}

export default Table02