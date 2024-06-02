import dayjs from 'dayjs';
import { useContext } from 'react';
import { ContextFiles } from '../Context/ContextFiles.jsx';
import FileUpload from '../Component/FileUpload/FileUpload.jsx';
import TableInit from '../Component/Tables/TableInit.jsx';

const Table01 = () => {
  const { backendFilter01, setBackendFilter01 } = useContext(ContextFiles)
  
  // BackEnd Configuration
  const backend = {
    endpoint: 'api/files/01/',
    filter: backendFilter01,
    setFilter: setBackendFilter01,
    allowedFilters: ['service', 'flag', 'business_number', 'payment_month'],
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
        header: 'Servicio',
        accessorKey: 'service',
        format: 'text',
      },
      {
        header: 'N Com',
        accessorKey: 'business_number',
        format: 'text',
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
        header: 'F. Pago',
        accessorKey: 'payment_date',
        cell: (info) => dayjs(info.getValue()).format('DD/MM'),
        format: 'date',
      },
    ]
  }

  const handleDataRefresh = () => {
    backend.refresh += 1
  };

  return (
    <div>
      <h1 className='title'>Tabla01: Tarjeta</h1>
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

export default Table01