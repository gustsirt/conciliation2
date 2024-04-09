import dayjs from 'dayjs';
import { useContext, useState } from 'react';
import { ContextFiles } from '../Context/ContextFiles.jsx';
import InitiateTableSimple from '../Component/Tables/InitiateTableSimple.jsx';
import FileUpload from '../Component/Tables/FileUpload.jsx';

const Table02 = () => {
  const [ forceRefresh, setForceRefresh ] = useState(false);
  const { filter02, setFilter02 } = useContext(ContextFiles)
  const filters02 = ['flag']

  const endpoint = 'api/files/02/';
  const columns = [
    {
      header: 'ID',
      accessorKey: '_id',
      format: 'text',
      // hidden: true,
      cell: ({ row }) => row.original._id ? row.original._id.slice(-5) : '',
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

  const handleDataRefresh = () => {
    setForceRefresh(!forceRefresh);
  };
  
  return (
    <div>
      <h1 className='title'>Tabla02: Cupones</h1>
      <InitiateTableSimple endpoint={endpoint} columns={columns} selectedValue={{value: ""}} filters={filters02} filter={filter02} setFilter={setFilter02}/>
      <FileUpload endpoint={"api/files/02/fromfile/"}/>
    </div>

  )
}

export default Table02