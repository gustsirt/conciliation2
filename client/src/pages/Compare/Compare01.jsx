import dayjs from 'dayjs';
import InitiateTableSimple from '../../Component/Tables/InitiateTableSimple';
import './compare.scss';
import useTableSimple from '../../Component/Tables/hooks/useTableSimple';

const Compare01 = () => {
  const endpoint1 = 'api/files/01/';
  const columns1 = [
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

  const endpoint2 = 'api/files/02/';
  const columns2 = [
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

  const {getValues} = useTableSimple()

  const logcell = (row, column) => {
    console.log(getValues(row, column));
  }

  return (
    <div>
      <h1 className='title'>Comparacion</h1>
      <div className='tables-container'>
        <div>
          <h2 className='title-table'>Tabla 01 - tarjeta</h2>
          <InitiateTableSimple endpoint={endpoint1} columns={columns1} handleCellClick={logcell}/>
        </div>
        <div>
          <h2 className='title-table'>Tabla 02 - cupones</h2>
          <InitiateTableSimple endpoint={endpoint2} columns={columns2} handleCellClick={logcell} />
        </div>
      </div>
    </div>
  )
}

export default Compare01