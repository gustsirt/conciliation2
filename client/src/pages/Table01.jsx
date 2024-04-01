import dayjs from 'dayjs';
import InitiateTableSimple from '../Component/Tables/InitiateTableSimple';

const Table01 = () => {
  const endpoint = 'api/files/';
  const columns = [
    {
      header: 'ID',
      accessorKey: '_id',
      format: 'text',
      hidden: true,
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

  return (
    <div>
      <h1 className='title'>Tabla01</h1>
      <InitiateTableSimple endpoint={endpoint} columns={columns} />
    </div>
  )
}

export default Table01