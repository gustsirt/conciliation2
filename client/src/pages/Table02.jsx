import dayjs from 'dayjs';
import { useContext, useState } from 'react';
import { ContextFiles } from '../Context/ContextFiles.jsx';
import FileUpload from '../Component/FileUpload/FileUpload.jsx';
import TableInit from '../Component/Tables/TableInit.jsx';

const Table02 = () => {
  const { backendFilter02, setBackendFilter02 } = useContext(ContextFiles)

  // BackEnd Configuration
  const backend = {
    endpoint: 'api/files/02/',
    endpointfilter: 'api/files/02/',
    filter: backendFilter02,
    setFilter: setBackendFilter02,
    allowedFilters: ['flag'],
    refresh: 0
  }

  // Table Especifications
  const tableOptions = {
    allow: {
      paginated: true
    },
    columns: [
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
    ],
  }

  const handleDataRefresh = () => {
    backend.refresh += 1
  };
  
  return (
    <div>
      <h1 className='title'>Tabla02: Cupones</h1>
      <TableInit
        backend = {backend}
        tableOptions = {tableOptions}
      />
      <FileUpload
        endpoint={backend.endpoint+"fromfile/"}
        onDataUploaded={handleDataRefresh}
      />
    </div>

  )
}

export default Table02