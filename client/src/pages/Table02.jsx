import dayjs from 'dayjs';
import InitiateTableSimple from '../Component/Tables/InitiateTableSimple.jsx';
import FileUpload from '../Component/Tables/FileUpload.jsx';

const Table02 = () => {
  const endpoint = 'api/files/02/';
  const columns = [
    {
      header: 'ID',
      accessorKey: '_id',
      format: 'text',
      hidden: true,
    },
    {
      header: 'Bandera',
      accessorKey: 'flag',
      format: 'text',
    },
    {
      header: 'F. Origen',
      accessorKey: 'origin_date',
      cell: (info) => dayjs(info.getValue()).format('DD/MM'),
      format: 'date',
    },
    {
      header: 'Lote',
      accessorKey: 'batch',
      format: 'number',
    },
    {
      header: 'Cupon',
      accessorKey: 'number',
      format: 'number',
    },
    {
      header: 'Monto',
      accessorKey: 'amount',
      format: 'currency',
    },
    {
      header: 'Cliente',
      accessorKey: 'client',
      format: 'text',
    },
  ] 

  return (
    <div>
      <h1 className='title'>Tabla02</h1>
      <InitiateTableSimple endpoint={endpoint} columns={columns} selectedValue={{value: ""}} />
      <FileUpload endpoint={"api/files/02/fromfile/"}/>
    </div>

  )
}

export default Table02